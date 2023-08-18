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
  const [user, setUser] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, newPass } = React.useContext(AuthContext) as AuthContextType;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginForm) => {
    setIsLoading(true);
    try {
      const user = await Auth.signIn(email, password);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setUser(user);
        setIsNew(true);
      } else {
        signIn(user);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitNewPassword = async ({ newPassword }: LoginForm) => {
    setIsLoading(true);
    try {
      await Auth.completeNewPassword(user, newPassword);
      newPass(user);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsNew(false);
      setIsLoading(false);
    }
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
          <CredHeading>Bienvenido</CredHeading>
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
                type="password"
                onChangeText={(val) => {
                  onChange(val);
                }}
                value={value}
              />
            )}
            name="password"
          />
        </VStack>

        {isNew && (
          <>
            <VStack>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CredInput
                    placeholder="Nueva contraseña"
                    onBlur={onBlur}
                    type="text"
                    onChangeText={(val) => {
                      onChange(val);
                    }}
                    value={value}
                    autoFocus
                  />
                )}
                name="newPassword"
              />
            </VStack>
            <VStack>
              <CredHelperText>
                La contraseña debe ser minimo de 8 caracteres y contener un numero
              </CredHelperText>
              <CredButton
                onPress={handleSubmit(onSubmitNewPassword)}
                isLoading={isLoading}
                isLoadingText="Cargando..."
              >
                Continuar
              </CredButton>
            </VStack>
          </>
        )}
        {!isNew && (
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
        )}
      </Flex>
    </KeyboardAvoidingView>
  );
}
