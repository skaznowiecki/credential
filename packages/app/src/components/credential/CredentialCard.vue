<template>
  <v-card class="mx-auto" max-width="500" elevation="0" :image="imageUrl">
    <div style="height: 10vh"></div>
    <VRow>
      <VCol cols="12">
        <v-card-item class="text-h6 text-white"
          >{{ affiliate.name }} {{ affiliate.lastName }}</v-card-item
        >
      </VCol>
      <VCol cols="12">
        <v-card-subtitle>
          <div><strong>PLAN : </strong> {{ affiliate.plan }}</div>
        </v-card-subtitle>

        <v-card-text>
          <div><strong>DNI : </strong> {{ affiliate.dni }}</div>
          <div><strong>FECHA DE ALTA : </strong> {{ formatDate }}</div>
        </v-card-text>
      </VCol>
    </VRow>
  </v-card>
</template>

<script setup>
import ImgAzul from "@/assets/credentials/SANOS_AZUL.png";
import ImgBlack from "@/assets/credentials/SANOS_BLACK.png";
import ImgCau from "@/assets/credentials/SANOS_CAU.png";
import ImgDorado from "@/assets/credentials/SANOS_DORADO.png";
import ImgIsoper from "@/assets/credentials/SANOS_ISOPER.png";

const imageMap = {
  "SUPER CELESTE": ImgAzul,
  "CELESTE PLUS": ImgAzul,
  CELESTE: ImgAzul,
  AZUL: ImgAzul,
  BLACK: ImgBlack,
  CAU: ImgCau,
  DORADO: ImgDorado,
  ISOPER: ImgIsoper,
};

import { computed } from "vue";

const props = defineProps({
  affiliate: {
    type: Object,
    required: true,
  },
});

const imageUrl = computed(() => {
  const [plan] = props.affiliate.plan.split(" ");

  if (Object.keys(imageMap).includes(plan)) {
    return imageMap[plan];
  }

  return ImgAzul;
});

const formatDate = computed(() => {
  const date = new Date(props.affiliate.createdAt);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
});
</script>
