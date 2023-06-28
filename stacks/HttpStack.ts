import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function HttpStack({ stack }: StackContext) {
  const { table: table } = use(StorageStack);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /{userId}/{dni}": "packages/functions/src/getCredentials/handler.main",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return {
    api,
  };
}
