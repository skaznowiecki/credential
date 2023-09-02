<template>
  <v-col cols="12" md="12">
    <v-row justify="end">
      <v-col cols="auto">
        <v-btn prepend-icon="mdi-account-plus" variant="outlined" size="small" @click="emitter('create')">
          Dar de alta
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn prepend-icon="mdi-account-remove" variant="outlined" size="small" @click="emitter('delete')">
          Dar de baja
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn prepend-icon="mdi-reload" variant="outlined" size="small" @click="emitter('refresh')">
          Recargar
        </v-btn>
      </v-col>
    </v-row>

  </v-col>
</template>

<script setup>
const emitter = defineEmits(['create', 'delete', 'refresh'])
</script>
