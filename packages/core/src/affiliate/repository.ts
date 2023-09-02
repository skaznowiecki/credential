import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  QueryCommand,
  ScanCommand,
  GetCommand,
  PutCommand,
  ScanCommandInput
} from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";
import { Affiliate, CreateAffiliate, ListAffiliate } from "./entity";
import { decodeLastEvaluatedKey, encodeLastEvaluatedKey } from "../common/lib";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const store = async (attrs: CreateAffiliate): Promise<Affiliate> => {
  const item: Affiliate = {
    ...attrs,
    createdAt: Number(new Date()),
  };

  await docClient.send(new PutCommand({
    TableName: Table.Affiliate.tableName,
    Item: item,
  }));

  return item;
};

export const get = async (dni: string): Promise<Affiliate | undefined> => {
  const { Item } = await docClient.send(
    new GetCommand({
      TableName: Table.Affiliate.tableName,
      Key: { dni },
    })
  );

  return Item as Affiliate | undefined;
};

export const getByUserId = async (
  userId: string
): Promise<Affiliate | undefined> => {
  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: Table.Affiliate.tableName,
      IndexName: "byUserId",
      ExpressionAttributeNames: {
        "#userId": "userId",
      },
      ExpressionAttributeValues: {
        ":userId": userId,
      },
      KeyConditionExpression: "#userId = :userId",
    })
  );

  return Items?.[0] as Affiliate | undefined;
};

export const list = async (nextToken: string | null): Promise<ListAffiliate> => {
  const params: ScanCommandInput = {
    TableName: Table.Affiliate.tableName,
    Limit: 15,
  }

  if (nextToken) {
    params.ExclusiveStartKey = decodeLastEvaluatedKey(nextToken);
  }

  const { Items, LastEvaluatedKey } = await docClient.send(
    new ScanCommand(params)
  );

  const items = (Items || []) as Affiliate[];
  const token = encodeLastEvaluatedKey(LastEvaluatedKey)

  return { items, nextToken: token };
};

export const destroy = async (dni: string) => {
  await docClient.send(
    new DeleteCommand({
      TableName: Table.Affiliate.tableName,
      Key: { dni },
    })
  );
};
