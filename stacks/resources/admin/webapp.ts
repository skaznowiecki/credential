import { Cognito, Stack, StaticSite } from "sst/constructs";

export const setWebApp = (
  stack: Stack,
  auth: Cognito,
  apiUrl: string,
  region: string
) => {
  return new StaticSite(stack, "ReactSite", {
    path: "packages/backoffice",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_API_URL: apiUrl,
      REACT_APP_REGION: region,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId!,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });
};
