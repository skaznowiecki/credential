import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Api, Table, Stack, Cognito } from "sst/constructs";

export const setAppApi = (
  stack: Stack,
  auth: Cognito,
  affiliateTable: Table
) => {
  return new Api(stack, "AppApi", {
    customDomain:
      stack.stage === "prod"
        ? {
            domainName: "api.sanos.app",
            hostedZone: "sanos.app",
            cdk: {
              certificate: Certificate.fromCertificateArn(
                stack,
                "ApiCertificate",
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
        bind: [affiliateTable],
      },
    },
    routes: {
      "GET /affiliates": "packages/functions/src/app/affiliate/get.main",
    },
  });
};
