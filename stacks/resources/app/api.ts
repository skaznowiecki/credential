import { Api, Table, Stack, Cognito } from "sst/constructs";

export const setAppApi = (stack: Stack, auth: Cognito, affiliateTable: Table) => {
  return new Api(stack, "AppApi", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
      function: {
        bind: [affiliateTable],
      },
    },
    routes: {
      "GET /affiliates": "packages/functions/src/app/affiliate/get.main",
    },
  });
};
