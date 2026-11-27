import type { AuditLogItem } from '@/types/api'

export interface AuditMeta {
  label: string
  colorClass: string
}

const COLORS = {
  green: 'bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border-emerald-200 dark:border-mint-500/30',
  blue: 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
  amber: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
  rose: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30',
  indigo: 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30',
  purple: 'bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30',
  neutral: 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700'
}

// Ações gravadas pela API (GAD-API app/services), por tipo de recurso
const LABELS: Record<string, AuditMeta> = {
  'post:create': { label: 'Post criado', colorClass: COLORS.green },
  'post:update': { label: 'Post editado', colorClass: COLORS.blue },
  'post:delete': { label: 'Post excluído', colorClass: COLORS.rose },
  'post:status_change': { label: 'Status alterado', colorClass: COLORS.amber },
  'post:author_add': { label: 'Redator atribuído', colorClass: COLORS.indigo },
  'post:author_remove': { label: 'Redator removido', colorClass: COLORS.neutral },
  'post:recipient_remove': { label: 'Cliente removido', colorClass: COLORS.neutral },
  'post:media_remove': { label: 'Mídia removida', colorClass: COLORS.neutral },

  'media:create': { label: 'Mídia enviada', colorClass: COLORS.purple },
  'media:update': { label: 'Mídia editada', colorClass: COLORS.blue },
  'media:delete': { label: 'Mídia excluída', colorClass: COLORS.rose },
  'media:author_add': { label: 'Designer atribuído', colorClass: COLORS.indigo },
  'media:author_remove': { label: 'Designer removido', colorClass: COLORS.neutral },

  'comment:create': { label: 'Comentário', colorClass: COLORS.indigo },
  'comment:delete': { label: 'Comentário removido', colorClass: COLORS.neutral },

  'user:member_link': { label: 'Entrou na agência', colorClass: COLORS.green },
  'user:member_unlink': { label: 'Saiu da agência', colorClass: COLORS.rose },
  'user:deactivate': { label: 'Conta desativada', colorClass: COLORS.rose },
  'user:restore': { label: 'Conta restaurada', colorClass: COLORS.green },
  'user:update': { label: 'Perfil atualizado', colorClass: COLORS.blue },
  'user:delete': { label: 'Conta excluída', colorClass: COLORS.rose },

  'invite_token:create': { label: 'Convites gerados', colorClass: COLORS.green },
  'invite_token:delete': { label: 'Convite excluído', colorClass: COLORS.neutral }
}

export function getAuditMeta(log: Pick<AuditLogItem, 'action' | 'resource_type'>): AuditMeta {
  return LABELS[`${log.resource_type}:${log.action}`] ?? { label: 'Ação registrada', colorClass: COLORS.neutral }
}

export const resourceTypeLabels: Record<string, string> = {
  post: 'Post',
  media: 'Mídia',
  comment: 'Comentário',
  user: 'Membro',
  invite_token: 'Convite'
}

export function formatAuditDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
