<template>
  <VCol cols="12" v-if="pages > 1">
    <VRow align="center" justify="center">
      <VPagination
        :total-visible="7"
        :length="pages"
        v-model="currentPage"
      ></VPagination>
    </VRow>
  </VCol>
</template>

<script setup>
import { ref, watch } from "vue";

const emitter = defineEmits(["changePage"]);

const props = defineProps({
  pages: Number,
});

let currentPage = ref(1);

watch(currentPage, (value) => {
  emitter("changePage", value);
});
</script>
