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
  ForgotPassForm,
  NewPassForm,
  RootStackParamList,
} from "../context/context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPass">;

export default function ForgotPasswordScreen({ route, navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const email = route.params?.email;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassForm>({
    defaultValues: {
      email,
    },
  });

  const onSubmit = async ({ email }: ForgotPassForm) => {
    setIsLoading(true);
    try {
      const user = await Auth.forgotPassword(email);
      navigation.navigate("CreateNewPass", { email });
    } catch (error) {
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
          <CredHeading>Ingrese su email</CredHeading>
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
        </VStack>
        <VStack>
          {/* <CredHelperText>Hola toca el boton</CredHelperText> */}
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
