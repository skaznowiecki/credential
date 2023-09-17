import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Api, Table, Queue, Cognito, Stack } from "sst/constructs";

export const setAdminApi = (
  stack: Stack,
  auth: Cognito,
  affiliateTable: Table,
  syncAffiliateQueue: Queue
) => {
  return new Api(stack, "AdminApi", {
    customDomain:
      stack.stage === "prod"
        ? {
            domainName: "api.backoffice.sanos.app",
            hostedZone: "sanos.app",
            cdk: {
              certificate: Certificate.fromCertificateArn(
                stack,
                "ApiBackoficeCertificate",
                process.env.AWS_CERTIFICATE_ARN!
              ),
            },
          }
        : undefined,

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
