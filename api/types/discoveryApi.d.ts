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
export declare class DiscoveryApi {
    readonly ajv: Ajv;
    constructor(ajv: Ajv);
    getSchemas(): {
        schemas: AnySchema[];
    };
    registerSchema(schema: AnySchema, silent?: boolean): void;
    validateSchema({ schema, dataAccessor, dataSetter, allowBulkData }: ValidateSchemaType): Promise<void>;
}
export {};
