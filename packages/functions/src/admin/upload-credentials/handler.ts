import { APIEvent, apiHandler } from "@credential/core/handler";
import dynamoDb from "@credential/core/dynamodb";
import { CredentialEsp, Request } from "./request";
import { Response } from "./response";
import { Validator, retrieveBody } from "@credential/core/validator";
import { Table } from "sst/node/table";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Credential } from "@credential/core/credentials";
import { ApiError } from "@credential/core/error";

export const main = apiHandler<Response, APIEvent>(
  async (event): Promise<Response> => {
    const table = Table.Credentials.tableName;

    const body = await retrieveBody<Request>(event, validator);
    const translatedBody = translate(body.credentials);

    for (const credential of translatedBody) {
      const command = new PutCommand({
        TableName: table,
        Item: credential,
      });

      await dynamoDb.put(command);
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

const translate = (credential: CredentialEsp[]): Credential[] => {
  return credential.map((credential) => ({
    dni: credential.DNI,
    name: credential.Nombre,
    lastName: credential.Apellido,
    plan: credential.Plan,
    email: credential.Email,
    createdAt: new Date().toLocaleDateString(),
  }));
};
