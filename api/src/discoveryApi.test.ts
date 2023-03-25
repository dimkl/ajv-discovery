import * as schema from "../fixtures/customer.create.json";
import * as userSchema from "../fixtures/user.json";

import { createRequiredError } from "../testHelpers";

import { DiscoveryApi } from "./discoveryApi";
import { DiscoveryApiFactory } from "./discoveryApiFactory";

describe("DiscoveryApi", () => {
  describe("getSchemas()", () => {
    test("returns all registered schemas {schemas: AnySchema[]}", () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      expect(discoveryApi.getSchemas()).toMatchSnapshot();

      discoveryApi.registerSchema(schema);
      const schema2 = { ...schema, $id: "/schemas/customer.update" };
      discoveryApi.registerSchema(schema2);
      expect(discoveryApi.getSchemas()).toMatchSnapshot();
    });

    test("returns all non /schemas.* ids as {schemas: AnySchema[]}", () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      expect(discoveryApi.getSchemas()).toMatchSnapshot();

      discoveryApi.registerSchema(schema);
      const schema2 = { ...schema, $id: "/schemas/customer.update" };
      discoveryApi.registerSchema(schema2);
      // Should not be in getSchemas
      const schema3 = { ...schema, $id: "/excluded" };
      discoveryApi.registerSchema(schema3);
      expect(discoveryApi.getSchemas()).toMatchSnapshot();
    });
  });

  describe("registerSchema(schema)", () => {
    test("throws error for already registered schema", () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      discoveryApi.registerSchema(schema);
      expect(() => discoveryApi.registerSchema(schema)).toThrowError(
        'schema with key or id "/schemas/customer.create" already exists'
      );
    });
  });

  describe("validateSchema(schema, dataAccessor, dataSetter)", () => {
    test("passthrough data when no schema", async () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      const data = { username: "userA" };
      const dataSetterSpy = jest.fn();
      const dataAccessorSpy = jest.fn().mockReturnValue(data);

      await discoveryApi.validateSchema({
        schema: {},
        dataAccessor: dataAccessorSpy,
        dataSetter: dataSetterSpy,
      });

      expect(dataAccessorSpy).toBeCalledTimes(1);
      expect(dataSetterSpy).toBeCalledTimes(1);
      expect(dataSetterSpy).toBeCalledWith(data);
    });

    test("passthrough data when no schema and async dataAccessor", async () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      const data = { username: "userA" };
      const dataSetterSpy = jest.fn();
      const dataAccessorSpy = jest.fn().mockResolvedValue(data);

      await discoveryApi.validateSchema({
        schema: {},
        dataAccessor: dataAccessorSpy,
        dataSetter: dataSetterSpy,
      });

      expect(dataAccessorSpy).toBeCalledTimes(1);
      expect(dataSetterSpy).toBeCalledTimes(1);
      expect(dataSetterSpy).toBeCalledWith(data);
    });

    test("throws when dataAccessor data are invalid", async () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      const data = { username: "userA" };
      const dataSetterSpy = jest.fn();
      const dataAccessorSpy = jest.fn().mockResolvedValue(data);

      await expect(
        discoveryApi.validateSchema({
          schema,
          dataAccessor: dataAccessorSpy,
          dataSetter: dataSetterSpy,
        })
      ).rejects.toMatchObject({
        errors: expect.arrayContaining([
          createRequiredError("first_name"),
          createRequiredError("last_name"),
          createRequiredError("email"),
          createRequiredError("password"),
        ]),
      });

      expect(dataAccessorSpy).toBeCalledTimes(1);
      expect(dataSetterSpy).not.toBeCalled();
    });

    test("noop when dataAccessor valid without dataSetter", async () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      const data = { username: "userA" };
      const dataAccessorSpy = jest.fn().mockReturnValue(data);

      await discoveryApi.validateSchema({
        schema: {},
        dataAccessor: dataAccessorSpy,
      });

      expect(dataAccessorSpy).toBeCalledTimes(1);
      expect(data).toMatchObject(data);
    });

    test("does not update dataAccessor data in dataSetter", async () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      const data = { username: "userA" };
      const dataAccessorSpy = () => data;
      // @ts-ignore
      const dataSetterSpy = jest.fn().mockImplementation((setterData) => {
        setterData = {};
      });

      await discoveryApi.validateSchema({
        schema: userSchema,
        dataAccessor: dataAccessorSpy,
        dataSetter: dataSetterSpy,
      });

      expect(dataSetterSpy).toBeCalledTimes(1);
      expect(data).not.toBeNull();
    });

    test("passes validatedData to dataSetter", async () => {
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi = new DiscoveryApi(ajv);

      const data = { username: "userA", additional: "a" };
      const dataAccessorSpy = () => data;
      const dataSetterSpy = jest.fn();

      await discoveryApi.validateSchema({
        schema: userSchema,
        dataAccessor: dataAccessorSpy,
        dataSetter: dataSetterSpy,
      });

      expect(dataSetterSpy).toBeCalledTimes(1);
      expect(dataSetterSpy).toBeCalledWith({ username: "userA" });
    });
  });
});
