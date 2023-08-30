import { Auth } from "./entity";

export const useAuth = (event: any): Auth => {
  return event.requestContext.authorizer.jwt.claims;
};
