import Ajv from "ajv";
import addFormats from "ajv-formats";

import { addKeywords } from "./addKeywords";
import { DiscoveryApi } from "./discoveryApi";

const DEFAULT_KEY = "default";

export class DiscoveryApiFactory {
  static #cache: Record<string, Ajv> = {};

  static getInstance(key: string = DEFAULT_KEY, ajv?: Ajv) {
    if (!this.#cache[key]) {
      this.#cache[key] = ajv || this.createAjv();
    }

    if (ajv && ajv !== this.#cache[key]) {
      this.#cache[key] = ajv;
    }

    return new DiscoveryApi(this.#cache[key]);
  }

  static clear() {
    this.#cache = {};
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
