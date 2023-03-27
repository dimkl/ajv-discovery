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
export declare class DiscoveryApi {
    readonly ajv: Ajv;
    constructor(ajv: Ajv);
    getSchemas(): {
        schemas: AnySchema[];
    };
    registerSchema(schema: AnySchema, silent?: boolean): void;
    validateSchema({ schema, dataAccessor, dataSetter, }: ValidateSchemaType): Promise<void>;
}
export {};
