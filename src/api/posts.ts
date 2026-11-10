import { apiFetch } from './client'
import type { PostItem, PostStatus, CommentItem, DetailsResponse } from '@/types/api'

export interface PostMediaPayload {
  media_id: string
  position: number
}

export interface CreatePostPayload {
  title: string
  content: string
  client_id: string
  medias?: PostMediaPayload[]
}

export interface UpdatePostPayload {
  title?: string
  content?: string
  client_id?: string | null
  version: number
  medias?: PostMediaPayload[]
}

export interface PostFilterParams {
  id?: string[]
  title?: string
  status?: PostStatus[]
  agency_id?: string[]
  client_id?: string[]
  writer_id?: string[]
  order_by?: 'new' | 'old'
  skip?: number
  limit?: number
}

export const postsApi = {
  getPosts(params?: PostFilterParams) {
    return apiFetch<PostItem[]>('/posts', { params })
  },

  getPostById(postId: string) {
    return apiFetch<PostItem>(`/posts/${postId}`)
  },

  createPost(payload: CreatePostPayload) {
    return apiFetch<PostItem>('/posts', {
      method: 'POST',
      bodyData: payload
    })
  },

  updatePost(postId: string, payload: UpdatePostPayload) {
    return apiFetch<PostItem>(`/posts/${postId}`, {
      method: 'PATCH',
      bodyData: payload
    })
  },

  updateStatus(postId: string, status: PostStatus, version: number) {
    return apiFetch<PostItem>(`/posts/${postId}/status`, {
      method: 'PATCH',
      bodyData: { status, version }
    })
  },

  updateWriter(postId: string, writerId: string | null, version: number) {
    return apiFetch<PostItem>(`/posts/${postId}/writer`, {
      method: 'PATCH',
      bodyData: { writer_id: writerId, version }
    })
  },

  deletePost(postId: string) {
    return apiFetch<DetailsResponse>(`/posts/${postId}`, {
      method: 'DELETE'
    })
  },

  // Comments
  getComments(postId: string) {
    return apiFetch<CommentItem[]>(`/posts/${postId}/comments`)
  },

  createComment(postId: string, content: string) {
    return apiFetch<CommentItem>(`/posts/${postId}/comments`, {
      method: 'POST',
      bodyData: { content }
    })
  },

  deleteComment(postId: string, commentId: string) {
    return apiFetch<DetailsResponse>(`/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE'
    })
  }
}
