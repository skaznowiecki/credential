
interface ApiResponse {
  statusCode: number;
  body: string;
  headers: Record<string, string>;
}

export const useApiResponse = (status: number, body: any): ApiResponse => {
  return {
    statusCode: status,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  const number = Math.floor(Math.random() * 100);
  return `${result}${number}`;
};

export const decodeLastEvaluatedKey = (lastEvaluatedKeyEncoded: string): any => {
  return JSON.parse(Buffer.from(lastEvaluatedKeyEncoded, 'base64').toString('ascii'));
};

export const encodeLastEvaluatedKey = (lastEvaluatedKey?: any): string | null => {
  if (!lastEvaluatedKey) {
    return null;
  }
  return Buffer.from(JSON.stringify(lastEvaluatedKey)).toString('base64');
};
