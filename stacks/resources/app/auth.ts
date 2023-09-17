import { UserPoolEmail } from "aws-cdk-lib/aws-cognito";
import { Cognito, Stack, toCdkDuration } from "sst/constructs";

export const setAppAuth = (stack: Stack) => {
  return new Cognito(stack, "AppAuth", {
    triggers: {
      preTokenGeneration: {
        handler: "packages/functions/src/app/auth/pre-token-generation.main",
      },
      customMessage: {
        handler: "packages/functions/src/app/auth/custom-message.main",
      },
    },
    cdk: {
      userPool: {
        userPoolName: "CustomerUserPool",
        passwordPolicy: {
          minLength: 8,
          requireDigits: true,
        },
        autoVerify: {
          email: true,
        },
        email: UserPoolEmail.withSES({
          fromEmail: "no-replay@sanos.app",
          fromName: "Notification",
          sesVerifiedDomain: "sanos.app",
        }),
      },
      userPoolClient: {
        refreshTokenValidity: toCdkDuration(`365 days`),
      },
    },
    login: ["email"],
  });
};
