import { Cognito, Stack, toCdkDuration } from "sst/constructs";

export const setAppAuth = (stack: Stack) => {
  return new Cognito(stack, "AppAuth", {
    triggers: {
      preTokenGeneration: {
        handler: "packages/functions/src/app/auth/pre-token-generation.main",
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
      },

      userPoolClient: {
        refreshTokenValidity: toCdkDuration(`365 days`),
      },
    },
    login: ["email"],
  });
};
