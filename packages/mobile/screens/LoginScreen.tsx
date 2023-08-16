import { Flex, VStack } from "native-base";
import { CredHeading } from "../components/CredHeading";
import { CredInput } from "../components/CredInput";
import { CredButton } from "../components/CredButton";
import { CredBrand } from "../components/CredBrand";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CredHelperText } from "../components/CredHelperText";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import { Auth } from "aws-amplify";
import React from "react";
import {
  AuthContext,
  AuthContextType,
  LoginForm,
  Props,
} from "../context/context";

export default function LoginScreen({ route, navigation }: Props<"LogIn">) {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = React.useContext(AuthContext) as AuthContextType;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    const user = await signIn(data);
    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      navigation.navigate("NewPass", { email: data.email });
    }
    setIsLoading(false);
  };

  function validateEmail(val: string): boolean {
    return EmailValidator.validate(val);
  }

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
          <CredHeading>Log in</CredHeading>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CredInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={(val) => {
                  onChange(val);
                  setIsValid(validateEmail(val));
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
                placeholder="Contraseña"
                onBlur={onBlur}
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
              />
            )}
            name="password"
          />
        </VStack>
        <VStack>
        <CredButton
            onPress={() => navigation.navigate("ForgotPass")}
            isLoading={isLoading}
            isLoadingText="Cargando..."
          >
            Recuperar contraseña
          </CredButton>
          <CredButton
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isValid}
            isLoading={isLoading}
            isLoadingText="Cargando..."
          >
            Ingresar
          </CredButton>
        </VStack>
      </Flex>
    </KeyboardAvoidingView>
  );
}
