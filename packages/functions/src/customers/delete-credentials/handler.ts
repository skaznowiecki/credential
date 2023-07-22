import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { Table } from "sst/node/table";
import { Auth } from "sst/node/auth";
import dynamoDb from "@credential/core/dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import AWS from "aws-sdk";
import { Credentials } from "@credential/core/credentials";

export const main: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  const table = Table.Credentials.tableName;
  const auth = process.env.USER_POOL_ID || "";
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  event.Records.forEach((record) => {
    if (record.eventName == "REMOVE") {
      let object = unmarshall(record.dynamodb.NewImage);

      var params: AWS.CognitoIdentityServiceProvider.AdminDeleteUserRequest = {
        UserPoolId: auth,
        Username: object.email,
      };

      cognitoidentityserviceprovider.adminCreateUser(
        params,
        function (err, data) {
          if (err) console.log("ERROR", err, err.stack); // an error occurred
          else console.log(data); // successful response
        }
      );
    }
  });
};
