import { AuthCustomMessage } from "./entity";
import {
  UserCreatedBodyTemplate,
  UserCreatedSubjectTemplate,
} from "./templates/user-created";

export const getUserCreatedCustomMessage = (
  name: string,
  email: string,
  codeParameter: string
): AuthCustomMessage => {
  const message = UserCreatedBodyTemplate.replaceAll("{{email}}", email)
    .replaceAll("{{name}}", name)
    .replaceAll("{{password}}", codeParameter);

  const subject = UserCreatedSubjectTemplate;

  return {
    message,
    subject,
  };
};
