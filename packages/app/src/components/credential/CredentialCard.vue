<template>
    <v-card class="mx-auto" max-width="400">
        <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
            <v-card-title>{{ affiliate.name }} {{ affiliate.lastName }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
            <div><strong>PLAN : </strong> {{ affiliate.plan }} </div>

        </v-card-subtitle>

        <v-card-text>
            <div><strong>DNI : </strong> {{ affiliate.dni }}</div>
            <div><strong>FECHA DE ALTA : </strong> {{ formatDate }}</div>
        </v-card-text>
    </v-card>
</template>

<script setup>

import { computed } from "vue"

const props = defineProps({
    affiliate: {
        type: Object,
        required: true
    }
})

const formatDate = computed(() => {
    const date = new Date(props.affiliate.createdAt)
    return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
})

</script>