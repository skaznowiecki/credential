import { Cognito, StackContext, use } from "sst/constructs";
import { HttpStack } from "./HttpStack.js";
import { StorageStack } from "./StorageStack.js";
import { aws_cognito as cognito } from "aws-cdk-lib";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export function AdminAuthStack({ stack }: StackContext) {
  const { api } = use(HttpStack);

  const auth = new Cognito(stack, "Admin", {
    cdk: {
      userPool: {
        userPoolName: "AdminUserPool",
        standardAttributes: {
          email: { required: true, mutable: true },
          givenName: { required: true, mutable: true },
          familyName: { required: true, mutable: true },
        },
      },
    },
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [api, "dynamodb"]);
  api.attachPermissions(["dynamodb:*"]);
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  return {
    auth,
  };
}
