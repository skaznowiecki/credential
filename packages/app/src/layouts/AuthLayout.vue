<template>
  <div class="d-flex align-center justify-center" style="height: 80vh">
    <v-sheet class="mx-auto">
      <div class="mb-10">
        <VImg :src="Logo" height="100"></VImg>
      </div>
      <slot> </slot>
    </v-sheet>
  </div>
</template>

<script setup>
import Logo from "@/assets/logo.png";
</script>
