<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="text-center py-6 text-sm text-surface-500 dark:text-surface-400">
      Carregando histórico...
    </div>

    <div v-else-if="logs.length === 0" class="text-center py-6 text-sm text-surface-500 dark:text-surface-400">
      Nenhum histórico registrado para este item.
    </div>

    <div v-else class="relative border-l-2 border-surface-200 dark:border-surface-700/80 ml-3.5 space-y-4 py-1">
      <div v-for="log in logs" :key="log.id" class="relative pl-6">
        <!-- Dot icon alinhado com o centro da linha vertical (borda de 2px) e com o cabeçalho do card -->
        <div class="absolute -left-[9px] top-3.5 w-4 h-4 rounded-full bg-surface-50 dark:bg-surface-900 border-2 border-brand-500 dark:border-brand-400 flex items-center justify-center shadow-xs z-10">
          <div class="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400"></div>
        </div>

        <!-- Card de Log -->
        <div class="bg-surface-50 dark:bg-surface-900/75 border border-surface-200 dark:border-surface-700/80 rounded-xl p-3.5 shadow-xs dark:shadow-card-dark hover:border-surface-300 dark:hover:border-surface-600 transition">
          <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <span
              :class="[
                'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
                getActionMeta(log.action).colorClass
              ]"
            >
              {{ getActionMeta(log.action).label }}
            </span>
            <span class="text-xs text-surface-500 dark:text-surface-400 font-normal">
              {{ formatDate(log.created_at) }}
            </span>
          </div>

          <p class="text-sm text-surface-800 dark:text-surface-100 font-normal leading-relaxed mb-2">
            {{ log.message }}
          </p>

          <div class="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 pt-1.5 border-t border-surface-200/80 dark:border-surface-700/80">
            <span class="font-medium text-surface-700 dark:text-surface-200">{{ log.actor_name || 'Sistema' }}</span>
            <span v-if="log.actor_email" class="text-surface-500 dark:text-surface-400">({{ log.actor_email }})</span>
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

interface ActionMeta {
  label: string
  colorClass: string
}

function getActionMeta(action: string): ActionMeta {
  const act = (action || '').toLowerCase().trim()

  const map: Record<string, ActionMeta> = {
    // Post
    post_created: { label: 'Post Criado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    post_create: { label: 'Post Criado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    create_post: { label: 'Post Criado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    create: { label: 'Criado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    created: { label: 'Criado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },

    post_updated: { label: 'Post Editado', colorClass: 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' },
    post_update: { label: 'Post Editado', colorClass: 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' },
    update_post: { label: 'Post Editado', colorClass: 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' },
    update: { label: 'Atualizado', colorClass: 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' },
    updated: { label: 'Atualizado', colorClass: 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' },

    post_approved: { label: 'Aprovado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    approve: { label: 'Aprovado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    approved: { label: 'Aprovado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },

    post_rejected: { label: 'Reprovado', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },
    post_denied: { label: 'Reprovado', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },
    reject: { label: 'Reprovado', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },
    rejected: { label: 'Reprovado', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },
    denied: { label: 'Reprovado', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },

    post_review: { label: 'Enviado para Revisão', colorClass: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30' },
    submit_review: { label: 'Enviado para Revisão', colorClass: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30' },
    review: { label: 'Em Revisão', colorClass: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30' },
    pending: { label: 'Pendente', colorClass: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30' },

    post_published: { label: 'Publicado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    publish: { label: 'Publicado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },
    published: { label: 'Publicado', colorClass: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30' },

    post_deleted: { label: 'Post Excluído', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },
    delete: { label: 'Excluído', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },
    deleted: { label: 'Excluído', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },

    // Comentários
    comment_created: { label: 'Comentário Adicionado', colorClass: 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30' },
    comment_added: { label: 'Comentário Adicionado', colorClass: 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30' },
    comment_deleted: { label: 'Comentário Removido', colorClass: 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700' },

    // Mídias
    media_uploaded: { label: 'Mídia Enviada', colorClass: 'bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30' },
    media_created: { label: 'Mídia Enviada', colorClass: 'bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30' },
    media_attached: { label: 'Mídia Anexada', colorClass: 'bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30' },
    media_detached: { label: 'Mídia Removida', colorClass: 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700' },
    media_reordered: { label: 'Mídias Reordenadas', colorClass: 'bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30' },
    media_deleted: { label: 'Mídia Excluída', colorClass: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' },

    // Status
    status_changed: { label: 'Status Alterado', colorClass: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30' },
    status_change: { label: 'Status Alterado', colorClass: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30' }
  }

  if (map[act]) return map[act]

  let formatted = act
    .replace(/^(post_|media_|comment_)/i, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .trim()

  const lower = formatted.toLowerCase()
  if (lower === 'create' || lower === 'created') formatted = 'Criado'
  else if (lower === 'update' || lower === 'updated') formatted = 'Atualizado'
  else if (lower === 'approve' || lower === 'approved') formatted = 'Aprovado'
  else if (lower === 'reject' || lower === 'rejected' || lower === 'denied') formatted = 'Reprovado'
  else if (lower === 'delete' || lower === 'deleted') formatted = 'Excluído'
  else if (formatted.length > 0) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }

  return {
    label: formatted || 'Ação Registrada',
    colorClass: 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700'
  }
}

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
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return iso
  }
}
</script>