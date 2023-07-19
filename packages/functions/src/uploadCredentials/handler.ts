import { APIEvent, apiHandler } from "@credential/core/handler";
import dynamoDb from "@credential/core/dynamodb";
import { CredentialEsp, Request } from "./request";
import { Response } from "./response";
import { Validator, retrieveBody } from "@credential/core/validator";
import { Table } from "sst/node/table";
import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { Credentials } from "@credential/core/credentials";
import { ApiError } from "@credential/core/error";
import { randomUUID } from "crypto";


export const main = apiHandler<Response, APIEvent>(
  async (event): Promise<Response> => {
    console.log(1);
    const table = Table.Credentials.tableName;
    console.log("body", event.body);
    
    const body = await retrieveBody<Request>(event, validator);
    console.log("credentials", body.credentials);
    
    const translatedBody = translate(body.credentials);
    console.log(3);
    
    const putRequests = body.credentials.map((translatedBody) => ({
      PutRequest: {
        Item: translatedBody,
      },
    }));
    
    const command = new BatchWriteCommand({
      RequestItems: {
        [table]: putRequests,
      },
    });
    
    console.log(4);
    
    await dynamoDb.putBatch(command);
    console.log(5);
    
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
  
  const translate = (credential: CredentialEsp[]): Credentials[] => {
    return credential.map((credential) => ({
      id: randomUUID(),
      dni: credential.DNI,
      name: credential.Nombre,
      lastName: credential.Apellido,
      subscribeDate: credential.Alta,
      plan: credential.Plan,
      email: credential.Email,
      createdAt: new Date(),
    }));
  };