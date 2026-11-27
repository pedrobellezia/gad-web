import { ref } from 'vue'
import { apiFetch } from '@/api/client'
import { mediaApi } from '@/api/media'

// Cache em memória compartilhado globalmente para URLs blob de arquivos autenticados
// (mídias e fotos de perfil). A chave é o id da mídia ou o caminho do avatar.
const mediaUrlCache = ref<Record<string, string>>({})
const loadingPromises = new Map<string, Promise<string>>()

async function loadCached(key: string, fetchBlob: () => Promise<Blob>): Promise<string> {
  if (mediaUrlCache.value[key]) {
    return mediaUrlCache.value[key]
  }

  // Se já houver um download em andamento deste mesmo arquivo, reutiliza a mesma Promise
  if (loadingPromises.has(key)) {
    return loadingPromises.get(key)!
  }

  const promise = (async () => {
    try {
      const blob = await fetchBlob()
      const objectUrl = URL.createObjectURL(blob)
      mediaUrlCache.value = {
        ...mediaUrlCache.value,
        [key]: objectUrl
      }
      return objectUrl
    } catch (err) {
      console.error(`[useMediaCache] Erro ao carregar ${key}:`, err)
      return ''
    } finally {
      loadingPromises.delete(key)
    }
  })()

  loadingPromises.set(key, promise)
  return promise
}

export function useMediaCache() {
  function getMediaUrl(mediaId: string): string | undefined {
    return mediaUrlCache.value[mediaId]
  }

  function loadMedia(mediaId: string): Promise<string> {
    if (!mediaId) return Promise.resolve('')
    return loadCached(mediaId, () => mediaApi.getFileBlob(mediaId))
  }

  // avatarPath é o `avatar_url` retornado pela API (caminho relativo com ?v=<versão>)
  function getAvatarUrl(avatarPath: string | null | undefined): string | undefined {
    return avatarPath ? mediaUrlCache.value[avatarPath] : undefined
  }

  function loadAvatar(avatarPath: string | null | undefined): Promise<string> {
    if (!avatarPath) return Promise.resolve('')
    return loadCached(avatarPath, () => apiFetch<Blob>(avatarPath))
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
    getAvatarUrl,
    loadAvatar,
    clearMediaCache
  }
}
