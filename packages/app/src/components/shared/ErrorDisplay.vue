<template>
  <div class="mb-2 mt-2" v-if="error !== ''">
    <p class="text-body-2">
      <v-alert color="error" :text="error"></v-alert>
    </p>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    required: true
  }
})
</script>
