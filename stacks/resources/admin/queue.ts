import { Cognito, Queue, Stack, Table, toCdkDuration } from "sst/constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export const setQueue = (
  stack: Stack,
  affiliateTable: Table,
  auth: Cognito
) => {
  const queue = new Queue(stack, "SyncAffiliateQueue", {
    consumer: {
      function: {
        handler: "packages/functions/src/admin/affiliate/sync-queued.main",
        bind: [affiliateTable],
        permissions: [
          new PolicyStatement({
            effect: Effect.ALLOW,
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
