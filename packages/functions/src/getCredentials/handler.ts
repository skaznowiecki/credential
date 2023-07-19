import { APIEvent, apiHandler } from "@credential/core/handler";
import dynamoDb from "@credential/core/dynamodb";
import { Request } from "./request";
import { Response } from "./response";
import { ApiError } from "@credential/core/error";
import { retrievePath, Validator } from "@credential/core/validator";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const main = apiHandler<Response, APIEvent>(
  async (event): Promise<Response> => {
    const userId = "1";
    const dni = "123";

    const command = new GetCommand({
      TableName: Table.Credentials.tableName,
      Key: {
        userId: userId,
        dni: dni,
      },
    });
    const result = await dynamoDb.get(command);

    console.log(`result: ${JSON.stringify(result)}`);
    if (!result.Item) {
      throw new ApiError(`NO ESITE`, 404);
    }
    return result.Item as Response;
  }
);

// const validator: Validator<Request> = async (request) => {
//   if (!request.name) {
//     throw new ApiError(`Field [name] is required`, 422);
//   }

//   if (!request.dni) {
//     throw new ApiError(`Field [color] is required`, 422);
//   }
// };
