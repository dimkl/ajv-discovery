import type { BaseParams } from "./types";

import { request } from "./utils";
import { DiscoverySDK } from "./discoverySDK";

const DEFAULT_DISCOVERY_PATH = "/discovery";

type DiscoverySDKFactoryParams = BaseParams & { path?: string };

export class DiscoverySDKFactory {
  static async create({
    apiUrl,
    path = DEFAULT_DISCOVERY_PATH,
    jwt,
  }: DiscoverySDKFactoryParams) {
    const { schemas } = await request(new URL(path, apiUrl).href);

    return new DiscoverySDK({ schemas, apiUrl, jwt });
  }
}
