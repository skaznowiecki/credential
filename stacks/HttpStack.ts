import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function HttpStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  const api = new Api(stack, "api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /": "packages/functions/src/getCredentials/handler.main",
      "POST /upload": "packages/functions/src/uploadCredentials/handler.main",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return {
    api,
  };
}
