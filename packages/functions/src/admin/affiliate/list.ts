import { list } from "@credential/core/affiliate/service";
import { ApiHandler, useQueryParam } from "sst/node/api";
import { useApiResponse } from "@credential/core/common/lib";

export const main = ApiHandler(async (event) => {
  const nextToken = useQueryParam("nextToken") || null
  const response = await list(nextToken);
  return useApiResponse(200, response);
});
