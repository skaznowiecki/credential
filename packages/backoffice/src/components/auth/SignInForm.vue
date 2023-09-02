<template>
  <VForm fast-fail @submit.prevent="login" ref="userForm">
    <VTextField variant="outlined" v-model="user.username" :rules="emailValidation" label="Email" />
    <VTextField
      variant="outlined"
      v-model="user.password"
      :rules="passwordValidation"
      label="Contraseña"
      type="password"
    />
    <VBtn type="submit" variant="outlined" block class="mt-2" :loading="loading">Ingresar</VBtn>
  </VForm>
</template>

<script setup>
defineProps(['loading'])

import { ref, reactive } from 'vue'

const emitter = defineEmits(['submit'])

const userForm = ref(null)

const user = reactive({
  username: '',
  password: ''
})

const passwordValidation = [
  (value) => {
    if (value?.length >= 8) return true
    return 'Contraseña debe tener al menos 8 caracteres.'
  }
]

const emailValidation = [
  (value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value)) return true
    return 'Debe ser un email valido.'
  }
]

const login = async () => {
  const { valid } = await userForm.value.validate()
  if (!valid) return
  emitter('submit', { ...user })
}
</script>
