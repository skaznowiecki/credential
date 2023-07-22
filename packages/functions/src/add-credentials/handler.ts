import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBStreamHandler } from "aws-lambda";
import { Table } from "sst/node/table";
import dynamoDb from "@credential/core/dynamodb";

export const main: DynamoDBStreamHandler = async (event) => {
  const table = Table.Credentials.tableName;

  let num = event.Records[0].dynamodb?.NewImage?.dni.S;
  console.log("event", event);
  const command = new PutCommand({
    TableName: table,
    Item: { dni: "443322", name: num },
  });

  await dynamoDb.put(command);
};
