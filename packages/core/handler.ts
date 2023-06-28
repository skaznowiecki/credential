import {
    APIGatewayProxyEventV2,
    APIGatewayProxyResultV2,
    APIGatewayProxyEventV2WithLambdaAuthorizer,
    Context
  } from "aws-lambda";
  import { DEFAULT_HEADERS } from "./headers";
  export type APIEvent = APIGatewayProxyEventV2WithLambdaAuthorizer<Context>;
    
  type Handler<T, U> = (event: U) => Promise<T>;
  
  export const apiHandler = <T, U = APIEvent>(
    handler: Handler<T, U>,
    customHeaders?: APIGatewayProxyEventV2["headers"]
  ): Handler<APIGatewayProxyResultV2, U> => {
    return async (event: U): Promise<APIGatewayProxyResultV2> => {
      const headers = { ...DEFAULT_HEADERS, ...customHeaders };
      try {
        const result = await handler(event);
  
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(result),
        };
      } catch (error: any) {
        console.error(error);
  
        return {
          statusCode: error.statusCode || 500,
          headers,
          body: JSON.stringify({
            code: error.code || error.message,
            description: error.description,
          }),
        };
      }
    };
  };
  