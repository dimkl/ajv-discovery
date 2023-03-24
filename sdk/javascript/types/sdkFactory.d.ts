import type { BaseParams } from "./types";
import { SDK } from "./sdk";
type SDKFactoryParams = BaseParams & {
    path?: string;
};
export declare class SDKFactory {
    static create({ apiUrl, path, jwt, }: SDKFactoryParams): Promise<SDK>;
}
export {};
