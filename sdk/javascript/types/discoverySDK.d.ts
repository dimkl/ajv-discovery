import type { BaseParams } from "./types";
import type { AnySchema } from "ajv";
import Ajv from "ajv";
type DiscoverySDKParams = BaseParams & {
    schemas: AnySchema[];
};
export declare class DiscoverySDK {
    #private;
    readonly apiUrl: string;
    readonly jwt?: string;
    readonly ajv: Ajv;
    constructor({ schemas, apiUrl, jwt }: DiscoverySDKParams);
}
export {};
