<template>
  <span :class="['status-badge', badgeClasses]">
    {{ badgeText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClasses = computed(() => {
  switch (props.status) {
    case 'approved':
    case 'aprovado':
      return 'bg-green-100 text-success'
    case 'pending':
    case 'aguardando':
      return 'bg-yellow-100 text-warning'
    case 'rejected':
    case 'rejeitado':
      return 'bg-red-100 text-danger'
    case 'draft':
    case 'rascunho':
      return 'bg-blue-100 text-brand-600'
    default:
      return 'bg-surface-100 text-surface-600'
  }
})

const badgeText = computed(() => {
  switch (props.status) {
    case 'approved':
    case 'aprovado':
      return 'Aprovado'
    case 'pending':
    case 'aguardando':
      return 'Aguardando Aprovação'
    case 'rejected':
    case 'rejeitado':
      return 'Rejeitado'
    case 'draft':
    case 'rascunho':
      return 'Rascunho'
    default:
      return props.status
  }
})
</script>
