import {
  CreateAffiliateMessage,
  DeleteAffiliateMessage,
} from "@credential/core/affiliate/entity";
import { create, destroy } from "@credential/core/affiliate/service";
import { SQSBatchItemFailure, SQSHandler, SQSRecord } from "aws-lambda";

export const main: SQSHandler = async (event) => {
  const results = await Promise.all(
    event.Records.map((record) => processRecord(record))
  );

  const failures: SQSBatchItemFailure[] = results
    .filter((r) => r[0] === false)
    .map((r) => ({
      itemIdentifier: r[1]!,
    }));

  return {
    batchItemFailures: failures,
  };
};

const processRecord = async (
  record: SQSRecord
): Promise<[boolean, string | null]> => {
  try {
    const body = JSON.parse(record.body) as
      | CreateAffiliateMessage
      | DeleteAffiliateMessage;

    if (body.type === "create") {
      await create(body as CreateAffiliateMessage);
    } else if (body.type === "delete") {
      await destroy(body as DeleteAffiliateMessage);
    }
  } catch {
    return [false, record.messageId];
  }

  return [true, null];
};
