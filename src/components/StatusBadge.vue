<template>
  <span :class="['status-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', badgeClasses]">
    {{ badgeText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: string
}>()

const badgeClasses = computed(() => {
  switch (props.status) {
    case 'published':
    case 'publicado':
      return 'bg-emerald-100 text-emerald-700'
    case 'approved':
    case 'aprovado':
      return 'bg-green-100 text-green-700'
    case 'review':
    case 'revisao':
    case 'pending':
      return 'bg-amber-100 text-amber-700'
    case 'denied':
    case 'rejeitado':
      return 'bg-red-100 text-red-700'
    case 'draft':
    case 'rascunho':
      return 'bg-slate-100 text-slate-700'
    default:
      return 'bg-surface-100 text-surface-600'
  }
})

const badgeText = computed(() => {
  switch (props.status) {
    case 'published':
    case 'publicado':
      return 'Publicado'
    case 'approved':
    case 'aprovado':
      return 'Aprovado'
    case 'review':
    case 'revisao':
    case 'pending':
      return 'Em Revisão'
    case 'denied':
    case 'rejeitado':
      return 'Reprovado'
    case 'draft':
    case 'rascunho':
      return 'Rascunho'
    default:
      return props.status
  }
})
</script>
