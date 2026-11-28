<template>
  <div class="h-screen bg-surface-100/70 dark:bg-surface-900 text-surface-800 dark:text-surface-100 antialiased flex overflow-hidden transition-colors duration-200">
    <!-- Sidebar -->
    <aside class="w-64 bg-surface-50 dark:bg-surface-950/80 border-r border-surface-200 dark:border-surface-800 flex flex-col shrink-0 transition-colors duration-200">
      <div class="px-5 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 group">
          <span class="font-extrabold text-brand-600 dark:text-brand-400 text-2xl tracking-tight">GAD</span>
        </router-link>

        <button
          type="button"
          @click="toggleTheme"
          class="btn-secondary p-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center"
          :title="isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'"
        >
          <Sun v-if="isDark" class="w-4 h-4 text-mint-400" />
          <Moon v-else class="w-4 h-4 text-brand-600" />
        </button>
      </div>

      <nav class="flex-1 py-4 px-3 space-y-1">
        <button
          @click="currentSection = 'posts'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'posts' }]"
        >
          <FileText class="w-4 h-4" />Meus Posts
        </button>
        <button
          @click="openLibrary"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'medias' }]"
        >
          <Image class="w-4 h-4" />Biblioteca de Mídias
        </button>
        <button
          @click="currentSection = 'agency'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'agency' }]"
        >
          <Building class="w-4 h-4" />Vínculo com Agência
        </button>
        <button
          @click="currentSection = 'profile'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'profile' }]"
        >
          <User class="w-4 h-4" />Meu Perfil
        </button>
      </nav>

      <SidebarUserFooter />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-8 bg-surface-100/70 dark:bg-surface-900 transition-colors duration-200">
      <!-- Section: Posts -->
      <div v-if="currentSection === 'posts'" class="fade-in">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Painel do Redator</h1>
            <p class="text-sm text-surface-500 dark:text-surface-400">Gerenciamento e envio de publicações para revisão</p>
          </div>
          <button
            v-if="linkedAgency"
            @click="openCreatePostModal()"
            class="btn-primary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus class="w-4 h-4" />Criar Novo Post
          </button>
        </div>

        <!-- Sem agência: não há clientes nem biblioteca, então não dá para criar posts -->
        <div v-if="agencyChecked && !linkedAgency" class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl p-10 border border-surface-200 dark:border-surface-700/80 text-center max-w-xl mx-auto">
          <div class="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/25 flex items-center justify-center mx-auto mb-4">
            <Building class="w-6 h-6" />
          </div>
          <h3 class="text-base font-semibold text-surface-900 dark:text-surface-100 mb-1">Vincule-se a uma agência para começar</h3>
          <p class="text-sm text-surface-500 dark:text-surface-400 mb-5">Os posts são feitos para os clientes de uma agência. Peça um token de convite à agência e use-o na aba de vínculo.</p>
          <button @click="currentSection = 'agency'" class="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium inline-flex items-center gap-2">
            <Building class="w-4 h-4" />Inserir token de convite
          </button>
        </div>

        <template v-else-if="linkedAgency">
        <!-- Resumo dos meus posts -->
        <PostStatusSummary
          class="mb-8"
          :counts="myCounts"
          :active="ownerFilter === 'mine' ? statusFilter : null"
          @select="selectStatus"
        />

        <!-- Filtros da lista -->
        <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div class="flex gap-1 bg-surface-50 dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700/80 p-1 rounded-lg text-xs">
            <button
              v-for="opt in ownerOptions"
              :key="opt.value"
              @click="ownerFilter = opt.value"
              :class="['px-2.5 py-1 rounded-md font-medium transition', ownerFilter === opt.value ? 'bg-brand-500 text-white' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100']"
            >
              {{ opt.label }}
            </button>
          </div>
          <div class="flex flex-wrap gap-1.5 bg-surface-50 dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700/80 p-1 rounded-lg text-xs">
            <button
              v-for="st in statusOptions"
              :key="st.value"
              @click="statusFilter = st.value"
              :class="['px-2.5 py-1 rounded-md font-medium transition', statusFilter === st.value ? 'bg-brand-500 text-white' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100']"
            >
              {{ st.label }}
            </button>
          </div>
        </div>

        <div v-if="posts.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
          Você ainda não possui posts. Clique acima para criar um post de rascunho.
        </div>

        <div v-else-if="visiblePosts.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
          Nenhum post encontrado com os filtros selecionados.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <PostCard v-for="post in visiblePosts" :key="post.id" :post="post" @open="openPostDetailModal">
            <template v-if="(isMyPost(post) && !isFinal(post)) || post.status === 'denied'" #actions>
              <button
                v-if="post.status === 'denied'"
                @click="duplicateAsDraft(post)"
                class="flex-1 btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5"
                title="Criar um rascunho novo com o conteúdo deste post"
              >
                <Copy class="w-3.5 h-3.5" />Duplicar como rascunho
              </button>
              <button
                v-else-if="post.status === 'draft'"
                @click="sendToReview(post)"
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white transition shadow-xs"
              >
                Enviar p/ Revisão
              </button>
              <button
                v-else-if="post.status === 'approved'"
                @click="publishPost(post)"
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 dark:bg-mint-600 dark:hover:bg-mint-700 text-white inline-flex items-center justify-center gap-1.5 shadow-xs transition"
              >
                <CheckCircle2 class="w-3.5 h-3.5" />Publicar
              </button>
              <span v-else class="flex-1 text-xs text-surface-500 dark:text-surface-400">Aguardando o cliente</span>
              <button
                v-if="isMyPost(post)"
                @click="handleDelete(post.id)"
                class="p-2 text-surface-500 dark:text-surface-400 hover:text-danger dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/15 transition"
                title="Excluir post"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </template>
          </PostCard>
        </div>
        </template>
      </div>

      <!-- Section: Agency Link -->
      <!-- Biblioteca da agência, só para consulta (edição fica com a agência e o designer) -->
      <div v-if="currentSection === 'medias'" class="fade-in">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-surface-900 dark:text-surface-50">Biblioteca de Mídias</h2>
        </div>
        <MediaLibraryGrid
          :medias="medias"
          :empty-text="linkedAgency ? 'Nenhuma mídia enviada ainda para esta agência.' : 'Vincule-se a uma agência para ver a biblioteca de mídias.'"
        />
      </div>

      <div v-if="currentSection === 'agency'" class="fade-in max-w-xl">
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-2">Vínculo com Agência</h2>
        <p class="text-sm text-surface-500 dark:text-surface-400 mb-6">Redatores vinculados podem criar posts e acessar a biblioteca da agência</p>

        <div v-if="linkedAgency" class="bg-surface-50 dark:bg-surface-800/85 p-6 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-xs dark:shadow-card-dark mb-6">
          <div class="flex items-center justify-between gap-4">
            <div>
              <span class="text-xs font-semibold text-emerald-600 dark:text-mint-400 uppercase tracking-wider">Vinculado à Agência</span>
              <h3 class="text-lg font-bold text-surface-900 dark:text-surface-100 mt-1">{{ linkedAgency.user.name }}</h3>
              <p class="text-xs text-surface-500 dark:text-surface-400">CNPJ: {{ linkedAgency.cnpj }}</p>
            </div>
            <button @click="handleSelfUnlink" class="btn-danger px-4 py-2 rounded-lg text-xs font-medium shrink-0">
              Desvincular-me
            </button>
          </div>
        </div>

        <div v-else class="bg-surface-50 dark:bg-surface-800/85 p-6 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-xs dark:shadow-card-dark">
          <h3 class="text-base font-semibold text-surface-900 dark:text-surface-100 mb-2">Conectar a uma Agência</h3>
          <p class="text-xs text-surface-500 dark:text-surface-400 mb-4">Insira o token de convite fornecido pela agência para se vincular:</p>
          <form @submit.prevent="handleLinkByToken" class="flex gap-2">
            <input
              v-model="tokenInput"
              type="text"
              required
              placeholder="Ex: K7M2QP"
              autocomplete="off"
              autocapitalize="characters"
              spellcheck="false"
              class="flex-1 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm font-mono uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
            />
            <button type="submit" class="btn-primary px-5 py-2 rounded-lg text-sm font-medium">
              Conectar
            </button>
          </form>
        </div>
      </div>

      <!-- Section: Profile -->
      <div v-if="currentSection === 'profile'" class="fade-in max-w-xl">
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">Meu Perfil</h2>
        <div class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xs dark:shadow-card-dark space-y-6">
          <AvatarUpload />

          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Nome Completo</label>
              <input v-model="profileName" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100" />
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">E-mail</label>
              <input v-model="profileEmail" type="email" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100" />
            </div>
            <button type="submit" class="btn-primary px-6 py-2.5 rounded-lg font-medium text-sm">
              Salvar Alterações
            </button>
          </form>

          <div class="pt-6 border-t border-surface-200 dark:border-surface-700/80 flex items-center justify-between">
            <div>
              <h4 class="text-xs font-medium text-surface-600 dark:text-surface-300">Desativação da conta</h4>
              <p class="text-[11px] text-surface-500 dark:text-surface-400">Você perderá o acesso e vínculos com agências até reativar</p>
            </div>
            <button @click="handleDeactivate" class="text-xs text-danger hover:underline font-medium">
              Desativar conta
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <CreatePostModal />
    <EditPostModal />
    <PostDetailModal />
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import { ref, computed, onMounted } from 'vue'
import PostCard from '@/components/PostCard.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import AvatarUpload from '@/components/AvatarUpload.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import EditPostModal from '@/components/EditPostModal.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useAutoRefresh } from '@/composables/useAutoRefresh'
import { usePostDuplication } from '@/composables/usePostDuplication'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useModals } from '@/composables/useModals'
import { useTheme } from '@/composables/useTheme'
import { meApi } from '@/api/me'
import { useToast } from '@/composables/useToast'
import type { PostItem, PostStatus } from '@/types/api'
import { FileText, Building, User, Plus, Trash2, CheckCircle2, Sun, Moon, Copy, Image } from '@lucide/vue'
import MediaLibraryGrid from '@/components/MediaLibraryGrid.vue'
import { useMedia } from '@/composables/useMedia'
import PostStatusSummary from '@/components/PostStatusSummary.vue'
import { countByStatus } from '@/utils/postStatus'

const { confirmDialog } = useDialog()
const currentSection = ref('posts')

const { currentUser, logout, fetchProfile } = useAuth()
const { posts, fetchPosts, refreshPostsSilently, updateStatus, deletePost } = usePosts()
const { medias, fetchMedias } = useMedia()

// Biblioteca de mídias da agência (só consulta): carrega ao abrir a seção
function openLibrary() {
  currentSection.value = 'medias'
  if (linkedAgency.value) fetchMedias().catch(() => {})
}
useAutoRefresh(() => refreshPostsSilently())
const { duplicateAsDraft } = usePostDuplication()
const { linkedAgency, fetchMyAgency, linkWithToken, selfUnlink } = useAgencyMembers()
const { openCreatePostModal, openPostDetailModal } = useModals()
const { showToast } = useToast()
const { isDark, toggleTheme } = useTheme()

const profileName = ref('')
const profileEmail = ref('')
const tokenInput = ref('')
// Evita mostrar o aviso de "sem agência" antes de a consulta terminar
const agencyChecked = ref(false)

onMounted(async () => {
  await Promise.all([
    fetchProfile().catch(() => {}),
    fetchPosts().catch(() => {}),
    fetchMyAgency().catch(() => {}).finally(() => { agencyChecked.value = true })
  ])
  if (currentUser.value) {
    profileName.value = currentUser.value.name
    profileEmail.value = currentUser.value.email
  }
})

async function sendToReview(post: PostItem) {
  if (post.medias.length === 0) {
    showToast('O post precisa de pelo menos 1 mídia anexada para entrar em revisão!', 'error')
    return
  }
  await updateStatus(post.id, 'review', post.version)
}

async function publishPost(post: PostItem) {
  if (!(await confirmDialog({ title: 'Publicar post', message: `Deseja realmente marcar o post "${post.title}" como publicado?`, confirmLabel: 'Publicar' }))) return
  try {
    await updateStatus(post.id, 'published', post.version)
  } catch {}
}

async function handleDelete(postId: string) {
  if (!(await confirmDialog({ title: 'Excluir post', message: 'Deseja realmente excluir este post?', confirmLabel: 'Excluir', danger: true }))) return
  await deletePost(postId)
}

async function handleLinkByToken() {
  if (!tokenInput.value.trim()) return
  try {
    await linkWithToken(tokenInput.value.trim())
    tokenInput.value = ''
    await fetchPosts()
  } catch {}
}

async function handleSelfUnlink() {
  if (!(await confirmDialog({ title: 'Desvincular da agência', message: 'Deseja realmente se desvincular da agência?', confirmLabel: 'Desvincular', danger: true }))) return
  await selfUnlink()
  await fetchPosts()
}

async function handleUpdateProfile() {
  try {
    await meApi.updateProfile({
      name: profileName.value.trim(),
      email: profileEmail.value.trim()
    })
    await fetchProfile()
    showToast('Perfil atualizado com sucesso!', 'success')
  } catch (err: any) {
    showToast(err.message || 'Erro ao atualizar perfil', 'error')
  }
}

async function handleDeactivate() {
  if (!(await confirmDialog({ title: 'Desativar conta', message: 'Tem certeza de que deseja desativar sua conta?', confirmLabel: 'Desativar', danger: true }))) return
  try {
    await meApi.deactivateAccount()
    logout(false)
    showToast('Conta desativada com sucesso.', 'info')
  } catch (err: any) {
    showToast(err.message || 'Erro ao desativar conta', 'error')
  }
}

function isMyPost(post: PostItem): boolean {
  return !!currentUser.value && post.writer_id === currentUser.value.id
}

function isFinal(post: PostItem): boolean {
  return post.status === 'denied' || post.status === 'published'
}

// Mini dashboard: contagem dos posts de autoria do redator e filtros da lista
type StatusFilter = 'all' | PostStatus
type OwnerFilter = 'mine' | 'all'

const statusFilter = ref<StatusFilter>('all')
const ownerFilter = ref<OwnerFilter>('mine')

const ownerOptions: { value: OwnerFilter; label: string }[] = [
  { value: 'mine', label: 'Meus posts' },
  { value: 'all', label: 'Todos da agência' }
]

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'draft', label: 'Rascunho' },
  { value: 'review', label: 'Revisão' },
  { value: 'approved', label: 'Aprovado' },
  { value: 'denied', label: 'Reprovado' },
  { value: 'published', label: 'Publicado' }
]

const myPosts = computed(() => posts.value.filter(isMyPost))

const myCounts = computed(() => countByStatus(myPosts.value))

function selectStatus(status: PostStatus) {
  ownerFilter.value = 'mine'
  statusFilter.value = statusFilter.value === status ? 'all' : status
}

const visiblePosts = computed(() => {
  const base = ownerFilter.value === 'mine' ? myPosts.value : posts.value
  return statusFilter.value === 'all' ? base : base.filter(p => p.status === statusFilter.value)
})
</script>