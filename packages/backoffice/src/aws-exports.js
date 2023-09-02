import { Auth } from "aws-amplify";
export const awsconfig = {
  aws_project_region: import.meta.env.VITE_APP_REGION,
  Auth: {
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    region: import.meta.env.VITE_APP_REGION,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: import.meta.env.VITE_APP_API_URL,
        region: import.meta.env.VITE_APP_REGION,
        custom_header: async () => {
          return {
            "Content-Type": "application/json",
            Authorization: (await Auth.currentSession())
              .getIdToken()
              .getJwtToken(),
          };
        },
      },
    ],
  },
};

export default awsconfig;
