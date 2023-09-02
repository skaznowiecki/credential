import { Table, Stack } from "sst/constructs";

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
