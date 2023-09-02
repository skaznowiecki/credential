<template>
  <v-tabs color="mb-10" align-tabs="left" v-model:model-value="section">
    <v-tab v-for="{ title, value, active, name } in sections" :key="value" :value="name" :to="{ name: value }"
      :disabled="!active">{{ title }}</v-tab>
  </v-tabs>
</template>

<script setup>
import { ref } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

let section = ref(route.meta.section)

const sections = [
  {
    title: 'Afiliados',
    value: 'AffiliateList',
    name: 'affiliate',
    active: true
  }
]

</script>
