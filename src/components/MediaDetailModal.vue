<template>
  <div v-if="mediaDetailModalOpen && selectedMediaForDetail" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col fade-in shadow-2xl border border-surface-200 overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-surface-200 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-surface-800">Detalhes da Mídia</h3>
          <p class="text-xs text-surface-400 font-mono">ID: {{ selectedMediaForDetail.id }}</p>
        </div>
        <button @click="closeMediaDetailModal" class="p-1 hover:bg-surface-100 rounded-lg">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex border-b border-surface-200 px-6 bg-surface-50">
        <button
          @click="activeTab = 'info'"
          :class="['py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2',
            activeTab === 'info' ? 'border-brand-500 text-brand-600 font-semibold' : 'border-transparent text-surface-500 hover:text-surface-700']"
        >
          <Image class="w-4 h-4" /> Informações & Arquivo
        </button>
        <button
          @click="activeTab = 'audit'"
          :class="['py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2',
            activeTab === 'audit' ? 'border-brand-500 text-brand-600 font-semibold' : 'border-transparent text-surface-500 hover:text-surface-700']"
        >
          <History class="w-4 h-4" /> Histórico de Alterações
        </button>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Tab: Info -->
        <div v-if="activeTab === 'info'" class="space-y-6">
          <!-- Preview container -->
          <div class="bg-surface-900 rounded-xl overflow-hidden flex items-center justify-center p-4 max-h-72">
            <template v-if="previewUrl">
              <img
                v-if="selectedMediaForDetail.mime_type.startsWith('image/')"
                :src="previewUrl"
                :alt="selectedMediaForDetail.alias"
                class="max-h-64 object-contain rounded-lg"
              />
              <video
                v-else-if="selectedMediaForDetail.mime_type.startsWith('video/')"
                :src="previewUrl"
                controls
                class="max-h-64 rounded-lg"
              ></video>
            </template>
            <div v-else class="text-surface-400 text-sm py-12">
              Carregando visualização...
            </div>
          </div>

          <!-- Metadados -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="bg-surface-50 p-3 rounded-lg border border-surface-200">
              <span class="text-surface-400 block mb-0.5">Tipo MIME</span>
              <span class="font-medium text-surface-700">{{ selectedMediaForDetail.mime_type }}</span>
            </div>
            <div class="bg-surface-50 p-3 rounded-lg border border-surface-200">
              <span class="text-surface-400 block mb-0.5">Tamanho</span>
              <span class="font-medium text-surface-700">{{ (selectedMediaForDetail.size_bytes / 1024).toFixed(1) }} KB</span>
            </div>
          </div>

          <!-- Edição de Alias -->
          <form @submit.prevent="handleSaveAlias" class="p-4 bg-surface-50 rounded-xl border border-surface-200 space-y-3">
            <label class="block text-xs font-semibold uppercase text-surface-600">Editar Alias da Mídia</label>
            <div class="flex gap-2">
              <input
                v-model="newAlias"
                type="text"
                required
                class="flex-1 px-3 py-2 text-sm rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
              />
              <button
                type="submit"
                :disabled="isUpdating || newAlias === selectedMediaForDetail.alias"
                class="btn-primary px-4 py-2 text-xs font-medium rounded-lg disabled:opacity-50"
              >
                {{ isUpdating ? 'Salvando...' : 'Salvar Alias' }}
              </button>
            </div>
          </form>

          <!-- Ação perigosa: Excluir -->
          <div class="pt-4 border-t border-surface-200 flex justify-between items-center">
            <span class="text-xs text-surface-400">Deseja remover esta mídia do sistema?</span>
            <button
              type="button"
              @click="handleDelete"
              :disabled="isDeleting"
              class="btn-danger px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 disabled:opacity-50"
            >
              <Trash2 class="w-3.5 h-3.5" />
              {{ isDeleting ? 'Excluindo...' : 'Excluir Mídia' }}
            </button>
          </div>
        </div>

        <!-- Tab: Audit -->
        <div v-else-if="activeTab === 'audit'">
          <AuditTimeline resourceType="media" :resourceId="selectedMediaForDetail.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useModals } from '@/composables/useModals'
import { useMedia } from '@/composables/useMedia'
import { useToast } from '@/composables/useToast'
import { mediaApi } from '@/api/media'
import AuditTimeline from '@/components/AuditTimeline.vue'
import { X, Image, History, Trash2 } from '@lucide/vue'

const { mediaDetailModalOpen, selectedMediaForDetail, closeMediaDetailModal } = useModals()
const { updateAlias, deleteMedia } = useMedia()
const { showToast } = useToast()

const activeTab = ref<'info' | 'audit'>('info')
const previewUrl = ref<string>('')
const newAlias = ref<string>('')
const isUpdating = ref<boolean>(false)
const isDeleting = ref<boolean>(false)

watch(() => selectedMediaForDetail.value, async (media) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }

  if (media) {
    activeTab.value = 'info'
    newAlias.value = media.alias
    try {
      const blob = await mediaApi.getFileBlob(media.id)
      previewUrl.value = URL.createObjectURL(blob)
    } catch {
      previewUrl.value = ''
    }
  }
}, { immediate: true })

async function handleSaveAlias() {
  if (!selectedMediaForDetail.value || !newAlias.value.trim()) return
  isUpdating.value = true
  try {
    const updated = await updateAlias(selectedMediaForDetail.value.id, newAlias.value.trim())
    selectedMediaForDetail.value = updated
  } finally {
    isUpdating.value = false
  }
}

async function handleDelete() {
  if (!selectedMediaForDetail.value) return
  if (!confirm(`Tem certeza que deseja excluir a mídia "${selectedMediaForDetail.value.alias}"?`)) return
  isDeleting.value = true
  try {
    await deleteMedia(selectedMediaForDetail.value.id)
    closeMediaDetailModal()
  } finally {
    isDeleting.value = false
  }
}
</script>
