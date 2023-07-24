import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "Credentials", {
    fields: {
      dni: "string",
      name: "string",
      lastName: "string",
      email: "string",
      plan: "string",
      createdAt: "string",
    },
    primaryIndex: { partitionKey: "dni" },
    stream: "new_and_old_images",
  });

  return {
    table,
  };
}
