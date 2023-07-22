import { APIEvent, apiHandler } from "@credential/core/handler";
import dynamoDb from "@credential/core/dynamodb";
import { CredentialEsp, Request } from "./request";
import { Response } from "./response";
import { Validator, retrieveBody } from "@credential/core/validator";
import { Table } from "sst/node/table";
import { DeleteCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Credentials } from "@credential/core/credentials";
import { ApiError } from "@credential/core/error";

export const main = apiHandler<Response, APIEvent>(
  async (event): Promise<Response> => {
    const table = Table.Credentials.tableName;

    const body = await retrieveBody<Request>(event, validator);
    const translatedBody = translate(body.credentials);

    for (const credential of translatedBody) {
      const command = new DeleteCommand({
        TableName: table,
        Key: credential.dni,
      });

      await dynamoDb.delete(command);
    }

    return {
      success: true,
    };
  }
);

const validator: Validator<Request> = async (request) => {
  if (request.credentials.length === 0) {
    throw new ApiError(`no credentials provided`, 422);
  }
};

const translate = (credential: CredentialEsp[]): any[] => {
  return credential.map((credential) => ({
    dni: credential.DNI,
  }));
};
