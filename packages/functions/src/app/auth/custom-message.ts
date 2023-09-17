import { CustomMessageTriggerHandler } from "aws-lambda";

import { getUserCreatedCustomMessage } from "@credential/core/auth/service";

export const main: CustomMessageTriggerHandler = async (event) => {
  if (event.triggerSource === "CustomMessage_AdminCreateUser") {
    const email = getUserCreatedCustomMessage(
      event.request.userAttributes.name,
      event.request.userAttributes.email,
      event.request.codeParameter
    );

    event.response.emailSubject = email.subject;
    event.response.emailMessage = email.message;
  }

  return event;
};
