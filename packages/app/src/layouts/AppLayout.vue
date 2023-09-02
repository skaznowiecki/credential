<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>

    <NavBar />
  </v-app>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import NavBar from '../components/layout/NavBar.vue';

</script>
