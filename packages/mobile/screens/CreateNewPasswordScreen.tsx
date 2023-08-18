import { Flex, VStack } from "native-base";
import { CredHeading } from "../components/CredHeading";
import { CredInput } from "../components/CredInput";
import { CredButton } from "../components/CredButton";
import { CredBrand } from "../components/CredBrand";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CredHelperText } from "../components/CredHelperText";
import { useState } from "react";
import { Auth } from "aws-amplify";
import React from "react";
import {
  AuthContext,
  AuthContextType,
  CreateNewPassForm,
  NewPassForm,
  RootStackParamList,
} from "../context/context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "CreateNewPass">;

export default function CreateNewPasswordScreen({ route, navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const email = route.params?.email;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPassForm>({
    defaultValues: {
      email,
      code: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, code, password }: CreateNewPassForm) => {
    setIsLoading(true);
    try {
      const user = await Auth.forgotPasswordSubmit(email, code, password);
      navigation.navigate("LogIn");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <CredHeading>Nueva contraseña</CredHeading>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CredInput
                placeholder="Email"
                onBlur={onBlur}
                type="text"
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
                autoFocus
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CredInput
                placeholder="Codigo de verificacion"
                onBlur={onBlur}
                type="text"
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
                autoFocus
              />
            )}
            name="code"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CredInput
                placeholder="Nueva contraseña"
                onBlur={onBlur}
                type="password"
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
                autoFocus
              />
            )}
            name="password"
          />
        </VStack>
        <VStack>
          <CredButton
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            isLoadingText="Cargando..."
          >
            Continuar
          </CredButton>
        </VStack>
      </Flex>
    </KeyboardAvoidingView>
  );
}
