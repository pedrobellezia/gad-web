<template>
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
    <button
      v-for="card in statCards"
      :key="card.status"
      type="button"
      @click="emit('select', card.status)"
      :class="[
        'text-left bg-surface-50 dark:bg-surface-800/85 p-5 rounded-2xl border shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all',
        active === card.status
          ? 'border-brand-400 dark:border-brand-500/60 ring-2 ring-brand-200 dark:ring-brand-500/25'
          : 'border-surface-200 dark:border-surface-700/80'
      ]"
    >
      <div class="flex items-center justify-between mb-3">
        <span :class="['text-xs font-semibold uppercase tracking-wider', card.labelClass]">{{ card.label }}</span>
        <div :class="['w-8 h-8 rounded-xl border flex items-center justify-center', card.iconClass]">
          <component :is="card.icon" class="w-4 h-4" />
        </div>
      </div>
      <p :class="['text-3xl font-bold', card.valueClass]">{{ counts[card.status] ?? 0 }}</p>
      <p class="text-[11px] text-surface-500 dark:text-surface-400 mt-1">{{ card.hint }}</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PostStatus } from '@/types/api'
import { PenLine, Clock, CheckCircle2, XCircle, Send } from '@lucide/vue'

// Resumo de posts por status; clicar num card filtra a lista pelo status
defineProps<{
  counts: Partial<Record<PostStatus, number>>
  // Status destacado (o filtro ativo), ou null quando nenhum card corresponde ao filtro
  active: string | null
}>()

const emit = defineEmits<{ select: [status: PostStatus] }>()

const statCards = [
  { status: 'draft' as PostStatus, label: 'Rascunhos', hint: 'Em produção', icon: PenLine, labelClass: 'text-surface-500 dark:text-surface-400', valueClass: 'text-surface-900 dark:text-surface-50', iconClass: 'bg-surface-100 dark:bg-surface-700/60 text-surface-600 dark:text-surface-300 border-surface-200 dark:border-surface-600' },
  { status: 'review' as PostStatus, label: 'Em Revisão', hint: 'Aguardando o cliente', icon: Clock, labelClass: 'text-amber-600 dark:text-amber-300', valueClass: 'text-amber-700 dark:text-amber-300', iconClass: 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-500/25' },
  { status: 'approved' as PostStatus, label: 'Aprovados', hint: 'Prontos para publicar', icon: CheckCircle2, labelClass: 'text-emerald-600 dark:text-mint-400', valueClass: 'text-emerald-700 dark:text-mint-300', iconClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-600 dark:text-mint-400 border-emerald-200 dark:border-mint-500/25' },
  { status: 'denied' as PostStatus, label: 'Reprovados', hint: 'Recusados pelo cliente', icon: XCircle, labelClass: 'text-red-600 dark:text-red-400', valueClass: 'text-red-700 dark:text-red-300', iconClass: 'bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/25' },
  { status: 'published' as PostStatus, label: 'Publicados', hint: 'Finalizados', icon: Send, labelClass: 'text-brand-600 dark:text-brand-300', valueClass: 'text-surface-900 dark:text-surface-50', iconClass: 'bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300 border-brand-100 dark:border-brand-500/25' }
]
</script>
