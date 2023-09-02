<template>
  <v-row>
    <VCol cols="10">
      <v-breadcrumbs class="font-weight-bold">
        <template v-slot:prepend>
          <v-icon size="x-large" icon="mdi-sticker-circle-outline" class="mr-3"></v-icon>
        </template>
        <v-breadcrumbs-item>{{ user.given_name }}</v-breadcrumbs-item>
      </v-breadcrumbs>
    </VCol>
    <v-col cols="2" class="text-right">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon>
            <v-icon v-bind="props">mdi-account-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item key="perfil" :disabled="true">
            <v-list-item-title> Mi perfil </v-list-item-title>
          </v-list-item>
          <v-list-item key="logout" @click="logout">
            <v-list-item-title> Cerrar sesión </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()

const { user } = authStore
const logout = () => {
  authStore.$reset()
  router.push({ name: 'SignIn' })
}
</script>
