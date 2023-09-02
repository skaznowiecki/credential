<template>
  <AuthLayout>

    <div class="mb-10">
      <VImg :src="Logo" height="100"></VImg>
    </div>

    <ErrorDisplay :error="errorMessage" />
    <SignInForm @submit="signIn" v-if="!needToPasswordChange" :loading="loading" />
    <CreatePasswordForm :email="email" @submitPassword="createPassword" v-else :loading="loading" />
    <div class="mt-2">
      <p class="text-body-2">
        Te olvidaste la contraseña?
        <RouterLink :to="{ name: 'ResetPassword' }">Restablecer</RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>
<script setup>
import Logo from "@/assets/logo.png";
import ErrorDisplay from "@/components/shared/ErrorDisplay.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import SignInForm from "@/components/auth/SignInForm.vue";
import CreatePasswordForm from "@/components/auth/CreatePasswordForm.vue";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { Auth } from "aws-amplify";

import { ref } from "vue";

const authStore = useAuthStore();
const router = useRouter();

let email = ref("");
let user = {};
let needToPasswordChange = ref(false);
let loading = ref(false);
let errorMessage = ref("");

const signIn = async ({ username, password }) => {
  try {
    loading.value = true;
    const cognitoUser = await Auth.signIn(username, password);

    if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
      email.value = username;
      user = cognitoUser;
      needToPasswordChange.value = true;
      return;
    }

    authStore.login(cognitoUser.signInUserSession.idToken.payload);
    router.push({ name: "Home" });
  } catch (error) {
    errorMessage.value = "Usuario o contraseña incorrectos";
  } finally {
    loading.value = false;
  }
};

const createPassword = async ({ password }) => {
  try {
    loading.value = true;
    const cognitoUser = await Auth.completeNewPassword(user, password);
    authStore.login(cognitoUser.signInUserSession.idToken.payload);
    router.push({ name: "Home" });
  } catch (error) {
    errorMessage.value = "Usuario o contraseña incorrectos";
  } finally {
    loading.value = false;
  }
};
</script>
