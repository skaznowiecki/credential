import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({});

export const createAuthAffiliate = async (
  email: string,
  name: string,
  password: string
): Promise<string> => {
  const command = new AdminCreateUserCommand({
    UserPoolId: process.env.USER_POOL_ID!,
    Username: email,
    UserAttributes: [
      {
        Name: "name",
        Value: name,
      },
      {
        Name: "email",
        Value: email,
      },
    ],
    TemporaryPassword: password,
  });

  const response = await client.send(command);

  return response.User!.Username!;
};

export const deleteAuthAffiliate = async (id: string) => {
  const command = new AdminDeleteUserCommand({
    UserPoolId: process.env.USER_POOL_ID!,
    Username: id,
  });

  await client.send(command);
};
