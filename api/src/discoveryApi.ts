import type Ajv from "ajv";
import type { AnySchema } from "ajv";

type DataType = Record<string, unknown> | null | undefined;
type DataAccessor = () => DataType | Promise<DataType>;
type DataSetter = (data: DataType) => void;

type ValidateSchemaType = {
  schema: AnySchema;
  dataAccessor: DataAccessor;
  dataSetter?: DataSetter;
};

export class DiscoveryApi {
  readonly ajv: Ajv;

  constructor(ajv: Ajv) {
    this.ajv = ajv;
  }

  getSchemas() {
    const schemas = Object.keys(this.ajv.schemas)
      .filter((s) => s.startsWith("/schemas/"))
      .map((s) => this.ajv.getSchema(s)!.schema);

    return { schemas };
  }

  registerSchema(schema: AnySchema, silent = false) {
    this.ajv.addSchema(schema);
    !silent && this.ajv.validateSchema(schema);
  }

  async validateSchema({
    schema,
    dataAccessor,
    dataSetter = async () => {},
  }: ValidateSchemaType) {
    const validate = this.ajv.compile(schema);
    const data = await dataAccessor();
    if (await validate(data)) {
      await dataSetter(data);
    }
  }
}
