<template>
  <div v-if="editPostModalOpen && selectedPostForEdit" class="fixed inset-0 bg-surface-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl fade-in shadow-2xl dark:shadow-card-dark my-8 border border-surface-200 dark:border-surface-700/80 transition-colors">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-50">Editar Post</h3>
          <p class="text-xs text-surface-500 dark:text-surface-400">Versão atual: {{ selectedPostForEdit.version }}</p>
        </div>
        <button @click="closeEditPostModal" class="p-1.5 hover:bg-surface-200/60 dark:hover:bg-surface-700/70 rounded-lg transition">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <div v-if="selectedPostForEdit.status === 'approved'" class="p-3 mb-4 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
        <AlertCircle class="w-4 h-4 shrink-0" />
        <span><strong>Atenção:</strong> Este post já está aprovado. Qualquer alteração fará o post voltar automaticamente para <strong>Revisão</strong>!</span>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Título do Post *</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100"
          />
        </div>

        <div v-if="canEditClient">
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Cliente Destinatário (Agência)</label>
          <select
            v-model="form.client_id"
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100"
          >
            <option :value="null" class="bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-200">Nenhum cliente (volta para rascunho)</option>
            <option v-for="cl in clients" :key="cl.user.id" :value="cl.user.id" class="bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
              {{ cl.user.name }} ({{ cl.user.email }})
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Conteúdo do Post *</label>
          <textarea
            v-model="form.content"
            required
            rows="4"
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100"
          ></textarea>
        </div>

        <!-- Media Selector with Positions -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-surface-700 dark:text-surface-200">
              Mídias Anexadas e Posições
            </label>
            <span class="text-xs text-surface-500 dark:text-surface-400">{{ selectedMedias.length }} selecionada(s)</span>
          </div>

          <div v-if="selectedMedias.length > 0" class="space-y-2 mb-3">
            <div
              v-for="(sm, idx) in selectedMedias"
              :key="sm.media_id"
              class="flex items-center justify-between p-2.5 bg-surface-100/80 dark:bg-surface-900/75 border border-surface-200 dark:border-surface-700/80 rounded-lg text-xs"
            >
              <div class="flex items-center gap-2">
                <span class="font-bold text-surface-500 dark:text-surface-400">Posição {{ idx }}</span>
                <span class="text-surface-800 dark:text-surface-100 font-medium">{{ getMediaAlias(sm.media_id) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  :disabled="idx === 0"
                  @click="moveMedia(idx, -1)"
                  class="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded disabled:opacity-30"
                >
                  <ArrowUp class="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  :disabled="idx === selectedMedias.length - 1"
                  @click="moveMedia(idx, 1)"
                  class="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded disabled:opacity-30"
                >
                  <ArrowDown class="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  @click="removeMedia(idx)"
                  class="p-1 hover:bg-red-50 dark:hover:bg-red-500/15 text-danger dark:text-red-400 rounded ml-1"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Quick pick from agency media library -->
          <div class="border border-surface-200 dark:border-surface-700/80 rounded-xl p-3 bg-surface-100/70 dark:bg-surface-900/70 max-h-40 overflow-y-auto">
            <p class="text-xs font-semibold text-surface-600 dark:text-surface-300 mb-2">Adicionar mais mídias da biblioteca:</p>
            <div v-if="medias.length === 0" class="text-xs text-surface-500 dark:text-surface-400 text-center py-2">
              Nenhuma mídia encontrada na biblioteca.
            </div>
            <div v-else class="flex flex-wrap gap-1.5">
              <button
                v-for="m in medias"
                :key="m.id"
                type="button"
                @click="toggleAddMedia(m.id)"
                :disabled="isMediaSelected(m.id)"
                :class="['px-2.5 py-1 rounded text-xs border transition flex items-center gap-1', isMediaSelected(m.id) ? 'bg-surface-200 dark:bg-surface-800 border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-500' : 'bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-brand-500 text-surface-700 dark:text-surface-200']"
              >
                <Plus class="w-3 h-3" /> {{ m.alias }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="closeEditPostModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
            {{ isLoading ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useModals } from '@/composables/useModals'
import { usePosts } from '@/composables/usePosts'
import { useAuth } from '@/composables/useAuth'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useMedia } from '@/composables/useMedia'
import { X, Plus, Trash2, ArrowUp, ArrowDown, AlertCircle } from '@lucide/vue'

const { editPostModalOpen, selectedPostForEdit, closeEditPostModal } = useModals()
const { updatePost, isLoading } = usePosts()
const { currentUser } = useAuth()
const { clients, fetchAllMembers } = useAgencyMembers()
const { medias, fetchMedias } = useMedia()

const form = reactive({
  title: '',
  content: '',
  client_id: null as string | null
})

const selectedMedias = ref<{ media_id: string; position: number }[]>([])

const canEditClient = computed(() => currentUser.value?.type === 'agency')

watch(selectedPostForEdit, (post) => {
  if (post) {
    form.title = post.title
    form.content = post.content
    form.client_id = post.client_id
    selectedMedias.value = post.medias.map(pm => ({
      media_id: pm.media.id,
      position: pm.position
    }))
    fetchAllMembers().catch(() => {})
    fetchMedias().catch(() => {})
  }
})

function isMediaSelected(id: string): boolean {
  return selectedMedias.value.some(sm => sm.media_id === id)
}

function getMediaAlias(id: string): string {
  const m = medias.value.find(item => item.id === id)
  if (m) return m.alias
  const existing = selectedPostForEdit.value?.medias.find(pm => pm.media.id === id)
  return existing ? existing.media.alias : id.slice(0, 8)
}

function toggleAddMedia(id: string) {
  if (isMediaSelected(id)) return
  selectedMedias.value.push({
    media_id: id,
    position: selectedMedias.value.length
  })
}

function removeMedia(index: number) {
  selectedMedias.value.splice(index, 1)
  selectedMedias.value.forEach((sm, idx) => {
    sm.position = idx
  })
}

function moveMedia(index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= selectedMedias.value.length) return
  const item = selectedMedias.value[index]
  selectedMedias.value[index] = selectedMedias.value[target]
  selectedMedias.value[target] = item
  selectedMedias.value.forEach((sm, idx) => {
    sm.position = idx
  })
}

async function handleSubmit() {
  if (!selectedPostForEdit.value) return
  try {
    const payload: {
      title: string
      content: string
      version: number
      medias: { media_id: string; position: number }[]
      client_id?: string | null
    } = {
      title: form.title,
      content: form.content,
      medias: selectedMedias.value,
      version: selectedPostForEdit.value.version
    }

    if (canEditClient.value) {
      payload.client_id = form.client_id
    }

    await updatePost(selectedPostForEdit.value.id, payload)
    closeEditPostModal()
  } catch {}
}
</script>