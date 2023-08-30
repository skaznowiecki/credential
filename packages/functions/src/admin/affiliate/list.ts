import { list } from "@credential/core/affiliate/service";
import { ApiHandler } from "sst/node/api";
import { useApiResponse } from "@credential/core/common/lib";

export const main = ApiHandler(async (event) => {
  const affiliates = await list();
  return useApiResponse(200, affiliates);
});
