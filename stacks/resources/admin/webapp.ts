import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Cognito, StaticSite, Stack } from "sst/constructs";

export const setAdminWebApp = (
  stack: Stack,
  auth: Cognito,
  apiUrl: string,
  region: string
) => {
  return new StaticSite(stack, "ReactSite", {
    customDomain:
      stack.stage === "prod"
        ? {
            domainName: "backoffice.sanos.app",
            hostedZone: "sanos.app",
            cdk: {
              certificate: Certificate.fromCertificateArn(
                stack,
                "BackoficeCertificate",
                process.env.AWS_CERTIFICATE_ARN!
              ),
            },
          }
        : undefined,
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
