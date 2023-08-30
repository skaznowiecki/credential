import { ApiHandler, useJsonBody } from "sst/node/api";
import { useApiResponse } from "@credential/core/common/lib";

import { AffiliateDto } from "@credential/core/affiliate/dto";
import { createAsync } from "@credential/core/affiliate/service";
import { CreateAffiliateMessage } from "@credential/core/affiliate/entity";
export const main = ApiHandler(async (event) => {
  const body = useJsonBody();

  if (!body?.credentials) {
    return useApiResponse(400, {
      success: false,
      message: "no credentials provided",
    });
  }

  const credentialsInput = body.credentials as AffiliateDto[];

  const credentials: CreateAffiliateMessage[] = credentialsInput.map(
    (credential) => ({
      dni: credential.DNI.toString(),
      name: credential.Nombre,
      lastName: credential.Apellido,
      plan: credential.Plan,
      email: credential.Email,
      type: "create",
    })
  );

  await createAsync(credentials);

  return useApiResponse(200, {
    success: true,
  });
});
