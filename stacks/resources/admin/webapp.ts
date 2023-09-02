import { Cognito, StaticSite, Stack } from "sst/constructs";

export const setAdminWebApp = (
  stack: Stack,
  auth: Cognito,
  apiUrl: string,
  region: string
) => {
  return new StaticSite(stack, "ReactSite", {
    path: "packages/backoffice",
    buildCommand: "pnpm run build",
    buildOutput: "dist",
    environment: {
      VITE_APP_API_URL: apiUrl,
      VITE_APP_REGION: region,
      VITE_APP_USER_POOL_ID: auth.userPoolId,
      VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });
};
