import {
  Cognito,
  Function,
  Stack,
  StackContext,
  TableConsumerProps,
  toCdkDuration,
  use,
} from "sst/constructs";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { StringAttribute } from "aws-cdk-lib/aws-cognito";
import { MobileStack } from "./MobileStack.js";
import { StorageStack } from "./StorageStack.js";

export function CustomerAuthStack({ stack }: StackContext) {
  const { table } = use(StorageStack);
  const { api } = use(MobileStack);

  const auth = new Cognito(stack, "Customer", {
    cdk: {
      userPool: {
        userPoolName: "CustomerUserPool",
        passwordPolicy: {
          minLength: 8,
          requireDigits: true,
        },
        standardAttributes: {
          email: { required: true, mutable: true },
          givenName: { required: true, mutable: true },
          familyName: { required: true, mutable: true },
        },
        customAttributes: {
          dni: new StringAttribute({ mutable: false }),
          plan: new StringAttribute({ mutable: false }),
        },
        // email: UserPoolEmail.withSES({
        //   fromEmail: "no-reply@sanossalud.com",
        //   fromName: "no-reply",
        //   sesVerifiedDomain: "sanossalud.com",
        // }),
      },

      userPoolClient: {
        refreshTokenValidity: toCdkDuration(`365 days`),
      },
    },
    login: ["email"],
  });

  let policy = new PolicyStatement({
    actions: ["cognito-idp:AdminCreateUser", "cognito-idp:AdminDeleteUser"],
    effect: iam.Effect.ALLOW,
    resources: [auth.userPoolArn],
  });

  const credential: TableConsumerProps = {
    function: {
      handler: "packages/functions/src/customers/credentials/handler.main",
      timeout: 30,
      bind: [table],
      environment: {
        USER_POOL_ID: auth.userPoolId,
        USER_POOL_CLIENT_ID: auth.userPoolClientId,
        TABLE_NAME: table.tableName,
      },
      permissions: [table, policy],
    },
    cdk: {
      eventSource: {
        batchSize: 50,
        maxBatchingWindow: toCdkDuration("60 seconds"),
        startingPosition: StartingPosition.LATEST,
      },
    },
  };

  table.addConsumers(stack, {
    consumer: credential,
  });

  auth.attachPermissionsForAuthUsers(stack, ["cognito-idp:*"]);
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
