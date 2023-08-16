import { StorageStack } from "./StorageStack.js";
import { StackContext, Api, use } from "sst/constructs";

export function MobileStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /credentials/{dni}": "packages/functions/src/admin/get-credential/handler.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return {
    api,
  };
}
