import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Box } from "native-base";
import { Alert, StyleSheet, Text, View, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { Amplify, Auth } from "aws-amplify";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import { AuthContextType, LoginForm, AuthContext } from "./context/context";
import NewPasswordScreen from "./screens/NewPasswordScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CreateNewPasswordScreen from "./screens/CreateNewPasswordScreen";

const awsconfig = {
  Auth: {
    mandatorySignIn: true,
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    identityPoolId: process.env.IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "credentials",
        endpoint: __DEV__ ? process.env.DEV_API_URL : process.env.PROD_API_URL,
        region: process.env.REGION,
      },
    ],
  },
};
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
const Stack = createNativeStackNavigator();

export type Action = {
  token: any;
  type: Kind;
};

export enum Kind {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

function App() {
  const colorScheme = useColorScheme();
  const authContext: AuthContextType = React.useMemo(
    () => ({
      signIn: async ({ email, password }: LoginForm): Promise<any> => {
        try {
          const user = await Auth.signIn(email, password);
          dispatch({ type: Kind.SIGN_IN, token: user });
          return user;
        } catch (error) {
          Alert.alert("Error", "Usuario no existe");
        }
      },
      signOut: async () => {
        try {
          await Auth.signOut();
          dispatch({ type: Kind.SIGN_OUT, token: null });
        } catch (error) {
          Alert.alert("Error");
        }
      },
      restore: async () => {
        const currentUserInfo = await Auth.currentUserInfo();

        if (currentUserInfo) {
          const data = await Auth.currentAuthenticatedUser();
          dispatch({ type: Kind.RESTORE_TOKEN, token: data });
        }
        dispatch({ type: Kind.RESTORE_TOKEN, token: null });
      },
      newPass: async (user: any) => {
        dispatch({ type: Kind.RESTORE_TOKEN, token: user });
      },
    }),
    []
  );

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: Action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const data = await Auth.currentAuthenticatedUser();

        if (data) {
          dispatch({ type: Kind.RESTORE_TOKEN, token: data });
        }
      } catch (error) {
        dispatch({ type: Kind.RESTORE_TOKEN, token: null });
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <NativeBaseProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer
          theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack.Navigator initialRouteName="Home">
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <>
                <Stack.Screen
                  name="LogIn"
                  component={LoginScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="NewPass"
                  component={NewPasswordScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ForgotPass"
                  component={ForgotPasswordScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="CreateNewPass"
                  component={CreateNewPasswordScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    headerShown: false,
                  }}
                />
              </>
            ) : (
              // User is signed in
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

export default App;
