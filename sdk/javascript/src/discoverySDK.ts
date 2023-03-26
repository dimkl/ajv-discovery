import type { BaseParams, AjvDiscoverySchema } from "./types";
import type { AnySchema } from "ajv";

import Ajv from "ajv";
import addFormats from "ajv-formats";
import { addKeywords } from "./addKeywords";
import { request, createApi } from "./utils";

type DiscoverySDKParams = BaseParams & { schemas: AnySchema[] };

export class DiscoverySDK {
  readonly apiUrl: string;
  readonly jwt?: string;
  readonly ajv: Ajv;

  constructor({ schemas, apiUrl, jwt }: DiscoverySDKParams) {
    this.apiUrl = apiUrl;
    this.jwt = jwt;

    this.ajv = this.#createAjv(schemas);
    this.#setupApi(schemas);
  }

  async #handler(
    schemaId: string,
    bodyOrParams: Record<string, unknown>,
    params: Record<string, unknown> = {}
  ) {
    const schema = this.ajv.getSchema(schemaId)?.schema as AjvDiscoverySchema;
    if (!schema) {
      throw new Error(
        `Schema ${schemaId} was not found in ajv instance provided!`
      );
    }

    const { http_path: path, http_method: method } = schema;

    const validate = this.ajv.compile(schema);
    let data = await validate(bodyOrParams);

    if (this.#methodWithoutBody(method)) {
      params = bodyOrParams;
      data = null;
    }

    const requestPath = path.replace(
      /:([\w]+)/,
      (_a: string, b: string) => params[b] as string
    );
    const requestUrl = new URL(requestPath, this.apiUrl).href;
    return request(requestUrl, this.jwt, data, { method });
  }

  #createAjv(schemas: AnySchema[]) {
    const ajv = new Ajv({ allErrors: true, schemas });
    addFormats(ajv);
    addKeywords(ajv);

    return ajv;
  }

  #setupApi(schemas: AnySchema[]) {
    const api = createApi(schemas);
    Object.entries(api).map(([methodName, schemaId]) => {
      Object.assign(this, { [methodName]: this.#handler.bind(this, schemaId) });
    });
  }

  #methodWithoutBody(method: string) {
    return ["GET", "DELETE"].includes(method.toUpperCase());
  }
}
