import { ref, computed } from 'vue'
import { useToast } from './useToast'

export type PostStatus = 'approved' | 'pending' | 'rejected' | 'draft'

export interface PostItem {
  id: string
  title: string
  description: string
  client: string
  writer: string
  date: string
  commentsCount: number
  status: PostStatus
  type: string
}

export interface CreatePostPayload {
  title: string
  content: string
  client?: string
  type?: string
  date?: string
}

const posts = ref<PostItem[]>([
  {
    id: '1',
    title: 'Post Instagram - Promoção Verão',
    description: 'Carrossel com 5 slides sobre a promoção de verão da loja.',
    client: 'Loja ABC',
    writer: 'Maria S.',
    date: '23/05/2026',
    commentsCount: 3,
    status: 'approved',
    type: 'Carrossel'
  },
  {
    id: '2',
    title: 'Carrossel - Dicas de Saúde',
    description: 'Post educativo sobre hábitos saudáveis para o perfil da clínica.',
    client: 'Clínica XYZ',
    writer: 'João P.',
    date: '24/05/2026',
    commentsCount: 0,
    status: 'pending',
    type: 'Carrossel'
  },
  {
    id: '3',
    title: 'Reels - Bastidores da Empresa',
    description: 'Vídeo curto mostrando os bastidores do escritório.',
    client: 'Restaurante 123',
    writer: 'Ana L.',
    date: '22/05/2026',
    commentsCount: 1,
    status: 'rejected',
    type: 'Reels'
  },
  {
    id: '4',
    title: 'Story - Novidades da Semana',
    description: 'Atualizações da semana para Loja ABC.',
    client: 'Loja ABC',
    writer: 'Maria S.',
    date: '25/05/2026',
    commentsCount: 0,
    status: 'draft',
    type: 'Stories'
  }
])

const activeFilter = ref<string>('all')

export function usePosts() {
  const { showToast } = useToast()

  const filteredPosts = computed(() => {
    if (activeFilter.value === 'all') return posts.value
    return posts.value.filter(p => p.status === activeFilter.value)
  })

  function setFilter(filter: string) {
    activeFilter.value = filter
  }

  function addPost(postData: CreatePostPayload) {
    const newPost: PostItem = {
      id: String(Date.now()),
      title: postData.title,
      description: postData.content,
      client: postData.client || 'Loja ABC',
      writer: 'Maria Silva',
      date: new Date().toLocaleDateString('pt-BR'),
      commentsCount: 0,
      status: 'pending',
      type: postData.type || 'Carrossel'
    }
    posts.value.unshift(newPost)
    showToast('Novo post criado com sucesso!', 'success')
  }

  function updatePost(id: string, updatedData: Partial<PostItem>) {
    const index = posts.value.findIndex(p => p.id === id)
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...updatedData }
      showToast('Post atualizado com sucesso!', 'success')
    }
  }

  function deletePost(id: string) {
    posts.value = posts.value.filter(p => p.id !== id)
    showToast('Post excluído!', 'info')
  }

  return {
    posts,
    activeFilter,
    filteredPosts,
    setFilter,
    addPost,
    updatePost,
    deletePost
  }
}
