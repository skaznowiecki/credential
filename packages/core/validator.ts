import { ApiError } from "./error";
import { APIEvent } from "./handler";

export type Validator<T> = (body: T, event: APIEvent) => Promise<void>;

export const retrieveBody = async <T>(
  event: APIEvent,
  validator?: Validator<T>
): Promise<T> => {
  try {
    const body = event.isBase64Encoded
      ? parseBodyFromBase64<T>(event.body)
      : parseBodyFromString<T>(event.body);
    if (typeof validator !== "undefined") {
      await validator(body, event);
    }

    return body;
  } catch (error) {
    const e = error as ApiError;
    console.log(e);

    if (
      typeof e.statusCode !== "undefined" &&
      e.statusCode >= 400 &&
      e.statusCode < 500
    ) {
      throw e;
    }

    throw new ApiError("Unable to parse body. Body must be a json object", 422);
  }
};

const parseBodyFromBase64 = <T>(body: string | undefined): T => {
  if (!body) {
    return {} as T;
  }
  return JSON.parse(Buffer.from(body, "base64").toString("ascii"));
};

const parseBodyFromString = <T>(body: string | undefined): T => {
  return JSON.parse(body || "{}") as T;
};

export const retrievePath = <T>(event: APIEvent): T => {
  return event.pathParameters as unknown as T;
};

export const retrieveQueryStringParameters = <T>(event: APIEvent): T => {
  return (event.queryStringParameters || {}) as unknown as T;
};
