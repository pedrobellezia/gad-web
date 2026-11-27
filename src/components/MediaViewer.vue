<template>
  <div
    v-if="viewerMedia"
    class="fixed inset-0 z-[60] bg-surface-950/90 backdrop-blur-xs flex flex-col"
    role="dialog"
    aria-modal="true"
    :aria-label="viewerMedia.alias"
    @click.self="closeMediaViewer"
  >
    <div class="flex items-center justify-between gap-3 px-5 py-3 text-surface-100 shrink-0">
      <p class="text-sm font-medium truncate" :title="viewerMedia.alias">{{ viewerMedia.alias }}</p>
      <button
        type="button"
        @click="closeMediaViewer"
        class="p-2 rounded-lg hover:bg-white/10 transition"
        title="Fechar (Esc)"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <div class="flex-1 min-h-0 flex items-center justify-center p-4" @click.self="closeMediaViewer">
      <div v-if="isLoading" class="flex flex-col items-center text-surface-300">
        <Loader2 class="w-8 h-8 animate-spin mb-2" />
        <span class="text-sm">Carregando original...</span>
      </div>

      <div v-else-if="failed" class="flex flex-col items-center text-surface-300">
        <ImageOff class="w-8 h-8 mb-2" />
        <span class="text-sm">Não foi possível carregar a mídia.</span>
      </div>

      <video
        v-else-if="isVideo && url"
        :src="url"
        controls
        autoplay
        class="max-w-full max-h-full rounded-lg shadow-2xl"
      ></video>

      <img
        v-else-if="url"
        :src="url"
        :alt="viewerMedia.alias"
        class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useMediaViewer } from '@/composables/useMediaViewer'
import { useMediaCache } from '@/composables/useMediaCache'
import { mediaApi } from '@/api/media'
import { X, Loader2, ImageOff } from '@lucide/vue'

const { viewerMedia, closeMediaViewer } = useMediaViewer()
const { loadMedia } = useMediaCache()

const url = ref('')
const isLoading = ref(false)
const failed = ref(false)
// URL de vídeo criada só para o visualizador: liberada ao fechar (não fica no cache)
let ownedVideoUrl: string | null = null
let requestSeq = 0

const isVideo = computed(() => viewerMedia.value?.media_type === 'video')

function releaseVideo() {
  if (ownedVideoUrl) {
    URL.revokeObjectURL(ownedVideoUrl)
    ownedVideoUrl = null
  }
}

watch(viewerMedia, async (media) => {
  const seq = ++requestSeq
  releaseVideo()
  url.value = ''
  failed.value = false
  if (!media) return

  isLoading.value = true
  try {
    if (media.media_type === 'video') {
      // Vídeos são grandes: não guardar no cache compartilhado até o logout
      const blob = await mediaApi.getFileBlob(media.id)
      if (seq !== requestSeq) return
      ownedVideoUrl = URL.createObjectURL(blob)
      url.value = ownedVideoUrl
    } else {
      const loaded = await loadMedia(media.id)
      if (seq !== requestSeq) return
      url.value = loaded
      failed.value = !loaded
    }
  } catch {
    if (seq === requestSeq) failed.value = true
  } finally {
    if (seq === requestSeq) isLoading.value = false
  }
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && viewerMedia.value) closeMediaViewer()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  releaseVideo()
})
</script>
