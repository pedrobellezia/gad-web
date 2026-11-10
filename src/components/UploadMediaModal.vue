<template>
  <div v-if="uploadMediaModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-white rounded-2xl p-6 w-full max-w-xl fade-in shadow-2xl my-8 border border-surface-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-surface-800">Enviar Mídias</h3>
        <button @click="closeUploadMediaModal" class="p-1 hover:bg-surface-100 rounded-lg">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Selecionar Arquivos (Imagens JPEG/PNG ou Vídeos MP4)</label>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,video/mp4"
            required
            @change="handleFileSelection"
            class="w-full text-sm text-surface-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100"
          />
        </div>

        <div v-if="files.length > 0" class="space-y-3 pt-2">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-surface-400">
            Defina o Alias de Cada Mídia (Obrigatório)
          </h4>
          <div v-for="(_, index) in files" :key="index" class="p-3 bg-surface-50 rounded-xl border border-surface-200 space-y-1">
            <div class="flex items-center justify-between text-xs text-surface-600">
              <span class="font-medium truncate max-w-[200px]">{{ files[index].name }}</span>
              <span class="text-surface-400">{{ (files[index].size / 1024).toFixed(1) }} KB</span>
            </div>
            <input
              v-model="aliases[index]"
              type="text"
              required
              placeholder="Ex: banner-promocional-instagram"
              class="w-full px-3 py-1.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-xs"
            />
          </div>
        </div>

        <div class="flex gap-2 justify-end pt-4 border-t border-surface-200">
          <button type="button" @click="closeUploadMediaModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isLoading || files.length === 0"
            class="btn-primary px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 disabled:opacity-50"
          >
            <Upload class="w-4 h-4" />
            {{ isLoading ? 'Enviando...' : 'Enviar Mídias' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@/composables/useModals'
import { useMedia } from '@/composables/useMedia'
import { X, Upload } from '@lucide/vue'

const { uploadMediaModalOpen, closeUploadMediaModal } = useModals()
const { uploadFiles, isLoading } = useMedia()

const files = ref<File[]>([])
const aliases = ref<string[]>([])

function handleFileSelection(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files) return

  const selected = Array.from(target.files)
  files.value = selected
  aliases.value = selected.map(f => f.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase())
}

async function handleSubmit() {
  if (files.value.length === 0) return
  try {
    await uploadFiles(files.value, aliases.value)
    files.value = []
    aliases.value = []
    closeUploadMediaModal()
  } catch {}
}
</script>
