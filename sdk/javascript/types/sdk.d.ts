import type { BaseParams } from "./types";
import type { AnySchema } from "ajv";
import Ajv from "ajv";
type SDKParams = BaseParams & {
    schemas: AnySchema[];
};
export declare class SDK {
    #private;
    readonly apiUrl: string;
    readonly jwt: string;
    readonly ajv: Ajv;
    constructor({ schemas, apiUrl, jwt }: SDKParams);
    handler(schemaId: string, bodyOrParams: Record<string, unknown>, params?: Record<string, unknown>): Promise<any>;
}
export {};
