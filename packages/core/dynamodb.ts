import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export default {
  get: (params: GetCommand) => docClient.send(params),
  put: (params: any) => docClient.send(params),
  query: (params: any) => docClient.send(params),
  update: (params: any) => docClient.send(params),
  delete: (params: any) => docClient.send(params),
};
