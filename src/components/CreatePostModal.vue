<template>
  <div v-if="createPostModalOpen" class="fixed inset-0 bg-surface-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl fade-in shadow-2xl dark:shadow-card-dark my-8 border border-surface-200 dark:border-surface-700/80 transition-colors">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-50">{{ filledFromPrefill ? 'Duplicar como rascunho' : 'Criar Novo Post' }}</h3>
        <button @click="closeCreatePostModal" class="p-1.5 hover:bg-surface-200/60 dark:hover:bg-surface-700/70 rounded-lg transition">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Título do Post *</label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="Ex: Campanha de Lançamento de Produto"
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
          />
        </div>

        <ClientPicker
          v-model="form.client_id"
          label="Cliente Destinatário *"
          :clients="clients"
          :invalid="clientInvalid"
        />

        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Conteúdo do Post (Texto/Legenda) *</label>
          <textarea
            v-model="form.content"
            required
            rows="4"
            placeholder="Escreva a legenda e orientações para o cliente..."
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
          ></textarea>
        </div>

        <PostMediaPicker
          v-model="selectedMedias"
          label="Mídias Anexadas (opcional no rascunho, obrigatório para revisão)"
          :library="medias"
        />

        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="closeCreatePostModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
            {{ isLoading ? 'Criando...' : 'Criar Post (Rascunho)' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import { useModals } from '@/composables/useModals'
import { usePosts } from '@/composables/usePosts'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useMedia } from '@/composables/useMedia'
import { X } from '@lucide/vue'
import PostMediaPicker, { type SelectedMedia } from './PostMediaPicker.vue'
import ClientPicker from './ClientPicker.vue'

const { createPostModalOpen, createPostPrefill, closeCreatePostModal } = useModals()
const { createPost, isLoading } = usePosts()
const { clients, fetchAllMembers } = useAgencyMembers()
const { medias, fetchMedias } = useMedia()

const form = reactive({
  title: '',
  content: '',
  client_id: null as string | null
})
const clientInvalid = ref(false)

watch(() => form.client_id, (id) => {
  if (id) clientInvalid.value = false
})

const selectedMedias = ref<SelectedMedia[]>([])

// Marca que o formulário veio de uma duplicação, para limpar ao abrir uma criação comum
const filledFromPrefill = ref(false)

function resetForm() {
  form.title = ''
  form.content = ''
  form.client_id = null
  selectedMedias.value = []
  clientInvalid.value = false
}

watch(createPostModalOpen, (open) => {
  if (!open) return
  const prefill = createPostPrefill.value
  if (!prefill) {
    if (filledFromPrefill.value) resetForm()
    filledFromPrefill.value = false
    return
  }
  form.title = prefill.title
  form.content = prefill.content
  // Só mantém o cliente se ele ainda estiver vinculado à agência
  form.client_id = clients.value.some(c => c.user.id === prefill.client_id) ? prefill.client_id : null
  // Só mantém mídias que ainda existem na biblioteca (se ela já foi carregada)
  const available = new Set(medias.value.map(m => m.id))
  const kept = medias.value.length > 0
    ? prefill.medias.filter(sm => available.has(sm.media_id))
    : prefill.medias
  selectedMedias.value = kept.map((sm, idx) => ({ media_id: sm.media_id, position: idx }))
  clientInvalid.value = false
  createPostPrefill.value = null
  filledFromPrefill.value = true
})

onMounted(() => {
  fetchAllMembers().catch(() => {})
  fetchMedias().catch(() => {})
})

async function handleSubmit() {
  if (!form.client_id) {
    clientInvalid.value = true
    return
  }
  try {
    await createPost({
      title: form.title,
      content: form.content,
      client_id: form.client_id,
      medias: selectedMedias.value
    })
    closeCreatePostModal()
    resetForm()
    filledFromPrefill.value = false
  } catch {}
}
</script>