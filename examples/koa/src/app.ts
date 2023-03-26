import Koa from "koa";
import Router from "@koa/router";
import { DiscoveryApiFactory } from "@dimkl/ajv-discovery-api";
import * as customerSchema from "../fixtures/customer.create.json";

export const app = new Koa();

const discoveryApi = DiscoveryApiFactory.getInstance();
discoveryApi.registerSchema(customerSchema);

const router = new Router();

router.get("/discovery", async (ctx: any) => {
  ctx.body = discoveryApi.getSchemas();
});

// TODO: add validation using discoveryApi
router.post("/customers", async (ctx: any) => {
  ctx.body = { message: "Customer created" };
});

app.use(router.routes());

if (!module.parent) {
  app.listen(3000);
  console.log("Application initialized!");
}
