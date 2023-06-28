import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "Credentials", {
    fields: {
      userId: "string",
      dni: "string",
      name: "string",
      surname: "string",
      subscribeDate: "string",
      unsubscribeDate: "string",
      createdAt: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "dni" },
  });

  return {
    table: table,
  };
}