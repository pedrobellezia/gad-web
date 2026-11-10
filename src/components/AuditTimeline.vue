<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="text-center py-6 text-sm text-surface-400">
      Carregando histórico...
    </div>

    <div v-else-if="logs.length === 0" class="text-center py-6 text-sm text-surface-400">
      Nenhum histórico registrado para este item.
    </div>

    <div v-else class="relative border-l-2 border-surface-200 ml-4 space-y-6 py-2">
      <div v-for="log in logs" :key="log.id" class="relative pl-6">
        <!-- Dot icon -->
        <div class="absolute -left-2.25 top-0.5 w-4 h-4 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center">
          <div class="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
        </div>

        <div class="bg-surface-50 border border-surface-200 rounded-xl p-3 shadow-xs">
          <div class="flex items-center justify-between text-xs text-surface-400 mb-1">
            <span class="font-medium text-surface-700">{{ log.actor_name }} ({{ log.actor_email }})</span>
            <span>{{ formatDate(log.created_at) }}</span>
          </div>
          <p class="text-sm text-surface-700 font-normal leading-relaxed">
            {{ log.message }}
          </p>
          <div class="mt-1 flex items-center gap-1.5 text-xs text-surface-400">
            <span class="px-1.5 py-0.5 rounded bg-surface-200 font-mono text-[11px] uppercase tracking-wider text-surface-600">
              {{ log.action }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { auditApi } from '@/api/audit'
import type { AuditLogItem } from '@/types/api'

const props = defineProps<{
  resourceType: 'post' | 'media'
  resourceId: string
}>()

const logs = ref<AuditLogItem[]>([])
const isLoading = ref<boolean>(false)

async function fetchLogs() {
  if (!props.resourceId) return
  isLoading.value = true
  try {
    if (props.resourceType === 'post') {
      logs.value = await auditApi.getPostHistory(props.resourceId)
    } else {
      logs.value = await auditApi.getMediaHistory(props.resourceId)
    }
  } catch (err) {
    logs.value = []
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

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('pt-BR')
  } catch {
    return iso
  }
}
</script>
