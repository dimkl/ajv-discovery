import { DiscoveryApi } from "./discoveryApi";
import { DiscoveryApiFactory } from "./discoveryApiFactory";
import * as schema from "../fixtures/customer.create.json";

describe("DiscoveryApi", () => {
  describe("getSchemas()", () => {
    test("returns all registered schemas {schemas: AnySchema[]}", () => {
      let ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      expect(discoveryApi.getSchemas()).toMatchSnapshot();

      discoveryApi.registerSchema(schema);
      const schema2 = { ...schema, $id: "/schemas/customer.update" };
      discoveryApi.registerSchema(schema2);
      expect(discoveryApi.getSchemas()).toMatchSnapshot();
    });
  });

  describe("registerSchema(schema)", () => {
    test("throws error for already registered schema", () => {
      let ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      discoveryApi.registerSchema(schema);
      expect(() => discoveryApi.registerSchema(schema)).toThrowError(
        'schema with key or id "/schemas/customer.create" already exists'
      );
    });
  });

  describe("validateSchema(schema, dataAccessor, dataSetter)", () => {
    test.todo("noop when no schema is registered");
    test.todo("throws when dataAccessor data are invalid");
    test.todo("throws when no dataAccessor data");
    test.todo("noop when dataAccessor valid without dataSetter");
    test.todo("passes validatedData to dataSetter");
  });
});
