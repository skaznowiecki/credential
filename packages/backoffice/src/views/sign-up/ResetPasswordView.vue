<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <ErrorDisplay :error="errorMessage" />
      <ResetPasswordForm
        @submit="submitResetPassword"
        v-if="!changePassword"
        :loading="loading"
      />
      <ChangePasswordForm
        :email="email"
        @submit="submitChangePassword"
        v-else
        :loading="loading"
      />
      <div class="mt-2">
        <p class="text-body-2">
          Ya tenes cuenta?
          <RouterLink :to="{ name: 'SignIn' }">Ingresar</RouterLink>
        </p>
      </div>
    </v-sheet>
  </div>
</template>
<script setup>
import ErrorDisplay from "@/components/shared/ErrorDisplay.vue";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm.vue";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm.vue";

import { Auth } from "aws-amplify";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let changePassword = ref(false);

let email = ref("");
let loading = ref(false);
let errorMessage = ref("");

const submitResetPassword = async ({ username }) => {
  loading.value = true;
  await Auth.forgotPassword(username);
  email.value = username;
  loading.value = false;
  changePassword.value = true;
};

const submitChangePassword = async ({ username, password, code }) => {
  try {
    loading.value = true;

    await Auth.forgotPasswordSubmit(username, code, password);

    router.push({ name: "SignIn" });
  } catch (error) {
  } finally {
    errorMessage.value = "Código incorrecto";
    loading.value = false;
  }
};
</script>
