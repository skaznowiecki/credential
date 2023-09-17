<template>
  <AuthLayout>
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
    <VCol cols="12">
      <v-divider :thickness="2" class="border-opacity-100"></v-divider>
    </VCol>

    <VRow>
      <VCol cols="12">
        <VBtn @click="router.push({ name: 'SignIn' })" block variant="outlined">
          Ya tenes cuenta?
        </VBtn>
      </VCol>
    </VRow>
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";

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
