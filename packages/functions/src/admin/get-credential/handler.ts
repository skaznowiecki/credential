import { APIEvent, apiHandler } from "@credential/core/handler";
import dynamoDb from "@credential/core/dynamodb";
import { Response } from "./response";
import { ApiError } from "@credential/core/error";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";

export const main = apiHandler<Response, APIEvent>(
  async (event): Promise<Response> => {
    const table = Table.Credentials.tableName;
    const command = new GetCommand({
      TableName: table,
      Key: {
        dni: event.pathParameters?.dni,
      },
    });

    const result = await dynamoDb.findOne(command);

    if (!result.Items) {
      throw new ApiError(`NOT FOUND`, 404);
    }

    return result.Items as Response;
  }
);
