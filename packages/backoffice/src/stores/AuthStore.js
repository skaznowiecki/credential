import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { Auth } from "aws-amplify";

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      user: useStorage("user", {}),
      challenge: "SIGN_IN",
      error: null,
      cognitoUser: null,
    };
  },
  getters: {
    isLoggedIn: async (state) => {
      return state.user.sub !== undefined;
    },
  },
  actions: {
    login(user) {
      this.user = user;
    },
    async signIn({ username, password }) {
      try {
        const cognitoUser = await Auth.signIn(username, password);

        if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.cognitoUser = cognitoUser;
          this.challenge = cognitoUser.challengeName;
          return false;
        }
        this.user = cognitoUser.signInUserSession.idToken.payload;
      } catch (error) {
        this.error = "Usuario o contraseña incorrectos";
      }
    },
    async completeNewPassword({ password }) {
      try {
        const cognitoUser = await Auth.completeNewPassword(
          this.cognitoUser,
          password
        );

        this.user = cognitoUser.signInUserSession.idToken.payload;

        this.challenge = null;
        this.error = null;
      } catch (error) {
        this.error = "Usuario o contraseña incorrectos";
      }
    },

    async forgotPassword({ username }) {
      await Auth.forgotPassword(username);
    },
    async forgotPassword({ username, code, password }) {
      try {
        await Auth.forgotPasswordSubmit(username, code, password);
        this.challenge = null;
        this.error = null;
      } catch (error) {
        this.error = "Código incorrecto";
      }
    },
  },
});
