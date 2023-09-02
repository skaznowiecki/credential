<template>
  <v-layout>
    <v-container class="py-4 px-4" fluid>
      <Header />
      <Tab />
      <slot></slot>
    </v-container>
  </v-layout>
</template>

<script setup>
import Tab from '@/components/layout/Tab.vue'
import Header from '@/components/layout/Header.vue'

</script>
