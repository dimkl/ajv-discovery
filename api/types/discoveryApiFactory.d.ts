import Ajv from "ajv";
import { DiscoveryApi } from "./discoveryApi";
export declare class DiscoveryApiFactory {
    #private;
    static getInstance(key?: string, ajv?: Ajv): DiscoveryApi;
    static clear(): void;
    static createAjv(): Ajv;
}
