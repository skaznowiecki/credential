import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "Credentials", {
    fields: {
      id: "string",
      dni: "string",
      name: "string",
      email: "string",
      plan: "string",
      lastName: "string",
      subscribeDate: "string",
      unsubscribeDate: "string",
      createdAt: "string",
    },
    primaryIndex: { partitionKey: "id", sortKey: "dni" },
  });

  return {
    table,
  };
}