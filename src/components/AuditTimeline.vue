<template>
  <div class="space-y-4">
    <div v-if="isLoading && shownLogs.length === 0" class="text-center py-6 text-sm text-surface-500 dark:text-surface-400">
      Carregando histórico...
    </div>

    <div v-else-if="shownLogs.length === 0" class="text-center py-6 text-sm text-surface-500 dark:text-surface-400">
      {{ emptyText }}
    </div>

    <div v-else class="relative border-l-2 border-surface-200 dark:border-surface-700/80 ml-3.5 space-y-4 py-1">
      <div v-for="log in shownLogs" :key="log.id" class="relative pl-6">
        <!-- Dot icon alinhado com o centro da linha vertical (borda de 2px) e com o cabeçalho do card -->
        <div class="absolute -left-[9px] top-3.5 w-4 h-4 rounded-full bg-surface-50 dark:bg-surface-900 border-2 border-brand-500 dark:border-brand-400 flex items-center justify-center shadow-xs z-10">
          <div class="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400"></div>
        </div>

        <!-- Card de Log -->
        <div class="bg-surface-50 dark:bg-surface-900/75 border border-surface-200 dark:border-surface-700/80 rounded-xl p-3.5 shadow-xs dark:shadow-card-dark hover:border-surface-300 dark:hover:border-surface-600 transition">
          <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span
                v-if="showResource"
                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 border-surface-200 dark:border-surface-700"
              >
                {{ resourceTypeLabels[log.resource_type] ?? log.resource_type }}
              </span>
              <span :class="['inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border', getAuditMeta(log).colorClass]">
                {{ getAuditMeta(log).label }}
              </span>
            </div>
            <span class="text-xs text-surface-500 dark:text-surface-400 font-normal">
              {{ formatAuditDate(log.created_at) }}
            </span>
          </div>

          <p class="text-sm text-surface-800 dark:text-surface-100 font-normal leading-relaxed mb-2">
            {{ log.message }}
          </p>

          <div class="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 pt-1.5 border-t border-surface-200/80 dark:border-surface-700/80">
            <span class="font-medium text-surface-700 dark:text-surface-200">{{ log.actor_name || 'Sistema' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { auditApi } from '@/api/audit'
import type { AuditLogItem } from '@/types/api'
import { getAuditMeta, formatAuditDate, resourceTypeLabels } from '@/utils/auditLabels'

const props = withDefaults(defineProps<{
  // Modo histórico de um item: busca os logs do post ou da mídia
  resourceType?: 'post' | 'media'
  resourceId?: string
  // Modo feed: os logs vêm prontos de quem usa o componente
  entries?: AuditLogItem[]
  // Exibe o tipo do item (Post, Mídia, Membro...) em cada registro
  showResource?: boolean
  emptyText?: string
}>(), {
  showResource: false,
  emptyText: 'Nenhum histórico registrado para este item.'
})

const fetchedLogs = ref<AuditLogItem[]>([])
const isLoading = ref<boolean>(false)

const shownLogs = computed(() => props.entries ?? fetchedLogs.value)

async function fetchLogs() {
  if (props.entries || !props.resourceId || !props.resourceType) return
  isLoading.value = true
  try {
    fetchedLogs.value = props.resourceType === 'post'
      ? await auditApi.getPostHistory(props.resourceId)
      : await auditApi.getMediaHistory(props.resourceId)
  } catch {
    fetchedLogs.value = []
  } finally {
    isLoading.value = false
  }
}

watch(() => props.resourceId, () => {
  fetchLogs()
})

onMounted(() => {
  fetchLogs()
})
</script>
