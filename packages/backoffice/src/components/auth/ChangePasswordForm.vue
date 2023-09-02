<template>
  <VForm fast-fail @submit.prevent="changePassword" ref="userForm">
    <VTextField variant="outlined" v-model="user.username" label="Email" disabled />
    <VTextField
      variant="outlined"
      type="password"
      v-model="user.password"
      label="Contraseña"
      :rules="passwordValidation"
    />
    <VTextField
      variant="outlined"
      type="password"
      v-model="repeatedPassword"
      :rules="repeatPasswordValidation"
      label="Repetir contraseña"
    />
    <VTextField variant="outlined" v-model="user.code" label="Codigo de verificacion" />

    <VBtn type="submit" variant="outlined" block class="mt-2" :loading="loading"
      >Cambiar contraseña</VBtn
    >
  </VForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const userForm = ref(null)

const props = defineProps({
  email: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const user = reactive({
  username: props.email,
  password: '',
  code: ''
})

const repeatedPassword = ref('')

const passwordValidation = [
  (value) => {
    if (value?.length >= 8) return true
    return 'Contraseña debe tener al menos 8 caracteres.'
  }
]

const repeatPasswordValidation = [
  (value) => {
    if (value === user.password) return true
    return 'Las contraseñas deben ser identicas.'
  }
]

const emitter = defineEmits(['submit'])

const changePassword = async () => {
  const { valid } = await userForm.value.validate()
  if (!valid) return

  emitter('submit', {
    ...user
  })
}
</script>
