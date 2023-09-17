import { Auth } from "./entity";

export const useAuth = (event: any): Auth => {
  return { userId: event.requestContext.authorizer.jwt.claims["cognito:username"] };
};
