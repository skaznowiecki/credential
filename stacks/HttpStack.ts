import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack.js";

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
      "GET /": "packages/functions/src/admin/get-credentials/handler.main",
      "POST /upload":
        "packages/functions/src/admin/upload-credentials/handler.main",
      "POST /delete":
        "packages/functions/src/admin/delete-credentials/handler.main",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return {
    api,
  };
}
