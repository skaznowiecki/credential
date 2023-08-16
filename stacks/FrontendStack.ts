import { StackContext, StaticSite, use } from "sst/constructs";
import { HttpStack } from "./HttpStack.js";
import { AdminAuthStack } from "./AdminAuthStack.js";
import { StorageStack } from "./StorageStack.js";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(HttpStack);
  const { auth } = use(AdminAuthStack);
  const { table } = use(StorageStack);

  const site = new StaticSite(stack, "ReactSite", {
    path: "fpackages/rontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_TABLE: table.tableName,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
