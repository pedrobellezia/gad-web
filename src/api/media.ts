import { apiFetch } from './client'
import type { MediaItem, DetailsResponse } from '@/types/api'

export const mediaApi = {
  getMedias() {
    return apiFetch<MediaItem[]>('/media')
  },

  uploadMedias(files: File[], aliases: string[]) {
    const formData = new FormData()
    files.forEach(f => formData.append('files', f))
    aliases.forEach(a => formData.append('aliases', a))

    return apiFetch<DetailsResponse>('/media/upload', {
      method: 'POST',
      bodyData: formData
    })
  },

  updateAlias(mediaId: string, alias: string) {
    return apiFetch<MediaItem>(`/media/${mediaId}`, {
      method: 'PATCH',
      bodyData: { alias }
    })
  },

  updateDesigner(mediaId: string, designerId: string | null) {
    return apiFetch<MediaItem>(`/media/${mediaId}/designer`, {
      method: 'PATCH',
      bodyData: { designer_id: designerId }
    })
  },

  deleteMedia(mediaId: string) {
    return apiFetch<DetailsResponse>(`/media/${mediaId}`, {
      method: 'DELETE'
    })
  },

  getFileBlob(mediaId: string) {
    return apiFetch<Blob>(`/media/${mediaId}/file`, {
      method: 'GET'
    })
  },

  // Miniatura WebP (imagens e vídeos), usada nas grades e cards
  getThumbnailBlob(mediaId: string) {
    return apiFetch<Blob>(`/media/${mediaId}/thumbnail`, {
      method: 'GET'
    })
  }
}
