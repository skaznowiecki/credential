import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { Table } from "sst/node/table";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminCreateUserRequest,
  AdminDeleteUserCommand,
  AdminDeleteUserRequest,
} from "@aws-sdk/client-cognito-identity-provider";

export const main: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  const table = Table.Credentials.tableName;
  const auth = process.env.USER_POOL_ID || "";
  const client = new CognitoIdentityProviderClient();

  for await (const record of event.Records) {
    if (record.eventName == "INSERT" && record.dynamodb?.NewImage) {
      let object = unmarshall(record.dynamodb.NewImage);

      //pass random string 15 characters long
      let params: AdminCreateUserRequest = {
        UserPoolId: auth,
        Username: object.email,
        DesiredDeliveryMediums: ["EMAIL"],
        TemporaryPassword: makeid(15),
        UserAttributes: [
          {
            Name: "email",
            Value: object.email,
          },
          {
            Name: "given_name",
            Value: object.name,
          },
          {
            Name: "family_name",
            Value: object.lastName,
          },
          {
            Name: "custom:dni",
            Value: object.dni,
          },
        ],
      };

      const command = new AdminCreateUserCommand(params);
      await client.send(command);
    } else if (record.eventName == "REMOVE") {
      let object = unmarshall(record.dynamodb.OldImage);

      let params: AdminDeleteUserRequest = {
        UserPoolId: auth,
        Username: object.email,
      };

      const command = new AdminDeleteUserCommand(params);
      await client.send(command);
    }
  }
};

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
