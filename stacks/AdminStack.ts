import { StackContext } from "sst/constructs";
import { setTable } from "./resources/admin/table.js";
import { setQueue } from "./resources/admin/queue.js";
import { setApi } from "./resources/admin/api.js";
import { setAuth } from "./resources/admin/auth.js";
import { setWebApp } from "./resources/admin/webapp.js";

export function AdminStack({ stack, app }: StackContext) {
  const auth = setAuth(stack);
  const table = setTable(stack);
  const queue = setQueue(stack, table);

  const api = setApi(stack, auth, table, queue);

  const url = api.customDomainUrl || api.url;

  setWebApp(stack, auth, url, app.region);

  return {
    table,
  };
}
