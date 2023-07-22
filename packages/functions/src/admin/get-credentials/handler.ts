import { APIEvent, apiHandler } from "@credential/core/handler";
import dynamoDb from "@credential/core/dynamodb";
import { Response } from "./response";
import { ApiError } from "@credential/core/error";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";
import { Credentials } from "@credential/core/credentials";

export const main = apiHandler<Response, APIEvent>(
  async (event): Promise<Response> => {
    const table = Table.Credentials.tableName;
    const command = new ScanCommand({
      TableName: table,
    });

    const result = await dynamoDb.get(command);

    console.log(`result: ${JSON.stringify(result)}`);
    if (!result.Items) {
      throw new ApiError(`NOT FOUND`, 404);
    }

    return result.Items as Response;
  }
);

// const translate = (credential: Credentials[]): CredentialEsp[] => {
//   return credential.map((credential) => ({
//     DNI: credential.dni,
//     Nombre: credential.name,
//     Apellido: credential.lastName,
//     Alta: credential.subscribeDate,
//     Plan: credential.plan,
//     Email: credential.email,
//     Baja: credential.unsubscribeDate? credential.unsubscribeDate : null,
//   }));
// };

// const validator: Validator<Request> = async (request) => {
//   if (!request.name) {
//     throw new ApiError(`Field [name] is required`, 422);
//   }

//   if (!request.dni) {
//     throw new ApiError(`Field [color] is required`, 422);
//   }
// };
