import { ref } from 'vue'
import { mediaApi } from '@/api/media'
import type { MediaItem } from '@/types/api'
import { useToast } from './useToast'

const medias = ref<MediaItem[]>([])
const isLoading = ref<boolean>(false)

export function useMedia() {
  const { showToast } = useToast()

  async function fetchMedias() {
    isLoading.value = true
    try {
      const data = await mediaApi.getMedias()
      medias.value = data
      return data
    } catch (err: any) {
      showToast(err.message || 'Erro ao carregar mídias', 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function uploadFiles(files: File[], aliases: string[]) {
    isLoading.value = true
    try {
      const res = await mediaApi.uploadMedias(files, aliases)
      if (res.errors && res.errors.length > 0) {
        showToast(`Upload concluído com ${res.errors.length} erro(s).`, 'warning')
      } else {
        showToast('Mídia(s) enviada(s) com sucesso!', 'success')
      }
      await fetchMedias()
      return res
    } catch (err: any) {
      showToast(err.message || 'Erro ao enviar mídias', 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateAlias(mediaId: string, alias: string) {
    try {
      const updated = await mediaApi.updateAlias(mediaId, alias)
      const index = medias.value.findIndex(m => m.id === mediaId)
      if (index !== -1) {
        medias.value[index] = updated
      }
      showToast('Alias atualizado com sucesso!', 'success')
      return updated
    } catch (err: any) {
      showToast(err.message || 'Erro ao atualizar alias', 'error')
      throw err
    }
  }

  async function updateDesigner(mediaId: string, designerId: string | null) {
    try {
      const updated = await mediaApi.updateDesigner(mediaId, designerId)
      const index = medias.value.findIndex(m => m.id === mediaId)
      if (index !== -1) {
        medias.value[index] = updated
      }
      showToast('Designer da mídia atualizado!', 'success')
      return updated
    } catch (err: any) {
      showToast(err.message || 'Erro ao atribuir designer', 'error')
      throw err
    }
  }

  async function deleteMedia(mediaId: string) {
    try {
      await mediaApi.deleteMedia(mediaId)
      medias.value = medias.value.filter(m => m.id !== mediaId)
      showToast('Mídia excluída com sucesso!', 'info')
    } catch (err: any) {
      showToast(err.message || 'Erro ao excluir mídia', 'error')
      throw err
    }
  }

  return {
    medias,
    isLoading,
    fetchMedias,
    uploadFiles,
    updateAlias,
    updateDesigner,
    deleteMedia
  }
}
