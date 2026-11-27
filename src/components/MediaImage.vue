<template>
  <div ref="root" class="relative w-full h-full flex items-center justify-center overflow-hidden bg-surface-100 dark:bg-surface-900">
    <!-- Imagem carregada via Blob Cache com Autenticação -->
    <img
      v-if="currentUrl"
      :src="currentUrl"
      :alt="alt || 'Mídia'"
      :class="['w-full h-full object-cover transition-opacity duration-300', imgClass]"
    />

    <!-- Estado de carregamento -->
    <div
      v-else-if="isLoading"
      class="w-full h-full flex flex-col items-center justify-center text-surface-500 dark:text-surface-400 animate-pulse p-2"
    >
      <Loader2 class="w-5 h-5 animate-spin mb-1 text-brand-500 dark:text-brand-400" />
      <span class="text-[10px] text-surface-500 dark:text-surface-400">Carregando...</span>
    </div>

    <!-- Falha no carregamento -->
    <div
      v-else-if="failed"
      class="w-full h-full flex flex-col items-center justify-center text-surface-500 dark:text-surface-500 p-2 text-center"
    >
      <ImageIcon class="w-6 h-6 mb-1 text-surface-400 dark:text-surface-600" />
      <span class="text-[10px]">Indisponível</span>
    </div>

    <!-- Ainda fora da área visível: placeholder neutro, sem download -->
    <ImageIcon v-else class="w-6 h-6 text-surface-300 dark:text-surface-700" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { useMediaCache } from '@/composables/useMediaCache'
import { Image as ImageIcon, Loader2 } from '@lucide/vue'

const props = defineProps<{
  mediaId: string
  alt?: string
  imgClass?: string
}>()

const { mediaUrlCache, loadMedia } = useMediaCache()
const root = ref<HTMLElement | null>(null)
const isLoading = ref(false)
const failed = ref(false)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const currentUrl = computed(() => {
  return props.mediaId ? mediaUrlCache.value[props.mediaId] || '' : ''
})

async function fetchImage() {
  if (!props.mediaId || mediaUrlCache.value[props.mediaId]) return

  isLoading.value = true
  failed.value = false
  try {
    const url = await loadMedia(props.mediaId)
    failed.value = !url
  } finally {
    isLoading.value = false
  }
}

// Só baixa a mídia quando ela entra (ou está perto de entrar) na área visível.
// O IntersectionObserver considera o recorte de contêineres com rolagem, como a grade do seletor.
function observe() {
  if (!root.value) return
  if (typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    fetchImage()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        isVisible.value = true
        fetchImage()
        observer?.disconnect()
        observer = null
      }
    },
    { rootMargin: '200px' }
  )
  observer.observe(root.value)
}

watch(() => props.mediaId, (newId) => {
  failed.value = false
  if (!newId) return
  if (isVisible.value) fetchImage()
  else if (!observer) observe()
})

onMounted(() => {
  if (currentUrl.value) return
  observe()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>
