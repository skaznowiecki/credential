<template>
  <div :title="hummanFriendlyDate">
    {{ diffForHumans }}
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/es'

import { computed } from 'vue'

dayjs.extend(relativeTime)
dayjs.locale(locale)

const props = defineProps({
  datetime: {
    type: String,
    required: true
  }
})

const datetime = computed(() => {
  return props.datetime
})

const diffForHumans = computed(() => {
  return dayjs(datetime.value).fromNow()
})

const hummanFriendlyDate = computed(() => {
  return dayjs(datetime.value).format('MMMM D, YYYY HH:mm')
})
</script>
