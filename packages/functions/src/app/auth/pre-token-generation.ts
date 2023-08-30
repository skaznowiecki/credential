import { PreTokenGenerationTriggerHandler } from "aws-lambda";

export const main: PreTokenGenerationTriggerHandler = async (event) => {
  if (
    ![
      "TokenGeneration_Authentication",
      "TokenGeneration_RefreshTokens",
    ].includes(event.triggerSource)
  ) {
    return event;
  }

  const userId = event.request.userAttributes["sub"];

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        userId,
      },
    },
  };
  return event;
};
