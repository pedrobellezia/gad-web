import { ref } from 'vue'
import { mediaApi } from '@/api/media'

// Cache em memória compartilhado globalmente para URLs blob de mídias autenticadas
const mediaUrlCache = ref<Record<string, string>>({})
const loadingPromises = new Map<string, Promise<string>>()

export function useMediaCache() {
  function getMediaUrl(mediaId: string): string | undefined {
    return mediaUrlCache.value[mediaId]
  }

  async function loadMedia(mediaId: string): Promise<string> {
    if (!mediaId) return ''

    // Se já foi carregado e cacheado anteriormente
    if (mediaUrlCache.value[mediaId]) {
      return mediaUrlCache.value[mediaId]
    }

    // Se já houver um download em andamento desta mesma mídia, reutiliza a mesma Promise
    if (loadingPromises.has(mediaId)) {
      return loadingPromises.get(mediaId)!
    }

    const promise = (async () => {
      try {
        const blob = await mediaApi.getFileBlob(mediaId)
        const objectUrl = URL.createObjectURL(blob)
        mediaUrlCache.value = {
          ...mediaUrlCache.value,
          [mediaId]: objectUrl
        }
        return objectUrl
      } catch (err) {
        console.error(`[useMediaCache] Erro ao carregar mídia ${mediaId}:`, err)
        return ''
      } finally {
        loadingPromises.delete(mediaId)
      }
    })()

    loadingPromises.set(mediaId, promise)
    return promise
  }

  function clearMediaCache() {
    Object.values(mediaUrlCache.value).forEach(url => {
      try {
        URL.revokeObjectURL(url)
      } catch {}
    })
    mediaUrlCache.value = {}
  }

  return {
    mediaUrlCache,
    getMediaUrl,
    loadMedia,
    clearMediaCache
  }
}
