<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <label class="block text-sm font-medium text-surface-700 dark:text-surface-200">{{ label }}</label>
      <span class="text-xs text-surface-500 dark:text-surface-400">{{ model.length }} selecionada(s)</span>
    </div>

    <!-- Mídias selecionadas, na ordem de exibição do post -->
    <div v-if="model.length > 0" class="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
      <div
        v-for="(sm, idx) in model"
        :key="sm.media_id"
        class="relative rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700/80 bg-surface-100/80 dark:bg-surface-900/75"
      >
        <div class="aspect-square">
          <MediaImage v-if="mediaById(sm.media_id)?.media_type !== 'video'" :media-id="sm.media_id" :alt="aliasOf(sm.media_id)" />
          <div v-else class="w-full h-full flex items-center justify-center text-surface-500 dark:text-surface-400">
            <Video class="w-6 h-6" />
          </div>
        </div>
        <span class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-surface-950/75 text-surface-50 text-[10px] font-mono font-semibold">
          #{{ idx + 1 }}
        </span>
        <div class="px-1.5 py-1">
          <p class="text-[11px] text-surface-700 dark:text-surface-200 truncate" :title="aliasOf(sm.media_id)">{{ aliasOf(sm.media_id) }}</p>
          <div class="flex items-center justify-between mt-0.5">
            <div class="flex items-center">
              <button
                type="button"
                :disabled="idx === 0"
                @click="move(idx, -1)"
                class="p-0.5 hover:bg-surface-200 dark:hover:bg-surface-700 rounded disabled:opacity-30"
                title="Mover para antes"
              >
                <ArrowLeft class="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                :disabled="idx === model.length - 1"
                @click="move(idx, 1)"
                class="p-0.5 hover:bg-surface-200 dark:hover:bg-surface-700 rounded disabled:opacity-30"
                title="Mover para depois"
              >
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              type="button"
              @click="remove(sm.media_id)"
              class="p-0.5 hover:bg-red-50 dark:hover:bg-red-500/15 text-danger dark:text-red-400 rounded"
              title="Remover do post"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Biblioteca da agência com busca por nome -->
    <div class="border border-surface-200 dark:border-surface-700/80 rounded-xl p-3 bg-surface-100/70 dark:bg-surface-900/70">
      <div class="relative mb-2">
        <Search class="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          v-model="search"
          type="search"
          placeholder="Buscar mídia pelo nome..."
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
          @keydown.enter.prevent
        />
      </div>

      <div v-if="library.length === 0" class="text-xs text-surface-500 dark:text-surface-400 text-center py-4">
        Nenhuma mídia encontrada na biblioteca.
      </div>
      <div v-else-if="filtered.length === 0" class="text-xs text-surface-500 dark:text-surface-400 text-center py-4">
        Nenhuma mídia corresponde a "{{ search }}".
      </div>
      <div v-else class="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
        <button
          v-for="m in filtered"
          :key="m.id"
          type="button"
          @click="toggle(m.id)"
          :title="isSelected(m.id) ? `Remover ${m.alias}` : `Adicionar ${m.alias}`"
          :class="[
            'relative rounded-lg overflow-hidden border-2 text-left transition',
            isSelected(m.id) ? 'border-brand-500' : 'border-transparent hover:border-brand-300 dark:hover:border-brand-500/50'
          ]"
        >
          <div class="aspect-square bg-surface-200/70 dark:bg-surface-800">
            <MediaImage v-if="m.media_type === 'image'" :media-id="m.id" :alt="m.alias" />
            <div v-else class="w-full h-full flex items-center justify-center text-surface-500 dark:text-surface-400">
              <Video class="w-6 h-6" />
            </div>
          </div>
          <span
            v-if="isSelected(m.id)"
            class="absolute top-1 right-1 w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center"
          >
            <Check class="w-3.5 h-3.5" />
          </span>
          <p class="px-1.5 py-1 text-[11px] text-surface-700 dark:text-surface-200 truncate bg-surface-50 dark:bg-surface-800">{{ m.alias }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MediaImage from './MediaImage.vue'
import type { MediaItem } from '@/types/api'
import { Search, Check, Trash2, ArrowLeft, ArrowRight, Video } from '@lucide/vue'

export interface SelectedMedia {
  media_id: string
  position: number
}

const props = defineProps<{
  label: string
  // Biblioteca de mídias da agência
  library: MediaItem[]
  // Mídias já anexadas ao post (para exibir nome/tipo mesmo fora da biblioteca carregada)
  known?: MediaItem[]
}>()

const model = defineModel<SelectedMedia[]>({ required: true })

const search = ref('')

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

const filtered = computed(() => {
  const term = normalize(search.value.trim())
  if (!term) return props.library
  return props.library.filter(m => normalize(m.alias).includes(term))
})

function mediaById(id: string): MediaItem | undefined {
  return props.library.find(m => m.id === id) ?? props.known?.find(m => m.id === id)
}

function aliasOf(id: string): string {
  return mediaById(id)?.alias ?? 'Mídia'
}

function isSelected(id: string): boolean {
  return model.value.some(sm => sm.media_id === id)
}

function reindex(list: SelectedMedia[]): SelectedMedia[] {
  return list.map((sm, idx) => ({ media_id: sm.media_id, position: idx }))
}

function toggle(id: string) {
  if (isSelected(id)) {
    remove(id)
  } else {
    model.value = reindex([...model.value, { media_id: id, position: model.value.length }])
  }
}

function remove(id: string) {
  model.value = reindex(model.value.filter(sm => sm.media_id !== id))
}

function move(index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= model.value.length) return
  const list = [...model.value]
  ;[list[index], list[target]] = [list[target], list[index]]
  model.value = reindex(list)
}
</script>
