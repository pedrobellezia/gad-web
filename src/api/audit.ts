import { apiFetch } from './client'
import type { AuditLogItem } from '@/types/api'

export interface AuditLogParams {
  action?: string
  resource_type?: 'post' | 'media' | 'user' | 'invite_token' | 'comment'
  resource_id?: string
  skip?: number
  limit?: number
}

export const auditApi = {
  getAuditLogs(params?: AuditLogParams) {
    return apiFetch<AuditLogItem[]>('/audit-logs', { params })
  },

  getPostHistory(postId: string) {
    return apiFetch<AuditLogItem[]>('/audit-logs', {
      params: {
        resource_type: 'post',
        resource_id: postId
      }
    })
  },

  getMediaHistory(mediaId: string) {
    return apiFetch<AuditLogItem[]>('/audit-logs', {
      params: {
        resource_type: 'media',
        resource_id: mediaId
      }
    })
  }
}
