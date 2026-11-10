import { apiFetch } from './client'
import type {
  Agency,
  ClientProfile,
  WriterProfile,
  DesignerProfile,
  InviteTokenItem,
  DetailsResponse
} from '@/types/api'

export const agencyApi = {
  // Invite tokens (Agency only)
  getInviteTokens() {
    return apiFetch<InviteTokenItem[]>('/invite_token')
  },

  createInviteTokens(quantity: number = 1) {
    return apiFetch<DetailsResponse>('/invite_token', {
      method: 'POST',
      bodyData: { quantity }
    })
  },

  deleteInviteToken(token: string) {
    return apiFetch<DetailsResponse>(`/invite_token/${token}`, {
      method: 'DELETE'
    })
  },

  // Members lists
  getClients() {
    return apiFetch<ClientProfile[]>('/agency/clients')
  },

  getWriters() {
    return apiFetch<WriterProfile[]>('/agency/writers')
  },

  getDesigners() {
    return apiFetch<DesignerProfile[]>('/agency/designers')
  },

  unlinkMember(userId: string) {
    return apiFetch<DetailsResponse>(`/agency/member/${userId}/unlink`, {
      method: 'DELETE'
    })
  },

  // Member actions
  linkByToken(token: string) {
    return apiFetch<DetailsResponse>('/agency/link', {
      method: 'POST',
      bodyData: { token }
    })
  },

  selfUnlink() {
    return apiFetch<DetailsResponse>('/agency/unlink', {
      method: 'DELETE'
    })
  },

  getMyAgency() {
    return apiFetch<Agency>('/agency/my')
  }
}
