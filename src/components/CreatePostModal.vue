<template>
  <div v-if="createPostModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl fade-in shadow-2xl my-8 border border-surface-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-surface-800">Criar Novo Post</h3>
        <button @click="closeCreatePostModal" class="p-1 hover:bg-surface-100 rounded-lg">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Título do Post *</label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="Ex: Campanha de Lançamento de Produto"
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Cliente Destinatário *</label>
          <select
            v-model="form.client_id"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm bg-white"
          >
            <option value="">Selecione um cliente vinculado...</option>
            <option v-for="cl in clients" :key="cl.user.id" :value="cl.user.id">
              {{ cl.user.name }} ({{ cl.user.email }})
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Conteúdo do Post (Texto/Legenda) *</label>
          <textarea
            v-model="form.content"
            required
            rows="4"
            placeholder="Escreva a legenda e orientações para o cliente..."
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm"
          ></textarea>
        </div>

        <!-- Media Selector with Positions -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-surface-600">
              Mídias Anexadas (Opcional no rascunho, obrigatório para revisão)
            </label>
            <span class="text-xs text-surface-400">{{ selectedMedias.length }} selecionada(s)</span>
          </div>

          <div v-if="selectedMedias.length > 0" class="space-y-2 mb-3">
            <div
              v-for="(sm, idx) in selectedMedias"
              :key="sm.media_id"
              class="flex items-center justify-between p-2.5 bg-surface-50 border border-surface-200 rounded-lg text-xs"
            >
              <div class="flex items-center gap-2">
                <span class="font-bold text-surface-500">Posição {{ idx }}</span>
                <span class="text-surface-700 font-medium">{{ getMediaAlias(sm.media_id) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  :disabled="idx === 0"
                  @click="moveMedia(idx, -1)"
                  class="p-1 hover:bg-surface-200 rounded disabled:opacity-30"
                >
                  <ArrowUp class="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  :disabled="idx === selectedMedias.length - 1"
                  @click="moveMedia(idx, 1)"
                  class="p-1 hover:bg-surface-200 rounded disabled:opacity-30"
                >
                  <ArrowDown class="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  @click="removeMedia(idx)"
                  class="p-1 hover:bg-red-50 text-danger rounded ml-1"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Quick pick from agency media library -->
          <div class="border border-surface-200 rounded-xl p-3 bg-surface-50 max-h-40 overflow-y-auto">
            <p class="text-xs font-semibold text-surface-500 mb-2">Disponíveis na Biblioteca da Agência:</p>
            <div v-if="medias.length === 0" class="text-xs text-surface-400 text-center py-2">
              Nenhuma mídia encontrada na biblioteca.
            </div>
            <div v-else class="flex flex-wrap gap-1.5">
              <button
                v-for="m in medias"
                :key="m.id"
                type="button"
                @click="toggleAddMedia(m.id)"
                :disabled="isMediaSelected(m.id)"
                :class="['px-2.5 py-1 rounded text-xs border transition flex items-center gap-1', isMediaSelected(m.id) ? 'bg-surface-200 border-surface-300 text-surface-400' : 'bg-white border-surface-200 hover:border-brand-500 text-surface-700']"
              >
                <Plus class="w-3 h-3" /> {{ m.alias }}
              </button>
            </div>
          </div>
        </div>

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
import { reactive, ref, onMounted } from 'vue'
import { useModals } from '@/composables/useModals'
import { usePosts } from '@/composables/usePosts'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useMedia } from '@/composables/useMedia'
import { X, Plus, Trash2, ArrowUp, ArrowDown } from '@lucide/vue'

const { createPostModalOpen, closeCreatePostModal } = useModals()
const { createPost, isLoading } = usePosts()
const { clients, fetchAllMembers } = useAgencyMembers()
const { medias, fetchMedias } = useMedia()

const form = reactive({
  title: '',
  content: '',
  client_id: ''
})

const selectedMedias = ref<{ media_id: string; position: number }[]>([])

onMounted(() => {
  fetchAllMembers().catch(() => {})
  fetchMedias().catch(() => {})
})

function isMediaSelected(id: string): boolean {
  return selectedMedias.value.some(sm => sm.media_id === id)
}

function getMediaAlias(id: string): string {
  const m = medias.value.find(item => item.id === id)
  return m ? m.alias : id.slice(0, 8)
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
  try {
    await createPost({
      title: form.title,
      content: form.content,
      client_id: form.client_id,
      medias: selectedMedias.value
    })
    closeCreatePostModal()
    form.title = ''
    form.content = ''
    form.client_id = ''
    selectedMedias.value = []
  } catch {}
}
</script>
