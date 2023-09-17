<template>
  <AppLayout>
    <VRow>
      <VCol cols="12">
        <v-btn
          block
          variant="outlined"
          prepend-icon="mdi-whatsapp"
          @click="openWhatsapp"
        >
          Escribinos por whatsapp
        </v-btn>
      </VCol>

      <VCol cols="12">
        <v-btn
          block
          variant="outlined"
          prepend-icon="mdi-phone"
          @click="openPhone('08103450622')"
        >
          0810 345 0622
        </v-btn>
      </VCol>

      <VCol cols="12">
        <v-divider :thickness="2" class="border-opacity-100"></v-divider>
      </VCol>
      <VCol cols="12">
        <v-btn
          block
          color="red"
          prepend-icon="mdi-phone"
          @click="openPhone('08008887266')"
          >Emergencias 0800 888 7266
        </v-btn>
      </VCol>
      <VCol cols="12">
        <v-btn
          block
          variant="outlined"
          prepend-icon="mdi-email"
          @click="openEmail('info@sanossalud.com.ar')"
        >
          info@sanossalud.com.ar
        </v-btn>
      </VCol>
    </VRow>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";

const openWhatsapp = () => {
  window.open("https://wa.me/1171403926", "_blank");
};

const openPhone = (number) => {
  window.open(`tel:${number}`, "_blank");
};

const openEmail = (email) => {
  window.open(`mailto:${email}`, "_blank");
};
</script>
