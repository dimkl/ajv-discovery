import type { AnySchema } from "ajv";
export type AjvDiscoverySchema = AnySchema & {
    http_path: string;
    http_method: string;
    $id: string;
};
export type BaseParams = {
    apiUrl: string;
    jwt: string;
};
