<template>
  <VCol cols="12">
    <VTable class="elevation-1 rounded-lg">
      <thead class="text-uppercase text-subtitle-2">
        <tr>
          <th class="text-center">DNI</th>
          <th class="text-center">Nombre</th>
          <th class="text-center">Apellido</th>
          <th class="text-center">Email</th>
          <th class="text-center">Plan</th>
          <th class="text-center">Fecha alta</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in affiliates" :key="item.pk">
          <td class="text-center">{{ item.dni }}</td>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.lastName }}</td>
          <td class="text-center">{{ item.email }}</td>
          <td class="text-center">{{ item.plan }}</td>
          <td class="text-center">{{ new Date(item.createdAt ).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCol>
</template>

<script setup>
defineProps({
  affiliates: {
    type: Array,
    required: true
  }
})
</script>
