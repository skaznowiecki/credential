import { ApiHandler, useJsonBody } from "sst/node/api";
import { useApiResponse } from "@credential/core/common/lib";

import { AffiliateDto } from "@credential/core/affiliate/dto";
import { deleteAsync } from "@credential/core/affiliate/service";
import { DeleteAffiliateMessage } from "@credential/core/affiliate/entity";

export const main = ApiHandler(async (event) => {
  const body = useJsonBody();

  if (!body?.credentials) {
    return useApiResponse(400, {
      success: false,
      message: "no credentials provided",
    });
  }

  const credentialsInput = body.credentials as AffiliateDto[];

  const credentials: DeleteAffiliateMessage[] = credentialsInput.map(
    (credential) => ({
      dni: credential.DNI.toString(),
      type: "delete",
    })
  );

  await deleteAsync(credentials);

  return useApiResponse(200, {
    success: true,
  });
});
