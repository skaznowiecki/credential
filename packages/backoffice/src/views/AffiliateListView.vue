<template>
  <AppLayout>
    <VRow class="mt-1">

      <AffiliateAction @refresh="fetchAffiliates()" @create="createAffiliate" @delete="deleteAffiliate" />
      <AffiliateList :affiliates="affiliates" />
      <DynamoPagination :nextToken="nextToken" @changePage="changePage" />


      <VDialog v-model="affiliateImportForm" persistent width="700">
        <AffiliateForm :loading="loading" :title="title" @submit="submitImportFile" @close="closeImportForm" />
      </VDialog>
    </VRow>
  </AppLayout>
</template>
  
<script setup>
import { API } from 'aws-amplify'
import { ref, onMounted } from 'vue'

import AppLayout from '@/layouts/AppLayout.vue'
import AffiliateList from '@/components/affiliate/AffiliateList.vue'
import DynamoPagination from '@/components/shared/DynamoPagination.vue'

import AffiliateAction from '@/components/affiliate/AffiliateAction.vue'
import AffiliateForm from '@/components/affiliate/AffiliateForm.vue'
import * as XLSX from "xlsx";


let affiliateImportForm = ref(false)
let loading = ref(false)
let isCreated = true;

let title = ref('Importar afiliados')


const closeImportForm = () => {
  affiliateImportForm.value = false
}

const submitImportFile = async ({ file }) => {
  loading.value = true


  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = async (e) => {
    const wb = XLSX.read(e.target.result, { type: "binary" });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const affiliates = XLSX.utils.sheet_to_json(ws);

    if (isCreated) {
      await storeAffiliates(affiliates)
    } else {
      await removeAffiliates(affiliates)
    }

    loading.value = false
    affiliateImportForm.value = false
  };
}



const createAffiliate = () => {
  title.value = 'Importar afiliados'
  affiliateImportForm.value = true
  isCreated = true

}

const deleteAffiliate = () => {
  title.value = 'Eliminar afiliados'
  affiliateImportForm.value = true
  isCreated = false
}

const affiliates = ref([])

let nextToken = ref(null)



const storeAffiliates = async (affiliates) => {
  await API.post('api', '/affiliates', {
    body: {
      credentials: affiliates
    }
  })
}

const removeAffiliates = async (affiliates) => {
  await API.del('api', '/affiliates', {
    body: {
      credentials: affiliates
    }
  })
}

const fetchAffiliates = async (token) => {
  const response = await API.get('api', '/affiliates', {
    queryStringParameters: {
      nextToken: token
    }
  })

  affiliates.value = response.items
  nextToken.value = response.nextToken
}

const changePage = ({ token }) => {
  fetchAffiliates(token)
}


onMounted(() => {
  fetchAffiliates()
})
</script>
  