import type { AnySchema } from "ajv";
export declare function request(endpoint: string, jwt?: string, body?: unknown, options?: {}): Promise<any>;
export declare function createApi(schemas: AnySchema[]): Record<string, string>;
