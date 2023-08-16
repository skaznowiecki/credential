import React, { useState } from "react";
import { View, Button, Text, Flex, VStack, Box } from "native-base";
import { CredButton } from "../components/CredButton";
import { AuthContext, AuthContextType } from "../context/context";
import { CredBrand } from "../components/CredBrand";
import { CredHeading } from "../components/CredHeading";
import { API, Auth } from "aws-amplify";

type CognitoUser = {
  username: string;
  attributes: Record<string, string | boolean>;
};

type Credential = {
  dni: string;
  name: string;
  lastName: string;
  plan: string;
  email: string;
  createdAt?: string;
};

export default function HomeScreen() {
  const { signOut } = React.useContext(AuthContext) as AuthContextType;
  const [userData, setUserData] = useState<CognitoUser>({
    username: "",
    attributes: {},
  });
  const [credential, setCredential] = useState<Credential>({
    dni: "",
    name: "",
    lastName: "",
    plan: "",
    email: "",
  });

  React.useEffect(() => {
    const getUserData = async () => {
      const user: CognitoUser = await Auth.currentUserInfo();
      setUserData(user);
      const dni = user.attributes["dni"];
      const url = __DEV__ ? process.env.DEV_API_URL : process.env.PROD_API_URL;
      const resp = await API.get("credentials", `${url}/credentials/${dni}`, {
        headers: {},
      });
      const credential = await resp.json();
      setCredential(credential);
    };

    getUserData();
  }, []);

  return (
    <View>
      <Flex
        safeArea
        flex={1}
        justifyContent={"space-between"}
        background={"black"}
        paddingX={5}
      >
        <VStack>
          <CredBrand>Sanos Salud</CredBrand>
          <CredHeading>Credencial</CredHeading>
          <Box
            paddingTop={10}
            bg={{
              linearGradient: {
                colors: ["lightBlue.300", "violet.800"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="12"
            rounded="xl"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              textAlign: "center",
            }}
          >
            {Object.keys(userData.attributes).map((key) => {
              return (
                <Text key={key}>
                  {key}: {userData.attributes[key]}
                </Text>
              );
            })}
            {Object.keys(credential).map((key) => {
              return <Text key={key}>{key}: credential.key</Text>;
            })}
          </Box>
        </VStack>
        <VStack>
          <CredButton onPress={signOut}>Salir</CredButton>
        </VStack>
      </Flex>
    </View>
  );
}
