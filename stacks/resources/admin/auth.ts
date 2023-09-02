import { Cognito, Stack  } from "sst/constructs";

export const setAdminAuth = (stack: Stack) => {
  return new Cognito(stack, "Admin", {
    cdk: {
      userPool: {
        userPoolName: "AdminUserPool",
        autoVerify: {
          email: true,
        },
      },
    },
    login: ["email"],
  });
};
