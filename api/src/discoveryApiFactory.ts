import Ajv from "ajv";
import addFormats from "ajv-formats";

import { addKeywords } from "./addKeywords";
import { DiscoveryApi } from "./discoveryApi";

let cache: Record<string, Ajv> = {};
const DEFAULT_KEY = "default";

export class DiscoveryApiFactory {
  static getInstance(key: string = DEFAULT_KEY, ajv?: Ajv) {
    if (!cache[key]) {
      cache[key] = ajv || this.createAjv();
    }

    if (ajv && ajv !== cache[key]) {
      cache[key] = ajv;
    }

    return new DiscoveryApi(cache[key]);
  }

  static clear() {
    cache = {};
  }

  static createAjv() {
    const ajvInstance = new Ajv({
      allErrors: true,
      removeAdditional: true,
    });

    addKeywords(ajvInstance);
    addFormats(ajvInstance);

    return ajvInstance;
  }
}
