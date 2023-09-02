<template>
  <v-card>
    <v-card-title>
      <span class="text-h6">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form fast-fail ref="importForm">
          <VRow>
            <VCol cols="12">
              <v-text-field label="Archivo" type="file" @change="onFileChanged($event)"
                :rules="fileValidation"></v-text-field>
            </VCol>
          </VRow>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="me-4" variant="outlined" type="button" @click="submit" :loading="loading">
        Subir
      </v-btn>
      <v-btn class="me-4" variant="outlined" type="button" @click="emitter('close')"> Cerrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const emitter = defineEmits(['submit', 'close', 'download'])

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
  }
})

const importForm = ref(null)
const file = ref(null)

const onFileChanged = ($event) => {
  const target = $event.target
  if (target && target.files) {
    file.value = target.files[0]
  }
}

const fileValidation = [
  (value) => {
    if (value) return true
    return 'Archivo con las liquidaciones es requerido.'
  }
]

const submit = async () => {
  const { valid } = await importForm.value.validate()
  if (!valid) return

  emitter('submit', { file: file.value })

  file.value = null
}
</script>
