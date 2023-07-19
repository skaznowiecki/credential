import { Cognito, StackContext, toCdkDuration } from "sst/constructs";
// import { UserPoolEmail } from "aws-cdk-lib/aws-cognito";

export function CustomerAuthStack({ stack }: StackContext) {
  const auth = new Cognito(stack, "Customer", {
    cdk: {
      userPool: {
        userPoolName: "CustomerUserPool",
        passwordPolicy: {
          minLength: 8,
          requireDigits: true,
        },
        // email: UserPoolEmail.withSES({
        //   fromEmail: "no-reply@sanossalud.com",
        //   fromName: "no-reply",
        //   sesVerifiedDomain: "sanossalud.com",
        // }),
      },
      userPoolClient: {
        refreshTokenValidity: toCdkDuration(`365 days`),
      },
    },
    login: ["email"],
  });

  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });
}
