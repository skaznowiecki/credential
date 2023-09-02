<template>
  <VForm fast-fail @submit.prevent="submitPassword" ref="userForm">
    <VTextField
      variant="outlined"
      v-model="user.username"
      label="Email"
      disabled
    />
    <VTextField
      variant="outlined"
      v-model="user.password"
      :rules="passwordValidation"
      label="Contraseña"
      type="password"
    />
    <VTextField
      variant="outlined"
      v-model="repeatedPassword"
      :rules="repeatPasswordValidation"
      label="Repetir contraseña"
      type="password"
    />

    <VBtn type="submit" variant="outlined" block class="mt-2" :loading="loading"
      >Cambiar contraseña</VBtn
    >
  </VForm>
</template>

<script setup>
import { reactive } from "vue";
import { ref } from "vue";
const userForm = ref(null);

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const user = reactive({
  username: props.email,
  password: "",
});

const repeatedPassword = ref("");

const passwordValidation = [
  (value) => {
    if (value?.length >= 8) return true;
    return "Contraseña debe tener al menos 8 caracteres.";
  },
];

const repeatPasswordValidation = [
  (value) => {
    if (value === user.password) return true;
    return "Las contraseñas deben ser identicas.";
  },
];

const emitter = defineEmits(["submit-password"]);

const submitPassword = async () => {
  const { valid } = await userForm.value.validate();
  if (!valid) return;
  emitter("submit-password", {
    ...user,
  });
};
</script>
