import { setTable } from "./resources/admin/table.js";
import { setQueue } from "./resources/admin/queue.js";
import { setAdminApi } from "./resources/admin/api.js";
import { setAdminAuth } from "./resources/admin/auth.js";
import { setAdminWebApp } from "./resources/admin/webapp.js";
import { setAppAuth } from "./resources/app/auth.js";
import { setAppApi } from "./resources/app/api.js";
import { StackContext } from "sst/constructs";
import { setWebApp } from "./resources/app/webapp.js";

export function MainStack({ stack, app }: StackContext) {
  const adminAuth = setAdminAuth(stack);
  const appAuth = setAppAuth(stack);

  const table = setTable(stack);
  const queue = setQueue(stack, table, appAuth);

  const adminApi = setAdminApi(stack, adminAuth, table, queue);
  const appApi = setAppApi(stack, appAuth, table);

  const adminUrl = adminApi.customDomainUrl || adminApi.url;
  const appUrl = appApi.customDomainUrl || appApi.url;


  setAdminWebApp(stack, adminAuth, adminUrl, app.region);
  setWebApp(stack, appAuth, appUrl, app.region);
}
