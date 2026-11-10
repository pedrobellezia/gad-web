import { apiFetch } from './client'
import type { ProfileResponse, DetailsResponse } from '@/types/api'

export interface ProfileUpdatePayload {
  name?: string
  email?: string
}

export const meApi = {
  getMe() {
    return apiFetch<ProfileResponse>('/me')
  },

  updateProfile(payload: ProfileUpdatePayload) {
    return apiFetch<ProfileResponse>('/me', {
      method: 'PATCH',
      bodyData: payload
    })
  },

  updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return apiFetch<DetailsResponse>('/me/avatar', {
      method: 'PUT',
      bodyData: formData
    })
  },

  getAvatarBlob() {
    return apiFetch<Blob>('/me/avatar', {
      method: 'GET'
    })
  },

  deleteAvatar() {
    return apiFetch<DetailsResponse>('/me/avatar', {
      method: 'DELETE'
    })
  },

  deactivateAccount() {
    return apiFetch<DetailsResponse>('/me', {
      method: 'DELETE'
    })
  }
}
