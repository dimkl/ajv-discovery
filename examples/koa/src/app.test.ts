import { app } from "./app";
import * as supertest from "supertest";
import { DiscoverySDKFactory } from "@dimkl/ajv-discovery-sdk";

const server = app.listen();
const request = supertest.agent(server);

describe("Koa app", function () {
  afterAll(() => server.close());

  describe("API", () => {
    test("/discovery returns schemas", async () => {
      const response = await request.get("/discovery");
      expect(response.body).toMatchSnapshot();
    });
  });

  describe("SDK", () => {
    test("discoverySDK using /discovery has customerCreate method", async () => {
      // @ts-ignore
      const { port } = server.address();
      const discoverySDK = (await DiscoverySDKFactory.create({
        apiUrl: `http://localhost:${port}`,
      }));

      // @ts-ignore
      const customerCreateResponse = await discoverySDK.customerCreate({
        email: "dimitris.klouvas@gmail.com",
        password: "1234qwer",
      });

      expect(customerCreateResponse).toEqual({ message: "Customer created" });
    });
  });
});
