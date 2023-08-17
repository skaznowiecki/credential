import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  Flex,
  VStack,
  Box,
  HStack,
  Heading,
  Spinner,
  Center,
} from "native-base";
import { CredButton } from "../components/CredButton";
import { AuthContext, AuthContextType } from "../context/context";
import { CredBrand } from "../components/CredBrand";
import { CredHeading } from "../components/CredHeading";
import { API, Auth } from "aws-amplify";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";

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
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  React.useEffect(() => {
    const getUserData = async () => {
      const user: CognitoUser = await Auth.currentUserInfo();
      setUserData(user);
    };

    try {
      getUserData();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flexGrow: 1 }}
      keyboardVerticalOffset={500}
    >
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
          <Center>
            {isLoading ? (
              <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" size="lg" />
                <Heading color="primary.500" fontSize="md">
                  Cargando...
                </Heading>
              </HStack>
            ) : (
              <Box
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
                }}
                _light={{
                  backgroundColor: "gray.50",
                }}
                width="90%"
                padding={5}
              >
                <Text key={"name"} bold fontSize="lg">
                  {userData.attributes["given_name"]}
                </Text>
                <Text key={"lastNAme"} bold fontSize="lg">
                  {userData.attributes["family_name"]}
                </Text>
                <Text key={"dni"} fontSize="md">
                  {userData.attributes["custom:dni"]}
                </Text>
                <Text
                  key={"plan"}
                  fontSize="xl"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                >
                  {"Plan"}: {userData.attributes["custom:plan"]}
                </Text>
                <Text key={"email"} italic fontSize="md">
                  {"Email"}: {userData.attributes["email"]}
                </Text>
              </Box>
            )}
          </Center>
        </VStack>
        <VStack>
          <CredButton onPress={signOut}>Salir</CredButton>
        </VStack>
      </Flex>
    </KeyboardAvoidingView>
  );
}
