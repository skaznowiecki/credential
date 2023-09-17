<template>
  <v-bottom-navigation grow v-model:model-value="section">
    <v-btn value="credential" @click="router.push({ name: 'Home' })">
      <v-icon>mdi-credit-card</v-icon>
      <span>Credencial</span>
    </v-btn>

    <v-btn value="phones" @click="router.push({ name: 'Phone' })">
      <v-icon>mdi-phone</v-icon>
      <span>Telefonos</span>
    </v-btn>

    <v-btn value="logout" @click="logout">
      <v-icon>mdi-logout</v-icon>
      <span>Salir</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

let section = ref(route.meta.section);

const logout = () => {
  authStore.$reset();
  router.push({ name: "SignIn" });
};
</script>
