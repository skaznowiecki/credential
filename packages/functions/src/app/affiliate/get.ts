import { get, getByUserId } from "@credential/core/affiliate/service";
import { ApiHandler, usePathParam } from "sst/node/api";
import { useApiResponse } from "@credential/core/common/lib";
import { useAuth } from "@credential/core/auth/lib";

export const main = ApiHandler(async (event) => {
  const { userId } = useAuth(event);

  try {
    const affiliate = await getByUserId(userId);
    return useApiResponse(200, affiliate);
  } catch (_e) {
    const e = _e as Error;
    return useApiResponse(400, { error: e.message });
  }
});
