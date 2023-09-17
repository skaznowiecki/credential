<template>
  <v-app class="overflow-hidden">
    <v-divider
      :thickness="5"
      color="#039BE5"
      class="border-opacity-100"
    ></v-divider>
    <v-divider
      :thickness="5"
      color="#0D47A1"
      class="border-opacity-100"
    ></v-divider>
    <v-main>
      <v-container>
        <Header></Header>
        <br /><br />
        <slot></slot>
      </v-container>
    </v-main>
    <NavBar />
  </v-app>
</template>

<script setup>
import Header from "@/components/layout/Header.vue";
import NavBar from "../components/layout/NavBar.vue";
</script>
