<template>
  <VCol cols="12">
    <div class="text-h4">{{ title }}</div>
  </VCol>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
