import type { AnySchema } from "ajv";

export type AjvDiscoverySchema = AnySchema & {
    "x-http-path": string;
    "x-http-method": string;
    $id: string;
};

export type BaseParams = { apiUrl: string; jwt?: string };
