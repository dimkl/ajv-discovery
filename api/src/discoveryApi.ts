import type Ajv from "ajv";
import type { AnySchema } from "ajv";

type DataType = Record<string, unknown> | null | undefined;
type DataAccessor<T = DataType | DataType[]> = () => T | Promise<T>;
type DataSetter<T = DataType | DataType[]> = (data: T) => void;

type ValidateSchemaType = {
  schema: AnySchema;
  dataAccessor: DataAccessor;
  dataSetter?: DataSetter;
  allowBulkData?: boolean;
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
    allowBulkData = true
  }: ValidateSchemaType) {
    const validate = this.ajv.compile(schema);
    const data = await dataAccessor();
    
    if (!allowBulkData && Array.isArray(data)){
      await validate(data);
      return;
    }

    let bulkData = Array.isArray(data) ? data : [data];
    const res = await Promise.all(bulkData.map(d => validate(d)))
    if(!res.every(Boolean)){
      return;
    }

    await dataSetter(data);
  }
}
