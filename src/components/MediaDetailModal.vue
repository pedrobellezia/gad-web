<template>
  <div v-if="mediaDetailModalOpen && selectedMediaForDetail" class="fixed inset-0 bg-surface-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-surface-50 dark:bg-surface-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col fade-in shadow-2xl dark:shadow-card-dark border border-surface-200 dark:border-surface-700/80 overflow-hidden transition-colors">
      <!-- Header -->
      <div class="p-6 border-b border-surface-200 dark:border-surface-700/80 flex items-center justify-between gap-3">
        <h3 class="text-lg font-bold text-surface-900 dark:text-surface-50 truncate" :title="selectedMediaForDetail.alias">
          {{ selectedMediaForDetail.alias }}
        </h3>
        <button @click="closeMediaDetailModal" class="p-1.5 hover:bg-surface-200/60 dark:hover:bg-surface-700/70 rounded-lg transition shrink-0">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex border-b border-surface-200 dark:border-surface-700/80 px-6 bg-surface-100/70 dark:bg-surface-900/60">
        <button
          @click="activeTab = 'info'"
          :class="['py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2',
            activeTab === 'info' ? 'border-brand-500 text-brand-600 dark:text-brand-400 font-semibold' : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200']"
        >
          <Image class="w-4 h-4" /> Informações
        </button>
        <button
          @click="activeTab = 'audit'"
          :class="['py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2',
            activeTab === 'audit' ? 'border-brand-500 text-brand-600 dark:text-brand-400 font-semibold' : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200']"
        >
          <History class="w-4 h-4" /> Histórico
        </button>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Tab: Info -->
        <div v-if="activeTab === 'info'" class="space-y-6">
          <!-- Miniatura; o original só carrega ao clicar -->
          <button
            type="button"
            @click="openMediaViewer(selectedMediaForDetail)"
            class="block w-full h-64 bg-surface-900 dark:bg-surface-950 rounded-xl overflow-hidden border border-surface-800 cursor-zoom-in"
            :title="isVideo ? 'Assistir vídeo original' : 'Ver imagem original'"
          >
            <MediaImage
              :media-id="selectedMediaForDetail.id"
              :alt="selectedMediaForDetail.alias"
              :video="isVideo"
              img-class="!object-contain"
            />
          </button>

          <!-- Metadados -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="bg-surface-100/80 dark:bg-surface-900/75 p-3 rounded-lg border border-surface-200 dark:border-surface-700/80">
              <span class="text-surface-500 dark:text-surface-400 block mb-0.5">Tipo</span>
              <span class="font-medium text-surface-800 dark:text-surface-100">
                {{ isVideo ? 'Vídeo' : 'Imagem' }} · {{ formatLabel }}
              </span>
            </div>
            <div class="bg-surface-100/80 dark:bg-surface-900/75 p-3 rounded-lg border border-surface-200 dark:border-surface-700/80">
              <span class="text-surface-500 dark:text-surface-400 block mb-0.5">Tamanho</span>
              <span class="font-medium text-surface-800 dark:text-surface-100">{{ formatBytes(selectedMediaForDetail.size_bytes) }}</span>
            </div>
          </div>

          <!-- Designer (só a agência troca a autoria) -->
          <section v-if="isAgency || selectedMediaForDetail.designer !== undefined" class="p-4 bg-surface-100/80 dark:bg-surface-900/75 rounded-xl border border-surface-200 dark:border-surface-700/80">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-300 mb-3">Designer</h4>

            <div v-if="editingDesigner" class="space-y-3">
              <MemberPicker
                v-model="selectedDesignerId"
                :label="currentDesigner ? 'Trocar designer' : 'Adicionar designer'"
                :members="designers"
                noun="designer"
              />
              <div class="flex justify-end gap-2">
                <button type="button" @click="editingDesigner = false" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
                  Cancelar
                </button>
                <button
                  type="button"
                  @click="saveDesigner(selectedDesignerId)"
                  :disabled="isSavingDesigner || !selectedDesignerId || selectedDesignerId === selectedMediaForDetail.designer_id"
                  class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  Salvar
                </button>
              </div>
            </div>

            <div v-else class="flex items-center justify-between gap-3 flex-wrap">
              <UserChip :user="currentDesigner" label="Designer" :empty-text="designerEmptyText" />
              <div v-if="isAgency" class="flex items-center gap-2">
                <template v-if="selectedMediaForDetail.designer_id">
                  <button
                    type="button"
                    @click="startEditDesigner"
                    class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <RefreshCw class="w-3.5 h-3.5" />Trocar
                  </button>
                  <button
                    type="button"
                    @click="removeDesigner"
                    :disabled="isSavingDesigner"
                    class="px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 transition disabled:opacity-50"
                  >
                    <UserMinus class="w-3.5 h-3.5" />Remover
                  </button>
                </template>
                <button
                  v-else
                  type="button"
                  @click="startEditDesigner"
                  class="btn-primary px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <UserPlus class="w-3.5 h-3.5" />Adicionar
                </button>
              </div>
            </div>
          </section>

          <!-- Edição do nome -->
          <form v-if="canEditMedia" @submit.prevent="handleSaveAlias" class="p-4 bg-surface-100/80 dark:bg-surface-900/75 rounded-xl border border-surface-200 dark:border-surface-700/80 space-y-3">
            <label class="block text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-300">Nome da mídia</label>
            <div class="flex gap-2">
              <input
                v-model="newAlias"
                type="text"
                required
                class="flex-1 px-3 py-2 text-sm rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none bg-surface-50 dark:bg-surface-950/60 text-surface-800 dark:text-surface-100"
              />
              <button
                type="submit"
                :disabled="isUpdating || !newAlias.trim() || newAlias.trim() === selectedMediaForDetail.alias"
                class="btn-primary px-4 py-2 text-xs font-medium rounded-lg disabled:opacity-50"
              >
                {{ isUpdating ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </form>

          <!-- Ação perigosa: Excluir -->
          <div v-if="canEditMedia" class="pt-4 border-t border-surface-200 dark:border-surface-700/80 flex justify-between items-center gap-3">
            <span class="text-xs text-surface-500 dark:text-surface-400">Mídias usadas em posts aprovados, reprovados ou publicados não podem ser excluídas.</span>
            <button
              type="button"
              @click="handleDelete"
              :disabled="isDeleting"
              class="btn-danger px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 disabled:opacity-50 shrink-0"
            >
              <Trash2 class="w-3.5 h-3.5" />
              {{ isDeleting ? 'Excluindo...' : 'Excluir mídia' }}
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
import { useDialog } from '@/composables/useDialog'
import { ref, computed, watch } from 'vue'
import { useModals } from '@/composables/useModals'
import { useMedia } from '@/composables/useMedia'
import { useMediaViewer } from '@/composables/useMediaViewer'
import { useAuth } from '@/composables/useAuth'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { formatBytes } from '@/utils/format'
import AuditTimeline from '@/components/AuditTimeline.vue'
import MediaImage from '@/components/MediaImage.vue'
import MemberPicker from '@/components/MemberPicker.vue'
import UserChip from '@/components/UserChip.vue'
import { X, Image, History, Trash2, RefreshCw, UserMinus, UserPlus } from '@lucide/vue'

const { confirmDialog } = useDialog()
const { mediaDetailModalOpen, selectedMediaForDetail, closeMediaDetailModal } = useModals()
const { updateAlias, updateDesigner, deleteMedia } = useMedia()
const { openMediaViewer } = useMediaViewer()
const { currentUser } = useAuth()
const { designers, fetchAllMembers } = useAgencyMembers()

const activeTab = ref<'info' | 'audit'>('info')
const newAlias = ref<string>('')
const isUpdating = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const editingDesigner = ref(false)
const selectedDesignerId = ref<string | null>(null)
const isSavingDesigner = ref(false)

const isAgency = computed(() => currentUser.value?.type === 'agency')
const isVideo = computed(() => selectedMediaForDetail.value?.media_type === 'video')
const formatLabel = computed(() => selectedMediaForDetail.value?.mime_type.split('/')[1]?.toUpperCase() ?? '')

const currentDesigner = computed(() => {
  const media = selectedMediaForDetail.value
  if (!media?.designer_id) return null
  // A API embute o designer na mídia; a lista da agência é o fallback
  return media.designer ?? designers.value.find(d => d.user.id === media.designer_id)?.user ?? null
})
// Renomear e excluir: a agência ou o designer da mídia (o redator só consulta)
const canEditMedia = computed(() =>
  isAgency.value ||
  (currentUser.value?.type === 'designer' && selectedMediaForDetail.value?.designer_id === currentUser.value.id)
)
// designer_id sem resumo: conta desativada ou lista ainda carregando
const designerEmptyText = computed(() => selectedMediaForDetail.value?.designer_id ? 'Designer indisponível' : 'Sem designer')

watch(() => selectedMediaForDetail.value?.id, (id) => {
  if (!id || !selectedMediaForDetail.value) return
  activeTab.value = 'info'
  newAlias.value = selectedMediaForDetail.value.alias
  editingDesigner.value = false
  if (isAgency.value) fetchAllMembers().catch(() => {})
}, { immediate: true })

async function handleSaveAlias() {
  if (!selectedMediaForDetail.value || !newAlias.value.trim()) return
  isUpdating.value = true
  try {
    selectedMediaForDetail.value = await updateAlias(selectedMediaForDetail.value.id, newAlias.value.trim())
  } catch {
    // erro já exibido via toast pelo composable
  } finally {
    isUpdating.value = false
  }
}

function startEditDesigner() {
  selectedDesignerId.value = selectedMediaForDetail.value?.designer_id ?? null
  editingDesigner.value = true
}

async function saveDesigner(id: string | null) {
  if (!selectedMediaForDetail.value) return
  isSavingDesigner.value = true
  try {
    selectedMediaForDetail.value = await updateDesigner(selectedMediaForDetail.value.id, id)
    editingDesigner.value = false
  } catch {
    // erro já exibido via toast pelo composable
  } finally {
    isSavingDesigner.value = false
  }
}

async function removeDesigner() {
  const name = currentDesigner.value?.name ?? 'O designer'
  const ok = await confirmDialog({
    title: 'Remover designer',
    message: `${name} deixa de ser o designer desta mídia e não poderá mais editá-la. A mídia continua na biblioteca da agência.`,
    confirmLabel: 'Remover',
    danger: true
  })
  if (ok) await saveDesigner(null)
}

async function handleDelete() {
  if (!selectedMediaForDetail.value) return
  if (!(await confirmDialog({ title: 'Excluir mídia', message: `Tem certeza que deseja excluir a mídia "${selectedMediaForDetail.value.alias}"?`, confirmLabel: 'Excluir', danger: true }))) return
  isDeleting.value = true
  try {
    await deleteMedia(selectedMediaForDetail.value.id)
    closeMediaDetailModal()
  } catch {
    // erro já exibido via toast pelo composable
  } finally {
    isDeleting.value = false
  }
}
</script>
