import { ref, computed } from 'vue'
import {
  postsApi,
  type CreatePostPayload,
  type UpdatePostPayload,
  type PostFilterParams
} from '@/api/posts'
import type { PostItem, PostStatus, CommentItem } from '@/types/api'
import { useToast } from './useToast'
import { useModals } from './useModals'

const posts = ref<PostItem[]>([])
const currentPost = ref<PostItem | null>(null)
const comments = ref<CommentItem[]>([])
const activeFilter = ref<string>('all')
const isLoading = ref<boolean>(false)

const statusLabels: Record<PostStatus, string> = {
  draft: 'rascunho',
  review: 'revisão',
  approved: 'aprovado',
  denied: 'reprovado',
  published: 'publicado'
}

export function usePosts() {
  const { showToast } = useToast()
  const { selectedPostForDetail } = useModals()

  const filteredPosts = computed(() => {
    if (activeFilter.value === 'all') return posts.value
    return posts.value.filter(p => p.status === activeFilter.value)
  })

  function setFilter(filter: string) {
    activeFilter.value = filter
  }

  async function fetchPosts(params?: PostFilterParams) {
    isLoading.value = true
    try {
      const data = await postsApi.getPosts(params)
      posts.value = data
      return data
    } catch (err: any) {
      showToast(err.message || 'Erro ao carregar posts', 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Atualização em segundo plano: sem loading nem toast, e só troca a lista se algo mudou
  async function refreshPostsSilently(params?: PostFilterParams) {
    try {
      const data = await postsApi.getPosts(params)
      if (JSON.stringify(data) === JSON.stringify(posts.value)) return
      posts.value = data
      // Mantém a visão detalhada aberta em dia (ex.: cliente aprovou enquanto o redator olhava)
      const open = selectedPostForDetail.value
      if (open) {
        const fresh = data.find(p => p.id === open.id)
        if (fresh && fresh.version !== open.version) selectedPostForDetail.value = fresh
      }
    } catch {
      // Silencioso: a próxima tentativa ou a ação do usuário mostram o erro
    }
  }

  async function getPost(postId: string) {
    try {
      const post = await postsApi.getPostById(postId)
      currentPost.value = post
      return post
    } catch (err: any) {
      showToast(err.message || 'Erro ao carregar detalhes do post', 'error')
      throw err
    }
  }

  async function createPost(payload: CreatePostPayload) {
    isLoading.value = true
    try {
      const newPost = await postsApi.createPost(payload)
      posts.value.unshift(newPost)
      showToast('Novo post criado com sucesso!', 'success')
      return newPost
    } catch (err: any) {
      showToast(err.message || 'Erro ao criar post', 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updatePost(postId: string, payload: UpdatePostPayload) {
    isLoading.value = true
    try {
      const updated = await postsApi.updatePost(postId, payload)
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) {
        posts.value[index] = updated
      }
      if (currentPost.value?.id === postId) {
        currentPost.value = updated
      }
      showToast('Post atualizado com sucesso!', 'success')
      return updated
    } catch (err: any) {
      showToast(err.message || 'Erro ao atualizar post', 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateStatus(postId: string, status: PostStatus, version: number) {
    try {
      const updated = await postsApi.updateStatus(postId, status, version)
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) {
        posts.value[index] = updated
      }
      if (currentPost.value?.id === postId) {
        currentPost.value = updated
      }
      showToast(`Status do post alterado para ${statusLabels[status]}!`, 'success')
      return updated
    } catch (err: any) {
      showToast(err.message || 'Erro ao alterar status', 'error')
      throw err
    }
  }

  async function updateWriter(postId: string, writerId: string | null, version: number) {
    try {
      const updated = await postsApi.updateWriter(postId, writerId, version)
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) {
        posts.value[index] = updated
      }
      if (currentPost.value?.id === postId) {
        currentPost.value = updated
      }
      showToast('Redator do post atualizado!', 'success')
      return updated
    } catch (err: any) {
      showToast(err.message || 'Erro ao transferir autoria', 'error')
      throw err
    }
  }

  async function deletePost(postId: string) {
    try {
      await postsApi.deletePost(postId)
      posts.value = posts.value.filter(p => p.id !== postId)
      if (currentPost.value?.id === postId) {
        currentPost.value = null
      }
      showToast('Post excluído com sucesso!', 'info')
    } catch (err: any) {
      showToast(err.message || 'Erro ao excluir post', 'error')
      throw err
    }
  }

  async function fetchComments(postId: string) {
    try {
      const data = await postsApi.getComments(postId)
      comments.value = data
      return data
    } catch (err: any) {
      comments.value = []
      throw err
    }
  }

  async function addComment(postId: string, content: string) {
    try {
      const comment = await postsApi.createComment(postId, content)
      comments.value.push(comment)
      showToast('Comentário publicado!', 'success')
      return comment
    } catch (err: any) {
      showToast(err.message || 'Erro ao enviar comentário', 'error')
      throw err
    }
  }

  async function removeComment(postId: string, commentId: string) {
    try {
      await postsApi.deleteComment(postId, commentId)
      comments.value = comments.value.filter(c => c.id !== commentId)
      showToast('Comentário removido.', 'info')
    } catch (err: any) {
      showToast(err.message || 'Erro ao remover comentário', 'error')
      throw err
    }
  }

  return {
    posts,
    currentPost,
    comments,
    activeFilter,
    filteredPosts,
    isLoading,
    setFilter,
    fetchPosts,
    refreshPostsSilently,
    getPost,
    createPost,
    updatePost,
    updateStatus,
    updateWriter,
    deletePost,
    fetchComments,
    addComment,
    removeComment
  }
}
