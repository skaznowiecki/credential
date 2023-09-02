<template>
  <VForm fast-fail @submit.prevent="resetPassword" ref="userForm">
    <VTextField variant="outlined" v-model="user.username" :rules="emailValidation" label="Email" />
    <VBtn type="submit" variant="outlined" block class="mt-2" :loading="loading">Restablecer</VBtn>
  </VForm>
</template>

<script setup>
import { reactive, ref } from 'vue'
defineProps(['loading'])

const userForm = ref(null)

const user = reactive({
  username: ''
})

const emitter = defineEmits(['submit'])

const emailValidation = [
  (value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value)) return true
    return 'Debe ser un email valido.'
  }
]

const resetPassword = async () => {
  const { valid } = await userForm.value.validate()
  if (!valid) return

  emitter('submit', {
    username: user.username
  })
}
</script>
