import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { ComponentType } from "react";

export type LoginForm = {
  email: string;
  password: string;
};

export type NewPassForm = {
  newPassword: string;
};

export type ForgotPassForm = {
  email: string;
};

export type CreateNewPassForm = {
  email: string;
  code: string;
  password: string;
};

export type AuthContextType = {
  signIn: ({ email, password }: LoginForm) => Promise<any>;
  signOut: () => Promise<void>;
  restore: () => Promise<void>;
  newPass: (user: any) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export type RootStackParamList = {
  Home: undefined;
  LogIn: undefined;
  NewPass: { email: string };
  ForgotPass: { email: string } | undefined;
  CreateNewPass: { email: string } | undefined;
};

export type Props<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
