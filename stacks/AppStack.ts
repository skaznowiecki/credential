import { StackContext, use } from "sst/constructs";
import { setApi } from "./resources/app/api.js";
import { setAuth } from "./resources/app/auth.js";
import { AdminStack } from "./AdminStack.js";

export function AppStack({ stack }: StackContext) {
  const { table } = use(AdminStack);

  const auth = setAuth(stack);

  setApi(stack, auth, table);
}
