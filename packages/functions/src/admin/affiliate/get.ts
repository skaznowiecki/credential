import { get } from "@credential/core/affiliate/service";
import { ApiHandler, usePathParam } from "sst/node/api";
import { useApiResponse } from "@credential/core/common/lib";

export const main = ApiHandler(async (event) => {
  const id = usePathParam("dni")!;

  try {
    const affiliate = await get(id);
    return useApiResponse(200, affiliate);
  } catch (_e) {
    const e = _e as Error;
    return useApiResponse(400, { error: e.message });
  }
});
