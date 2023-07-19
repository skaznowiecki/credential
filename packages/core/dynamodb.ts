import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  ScanCommand,
  PutCommand,
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
      removeUndefinedValues: true
  }
});

export default {
  get: (params: ScanCommand) => docClient.send(params),
  put: (params: PutCommand) => docClient.send(params),
  putBatch: (params: BatchWriteCommand) => docClient.send(params),
  query: (params: any) => docClient.send(params),
  update: (params: any) => docClient.send(params),
  delete: (params: any) => docClient.send(params),
};
