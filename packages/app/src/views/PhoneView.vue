<template>
    <AppLayout>
        <CredentialCard :affiliate="affiliate" v-if="affiliate != null" />
    </AppLayout>
</template>

<script setup>
import { API } from 'aws-amplify'
import { ref, onMounted } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'
import CredentialCard from '@/components/credential/CredentialCard.vue';


let affiliate = ref(null)

const fetchAffiliate = async () => {
    const response = await API.get('api', '/affiliates')
    affiliate.value = response
}

onMounted(() => {
    fetchAffiliate()
})

</script>