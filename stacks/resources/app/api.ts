import { Api, Table, Stack, Queue, Cognito } from "sst/constructs";

export const setApi = (stack: Stack, auth: Cognito, affiliateTable: Table) => {
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
      authorizer: "iam",
      function: {
        bind: [affiliateTable],
      },
    },
    routes: {
      "GET /affiliates": "packages/functions/src/app/affiliate/get.main",
    },
  });
};
