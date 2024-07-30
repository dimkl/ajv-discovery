import type { AnySchema } from "ajv";
import type { AjvDiscoverySchema } from "./types";

import fetch from "isomorphic-fetch";

export function request(
    endpoint: string,
    jwt?: string,
    body?: unknown,
    options = {}
) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const mode: RequestMode = "no-cors";

    const fetchOptions = { headers, mode, ...options };

    if (jwt) {
        headers["Authentication"] = `Bearer ${jwt}`;
    }

    if (body) {
        Object.assign(fetchOptions, { body: JSON.stringify(body) });
    }

    return fetch(endpoint, fetchOptions).then(async (response) => {
        const jsonResponse = await response.json();

        if (response.status >= 400) throw new Error(jsonResponse);

        return jsonResponse;
    });
}

export function createApi(schemas: AnySchema[]): Record<string, string> {
    const api = {};

    schemas.forEach((value: AnySchema) => {
        const schema = value as AjvDiscoverySchema;
        if (schema["x-http-path"] && schema["x-http-method"]) {
            // convert method to camel case
            const apiMethod = schema["$id"]
                .replace("/schemas/", "")
                .replace(/(\.(\w))/, (_a: string, _b: string, c: string) =>
                    c.toUpperCase()
                );
            Object.assign(api, { [apiMethod]: schema["$id"] });
        }
    });

    return api;
}
