import type { AnySchema } from "ajv";
import Ajv from "ajv";
type DataType = Record<string, unknown> | null | undefined;
type DataAccessor = () => DataType;
type DataSetter = (data: ReturnType<DataAccessor>) => void;
export declare class DiscoveryApi {
    readonly ajv: Ajv;
    constructor(ajv: Ajv);
    getSchemas(): {
        schemas: (AnySchema | undefined)[];
    };
    registerSchema(schema: AnySchema, silent?: boolean): void;
    validateSchema(schema: AnySchema, dataAccessor?: DataAccessor, dataSetter?: DataSetter): Promise<void>;
}
export {};
