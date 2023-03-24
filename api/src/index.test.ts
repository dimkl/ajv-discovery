import * as exported from "./index";

describe("api", () => {
  test("exports", () => {
    expect(Object.keys(exported)).toMatchObject(["DiscoveryApiFactory"]);
  });
});
