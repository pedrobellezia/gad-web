<template>
  <div class="relative w-full h-full flex items-center justify-center overflow-hidden bg-surface-100">
    <!-- Imagem carregada via Blob Cache com Autenticação -->
    <img
      v-if="currentUrl"
      :src="currentUrl"
      :alt="alt || 'Mídia'"
      :class="['w-full h-full object-cover transition-opacity duration-300', imgClass]"
      loading="lazy"
    />

    <!-- Estado de carregamento -->
    <div
      v-else-if="isLoading"
      class="w-full h-full flex flex-col items-center justify-center text-surface-400 animate-pulse p-2"
    >
      <Loader2 class="w-5 h-5 animate-spin mb-1 text-brand-500" />
      <span class="text-[10px] text-surface-400">Carregando...</span>
    </div>

    <!-- Falha no carregamento -->
    <div
      v-else
      class="w-full h-full flex flex-col items-center justify-center text-surface-400 p-2 text-center"
    >
      <ImageIcon class="w-6 h-6 mb-1 text-surface-300" />
      <span class="text-[10px]">Indisponível</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useMediaCache } from '@/composables/useMediaCache'
import { Image as ImageIcon, Loader2 } from '@lucide/vue'

const props = defineProps<{
  mediaId: string
  alt?: string
  imgClass?: string
}>()

const { mediaUrlCache, loadMedia } = useMediaCache()
const isLoading = ref(false)

const currentUrl = computed(() => {
  return props.mediaId ? mediaUrlCache.value[props.mediaId] || '' : ''
})

async function fetchImage() {
  if (!props.mediaId) return
  if (mediaUrlCache.value[props.mediaId]) return

  isLoading.value = true
  try {
    await loadMedia(props.mediaId)
  } finally {
    isLoading.value = false
  }
}

watch(() => props.mediaId, (newId) => {
  if (newId) fetchImage()
})

onMounted(() => {
  fetchImage()
})
</script>
