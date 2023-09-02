<template>
  <VCol cols="12">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn
          color="indigo"
          size="small"
          :disabled="prevToken.length === 0"
          @click="clickPrevToken"
        >
          Anterior
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="indigo" size="small" :disabled="nextToken === null" @click="clickNextToken">
          Siguiente</v-btn
        >
      </v-col>
    </v-row>
  </VCol>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  nextToken: {
    type: String | null,
    required: false
  }
})
let prevToken = ref([])
let nextToken = ref(props.nextToken || null)

const emitter = defineEmits(['changePage'])

const clickPrevToken = () => {
  nextToken.value = prevToken.value.pop()
  emitter('changePage', { token: prevToken.value })
}

const clickNextToken = () => {
  prevToken.value.push(nextToken.value)
  emitter('changePage', { token: nextToken.value })
}
</script>
