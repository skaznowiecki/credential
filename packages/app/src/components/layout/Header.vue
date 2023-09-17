<template>
  <v-container fill-height fluid>
    <VRow class="mt-20" align="center" justify="center">
    <v-col cols="6">
      <p align="center" class="text-h5 font-weight-bold text-blue-darken-4">{{section}}</p>
    </v-col>
    <v-col cols="6">
      <VImg :src="Logo" height="100"></VImg>
    </v-col>
  </VRow>
</v-container>

</template>


<script setup>

import Logo from "@/assets/logo-greey.png";


import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

let section = ref(route.meta.title)

</script>