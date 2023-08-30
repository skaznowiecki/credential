import { Stack } from "sst/constructs";
import { Table } from "sst/constructs";

export const setTable = (stack: Stack) => {
  return new Table(stack, "Affiliate", {
    fields: {
      dni: "string",
      userId: "string",
    },
    primaryIndex: { partitionKey: "dni" },
    globalIndexes: {
      byUserId: {
        partitionKey: "userId",
      },
    },
  });
};
