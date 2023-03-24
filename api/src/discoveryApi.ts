import type { AnySchema } from "ajv";

import Ajv from "ajv";

type DataType = Record<string, unknown> | null | undefined;
type DataAccessor = () => DataType;
type DataSetter = (data: ReturnType<DataAccessor>) => void;

export class DiscoveryApi {
  readonly ajv: Ajv;

  constructor(ajv: Ajv) {
    this.ajv = ajv;
  }

  getSchemas() {
    const schemas = Object.keys(this.ajv.schemas)
      .filter((s) => s.startsWith("/schemas/"))
      .map((s) => this.ajv.getSchema(s)?.schema);

    return { schemas };
  }

  registerSchema(schema: AnySchema, silent = false) {
    this.ajv.addSchema(schema);
    !silent && this.ajv.validateSchema(schema);
  }

  async validateSchema(
    schema: AnySchema,
    dataAccessor: DataAccessor = () => null,
    dataSetter: DataSetter = () => {}
  ) {
    const validate = this.ajv.compile(schema);
    dataSetter((await validate(dataAccessor())) as DataType);
  }
}
