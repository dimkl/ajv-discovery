import Ajv from "ajv";
import { DiscoveryApiFactory } from "./discoveryApiFactory";
import { DiscoveryApi } from "./discoveryApi";

describe("DiscoveryApiFactory", () => {
  describe("createAjv()", () => {
    test("returns ajv instance enhanced with formats and some keywords", () => {
      const ajv = DiscoveryApiFactory.createAjv();

      expect(ajv).toBeInstanceOf(Ajv);
      // expect keywords
      // expect formats
      // expect instance not cached
    });
  });

  describe("getInstance(key, ajv)", () => {
    test("returns new DiscoveryApi instance if key does not exist", () => {
      const discoveryApi = DiscoveryApiFactory.getInstance(
        Date.now().toString()
      );

      expect(discoveryApi).toBeInstanceOf(DiscoveryApi);
    });

    test("returns different instance for different key", () => {
      const discoveryApi1 = DiscoveryApiFactory.getInstance("api-1");
      const discoveryApi2 = DiscoveryApiFactory.getInstance("api-2");

      expect(discoveryApi1).not.toEqual(discoveryApi2);
    });

    test("returns existing instance if key exists", () => {
      const key = "api-1";
      const discoveryApi1 = DiscoveryApiFactory.getInstance(key);
      const discoveryApi2 = DiscoveryApiFactory.getInstance(key);

      expect(discoveryApi1).toEqual(discoveryApi2);
    });

    test("returns new instance if key exists and new ajv passed", () => {
      const key = "api-1";
      const ajv = DiscoveryApiFactory.createAjv();
      const discoveryApi1 = DiscoveryApiFactory.getInstance(key);
      const discoveryApi2 = DiscoveryApiFactory.getInstance(key, ajv);

      expect(discoveryApi1).not.toEqual(discoveryApi2);
    });

    test("returns new instance if key is omitted", () => {
      const discoveryApi = DiscoveryApiFactory.getInstance();
      expect(discoveryApi).toBeInstanceOf(DiscoveryApi);
    });

    test("returns same instance (on multiple calls) if key is omitted", () => {
      const discoveryApi1 = DiscoveryApiFactory.getInstance();
      const discoveryApi2 = DiscoveryApiFactory.getInstance();

      expect(discoveryApi1).toEqual(discoveryApi2);
    });
  });

  describe("clear()", () => {
    test("removes cached ajv instances", () => {
      const discoveryApi1 = DiscoveryApiFactory.getInstance();
      DiscoveryApiFactory.clear();
      const discoveryApi2 = DiscoveryApiFactory.getInstance();

      expect(discoveryApi1).not.toEqual(discoveryApi2);
    });
  });
});
