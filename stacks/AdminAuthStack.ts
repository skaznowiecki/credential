import { Cognito, StackContext } from "sst/constructs";

export function AdminAuthStack({ stack }: StackContext) {
  const auth = new Cognito(stack, "Auth", {
    cdk: {
      userPool: {
        userPoolName: "AdminUserPool",
      },
    },
    login: ["email"],
  });

  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });
}
