export type UserType = 'admin' | 'agency' | 'writer' | 'designer' | 'client'

export interface User {
  id: string
  name: string
  email: string
  type: UserType
  avatar: string | null
  created_at: string
}

export interface Agency {
  id: string
  cnpj: string
  user: User
}

export interface ClientProfile {
  id: string
  user: User
  agency: Agency | null
}

export interface WriterProfile {
  id: string
  user: User
  agency: Agency | null
}

export interface DesignerProfile {
  id: string
  user: User
  agency: Agency | null
}

export type ProfileResponse = Agency | ClientProfile | WriterProfile | DesignerProfile

export type MediaType = 'image' | 'video'

export interface MediaItem {
  id: string
  designer_id: string | null
  agency_id: string | null
  alias: string
  filename: string
  media_type: MediaType
  mime_type: string
  size_bytes: number
  url?: string | null
}

export interface PostMediaItem {
  position: number
  media: MediaItem
}

export interface CommentItem {
  id: string
  post_id: string
  author_id: string
  content: string
  created_at: string
}

export type PostStatus = 'draft' | 'review' | 'approved' | 'denied' | 'published'

export interface PostItem {
  id: string
  title: string
  content: string
  status: PostStatus
  version: number
  agency_id: string | null
  client_id: string | null
  writer_id: string | null
  medias: PostMediaItem[]
  comments: CommentItem[]
  created_at: string
  updated_at: string
}

export interface InviteTokenItem {
  token: string
  agency_id: string
}

export interface AuditLogItem {
  id: string
  agency_id: string | null
  actor_id: string | null
  actor_name: string
  actor_email: string
  action: string
  resource_type: string
  resource_id: string | null
  resource_name: string | null
  message: string
  created_at: string
}

export interface DetailsResponse {
  details: string
  errors?: any[] | null
}
