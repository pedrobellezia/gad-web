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

        <PostMediaPicker
          v-model="selectedMedias"
          label="Mídias Anexadas e Posições"
          :library="medias"
          :known="knownMedias"
        />

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
import { X, AlertCircle } from '@lucide/vue'
import PostMediaPicker, { type SelectedMedia } from './PostMediaPicker.vue'

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

const selectedMedias = ref<SelectedMedia[]>([])
const knownMedias = computed(() => selectedPostForEdit.value?.medias.map(pm => pm.media) ?? [])

const canEditClient = computed(() => currentUser.value?.type === 'agency')

watch(selectedPostForEdit, (post) => {
  if (post) {
    form.title = post.title
    form.content = post.content
    form.client_id = post.client_id
    selectedMedias.value = [...post.medias]
      .sort((a, b) => a.position - b.position)
      .map((pm, idx) => ({ media_id: pm.media.id, position: idx }))
    fetchAllMembers().catch(() => {})
    fetchMedias().catch(() => {})
  }
})

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