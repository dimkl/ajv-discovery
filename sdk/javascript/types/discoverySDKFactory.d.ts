import type { BaseParams } from "./types";
import { DiscoverySDK } from "./discoverySDK";
type DiscoverySDKFactoryParams = BaseParams & {
    path?: string;
};
export declare class DiscoverySDKFactory {
    static create({ apiUrl, path, jwt, }: DiscoverySDKFactoryParams): Promise<DiscoverySDK>;
}
export {};
