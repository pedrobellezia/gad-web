<template>
  <div>
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Atividades</h2>
        <p class="text-sm text-surface-500 dark:text-surface-400">Tudo o que aconteceu na agência, incluindo itens já excluídos e membros que saíram</p>
      </div>
      <button
        type="button"
        @click="reload"
        :disabled="isLoading"
        class="btn-secondary px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50"
      >
        <RefreshCw :class="['w-4 h-4', { 'animate-spin': isLoading }]" />Atualizar
      </button>
    </div>

    <div class="flex flex-wrap gap-1.5 bg-surface-50 dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700/80 p-1 rounded-lg text-xs w-fit mb-6">
      <button
        v-for="opt in filterOptions"
        :key="opt.value"
        type="button"
        @click="setFilter(opt.value)"
        :class="['px-2.5 py-1 rounded-md font-medium transition', filter === opt.value ? 'bg-brand-500 text-white' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100']"
      >
        {{ opt.label }}
      </button>
    </div>

    <div class="max-w-3xl">
      <AuditTimeline :entries="logs" show-resource empty-text="Nenhuma atividade registrada." />

      <p v-if="loadError" class="text-sm text-danger dark:text-red-400 text-center mt-4">{{ loadError }}</p>

      <div v-if="hasMore" class="text-center mt-6">
        <button
          type="button"
          @click="loadMore"
          :disabled="isLoading"
          class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {{ isLoading ? 'Carregando...' : 'Carregar mais' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auditApi, type AuditLogParams } from '@/api/audit'
import type { AuditLogItem } from '@/types/api'
import AuditTimeline from './AuditTimeline.vue'
import { RefreshCw } from '@lucide/vue'

type Filter = 'all' | NonNullable<AuditLogParams['resource_type']>

const PAGE_SIZE = 50

const filterOptions: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'post', label: 'Posts' },
  { value: 'media', label: 'Mídias' },
  { value: 'comment', label: 'Comentários' },
  { value: 'user', label: 'Membros' },
  { value: 'invite_token', label: 'Convites' }
]

const filter = ref<Filter>('all')
const logs = ref<AuditLogItem[]>([])
const isLoading = ref(false)
const hasMore = ref(false)
const loadError = ref('')
// Ignora respostas de requisições antigas (ex.: troca rápida de filtro)
let requestSeq = 0

async function fetchPage(skip: number) {
  const seq = ++requestSeq
  isLoading.value = true
  loadError.value = ''
  try {
    const page = await auditApi.getAuditLogs({
      resource_type: filter.value === 'all' ? undefined : filter.value,
      skip,
      limit: PAGE_SIZE
    })
    if (seq !== requestSeq) return
    logs.value = skip === 0 ? page : [...logs.value, ...page]
    hasMore.value = page.length === PAGE_SIZE
  } catch (err: any) {
    if (seq === requestSeq) loadError.value = err?.message || 'Erro ao carregar atividades'
  } finally {
    if (seq === requestSeq) isLoading.value = false
  }
}

function reload() {
  return fetchPage(0)
}

function loadMore() {
  return fetchPage(logs.value.length)
}

function setFilter(value: Filter) {
  if (filter.value === value) return
  filter.value = value
  logs.value = []
  reload()
}

onMounted(reload)
</script>
