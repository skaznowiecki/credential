import { Queue } from "sst/node/queue";
import { CreateAffiliateMessage, DeleteAffiliateMessage } from "./entity";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({});

export const send = async (
  message: CreateAffiliateMessage | DeleteAffiliateMessage
) => {
  const command = new SendMessageCommand({
    QueueUrl: Queue.SyncAffiliateQueue.queueUrl,
    MessageBody: JSON.stringify(message),
  });
  await sqs.send(command);
};
