<template>
  <span :class="['status-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors', badgeClasses]">
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
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
    case 'approved':
    case 'aprovado':
      return 'bg-green-100 text-green-700 dark:bg-mint-500/15 dark:text-mint-300'
    case 'review':
    case 'revisao':
    case 'pending':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
    case 'denied':
    case 'rejeitado':
    case 'reprovado':
      return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300'
    case 'draft':
    case 'rascunho':
      return 'bg-surface-200/80 text-surface-700 dark:bg-surface-700/80 dark:text-surface-200'
    default:
      return 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-300'
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
      return 'Revisão'
    case 'denied':
    case 'rejeitado':
    case 'reprovado':
      return 'Reprovado'
    case 'draft':
    case 'rascunho':
      return 'Rascunho'
    default:
      return props.status
  }
})
</script>