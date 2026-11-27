import { ref } from 'vue'

export interface ViewerMedia {
  id: string
  alias: string
  media_type: string
}

// Mídia aberta no visualizador global (MediaViewer.vue, montado no App)
const viewerMedia = ref<ViewerMedia | null>(null)

export function useMediaViewer() {
  function openMediaViewer(media: ViewerMedia) {
    viewerMedia.value = { id: media.id, alias: media.alias, media_type: media.media_type }
  }

  function closeMediaViewer() {
    viewerMedia.value = null
  }

  return { viewerMedia, openMediaViewer, closeMediaViewer }
}
