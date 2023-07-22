import {
  Cognito,
  Function,
  StackContext,
  TableConsumerProps,
  toCdkDuration,
  use,
} from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";
// import { UserPoolEmail } from "aws-cdk-lib/aws-cognito";

export function CustomerAuthStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  const auth = new Cognito(stack, "Customer", {
    cdk: {
      userPool: {
        userPoolName: "CustomerUserPool",
        passwordPolicy: {
          minLength: 8,
          requireDigits: true,
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

  const consumer: TableConsumerProps = {
    function: {
      handler: "packages/functions/src/add-credentials/handler.main",
      timeout: 30,
      bind: [auth, table],
      permissions: [table],
    },
    cdk: {
      eventSource: {
        batchSize: 10,
        startingPosition: StartingPosition.LATEST,
      },
    },
  };

  table.addConsumers(stack, { consumer });

  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });
}
