import { UserPoolEmail } from "aws-cdk-lib/aws-cognito";
import { Cognito, Stack } from "sst/constructs";

export const setAdminAuth = (stack: Stack) => {
  return new Cognito(stack, "Admin", {
    cdk: {
      userPool: {
        userPoolName: "AdminUserPool",
        autoVerify: {
          email: true,
        },
        email: UserPoolEmail.withSES({
          fromEmail: "no-replay@sanos.app",
          fromName: "Notification",
          sesVerifiedDomain: "sanos.app",
        }),
      },
    },
    login: ["email"],
  });
};
