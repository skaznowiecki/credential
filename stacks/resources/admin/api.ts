import { Api, Table, Queue, Cognito, Stack } from "sst/constructs";

export const setAdminApi = (
  stack: Stack,
  auth: Cognito,
  affiliateTable: Table,
  syncAffiliateQueue: Queue
) => {
  return new Api(stack, "AdminApi", {
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
        bind: [affiliateTable, syncAffiliateQueue],
      },
    },
    routes: {
      "GET /affiliates": "packages/functions/src/admin/affiliate/list.main",
      "POST /affiliates": "packages/functions/src/admin/affiliate/upload.main",
      "DELETE /affiliates":
        "packages/functions/src/admin/affiliate/delete.main",
    },
  });
};
