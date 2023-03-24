import Ajv from "ajv";
import { DiscoveryApiFactory } from "./discoveryApiFactory";

describe("DiscoveryApiFactory", () => {
  describe("createAjv()", () => {
    test("returns ajv instance enhanced with formats and some keywords", () => {
      let ajv = DiscoveryApiFactory.createAjv();

      expect(ajv).toBeInstanceOf(Ajv);
      // expect keywords
      // expect formats
      // expect instance not cached
    });
  });

  describe("getInstance(key, ajv)", () => {
    test.todo("returns new instance if key does not exist");
    test.todo("returns existing instance if key exists");
    test.todo("returns new instance if key exists and new ajv passed");
    test.todo("returns new instance if key is omitted");
    test.todo("returns default instance if key is omitted and called multiple times");
  });

  describe("clear()", () => {
    test.todo("removes cached ajv instances");
  });
});
