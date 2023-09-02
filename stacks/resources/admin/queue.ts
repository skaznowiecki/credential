import { Cognito, Queue, Stack, Table, toCdkDuration } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export const setQueue = (
  stack: Stack,
  affiliateTable: Table,
  auth: Cognito
) => {
  const queue = new Queue(stack, "SyncAffiliateQueue", {
    consumer: {
      function: {
        handler: "packages/functions/src/admin/affiliate/sync-queued.main",
        environment: {
          USER_POOL_ID: auth.userPoolId,
          USER_POOL_CLIENT_ID: auth.userPoolClientId,
        },
        bind: [affiliateTable],
        permissions: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
              "cognito-idp:AdminCreateUser",
              "cognito-idp:AdminDeleteUser",
            ],
            resources: [auth.cdk.userPool.userPoolArn],
          }),
        ],
      },
      cdk: {
        eventSource: {
          batchSize: 5,
          maxBatchingWindow: toCdkDuration(`5 seconds`),
          maxConcurrency: 2,
          reportBatchItemFailures: true,
        },
      },
    },
  });



  return queue;
};
