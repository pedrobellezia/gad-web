<template>
  <div>
    <div v-if="medias.length > 0" class="flex items-center gap-3 mb-4 flex-wrap">
      <div class="relative flex-1 min-w-[12rem] max-w-sm">
        <Search class="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          v-model="search"
          type="search"
          placeholder="Buscar mídia pelo nome..."
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
        />
      </div>
      <div class="flex gap-1 bg-surface-50 dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700/80 p-1 rounded-lg text-xs">
        <button
          v-for="opt in typeOptions"
          :key="opt.value"
          type="button"
          @click="typeFilter = opt.value"
          :class="['px-2.5 py-1 rounded-md font-medium transition', typeFilter === opt.value ? 'bg-brand-500 text-white' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100']"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <div v-if="medias.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
      {{ emptyText }}
    </div>

    <div v-else-if="filtered.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
      Nenhuma mídia encontrada com os filtros selecionados.
    </div>

    <!-- Card simples: miniatura (abre o original), nome e ações do painel -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div
        v-for="m in filtered"
        :key="m.id"
        class="bg-surface-50 dark:bg-surface-800/85 rounded-xl border border-surface-200 dark:border-surface-700/80 overflow-hidden flex flex-col shadow-xs dark:shadow-card-dark"
      >
        <button
          type="button"
          @click="openMediaViewer(m)"
          class="aspect-[4/5] w-full bg-surface-200/70 dark:bg-surface-900 overflow-hidden cursor-zoom-in"
          :title="m.media_type === 'video' ? 'Assistir vídeo original' : 'Ver imagem original'"
        >
          <MediaImage :media-id="m.id" :alt="m.alias" :video="m.media_type === 'video'" />
        </button>

        <div class="px-3 py-2 flex items-center gap-2 min-h-[2.75rem]">
          <p class="flex-1 min-w-0 text-xs font-semibold text-surface-800 dark:text-surface-100 truncate" :title="m.alias">{{ m.alias }}</p>
          <slot name="actions" :media="m" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MediaImage from './MediaImage.vue'
import { useMediaViewer } from '@/composables/useMediaViewer'
import type { MediaItem } from '@/types/api'
import { Search } from '@lucide/vue'

const props = withDefaults(defineProps<{
  medias: MediaItem[]
  emptyText?: string
}>(), { emptyText: 'Nenhuma mídia enviada ainda para esta agência.' })

const { openMediaViewer } = useMediaViewer()

type TypeFilter = 'all' | 'image' | 'video'
const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'image', label: 'Imagens' },
  { value: 'video', label: 'Vídeos' }
]
const typeFilter = ref<TypeFilter>('all')
const search = ref('')

// Busca sem diferenciar acentos e maiúsculas
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const filtered = computed(() => {
  const term = normalize(search.value.trim())
  return props.medias.filter(m =>
    (typeFilter.value === 'all' || m.media_type === typeFilter.value) &&
    (!term || normalize(m.alias).includes(term))
  )
})
</script>
