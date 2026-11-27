<template>
  <div class="h-full bg-surface-100/70 dark:bg-surface-900 text-surface-800 dark:text-surface-100 antialiased flex overflow-hidden transition-colors duration-200">
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
            @click="openCreatePostModal"
            class="btn-primary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus class="w-4 h-4" />Criar Novo Post
          </button>
        </div>

        <div v-if="posts.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
          Você ainda não possui posts. Clique acima para criar um post de rascunho.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="post in posts"
            :key="post.id"
            class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-5 border border-surface-200 dark:border-surface-700/80 flex items-center justify-between shadow-xs dark:shadow-card-dark hover:border-brand-300 dark:hover:border-brand-500/40 transition"
          >
            <div class="flex-1 cursor-pointer min-w-0" @click="openPostDetailModal(post)">
              <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                <h4 class="font-semibold text-surface-900 dark:text-surface-100 text-sm hover:text-brand-600 dark:hover:text-brand-300 transition">{{ post.title }}</h4>
                <StatusBadge :status="post.status" />
                <span class="text-xs font-mono text-surface-500 dark:text-surface-400">v{{ post.version }}</span>
              </div>
              <p class="text-xs text-surface-600 dark:text-surface-300 line-clamp-1 mb-2">{{ post.content }}</p>
              <div class="flex items-center gap-4 text-xs text-surface-500 dark:text-surface-400">
                <span>{{ post.medias.length }} mídia(s) anexada(s)</span>
                <span>{{ post.comments.length }} comentário(s)</span>
                <span>Criado em {{ formatDate(post.created_at) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0 ml-4">
              <button
                v-if="post.status === 'draft'"
                @click="sendToReview(post)"
                class="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white transition shadow-xs"
              >
                Enviar p/ Revisão
              </button>

              <button
                v-if="post.status === 'approved'"
                @click="publishPost(post)"
                class="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 dark:bg-mint-600 dark:hover:bg-mint-700 text-white flex items-center gap-1.5 shadow-xs transition"
              >
                <CheckCircle2 class="w-3.5 h-3.5" />
                Publicar
              </button>

              <button
                v-if="post.status !== 'denied' && post.status !== 'published'"
                @click="openEditPostModal(post)"
                class="p-2 text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-300 rounded-lg hover:bg-surface-200/60 dark:hover:bg-surface-700/70 transition"
                title="Editar post"
              >
                <Edit class="w-4 h-4" />
              </button>

              <button
                v-if="post.status !== 'denied' && post.status !== 'published'"
                @click="handleDelete(post.id)"
                class="p-2 text-surface-500 dark:text-surface-400 hover:text-danger dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/15 transition"
                title="Excluir post"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Agency Link -->
      <div v-if="currentSection === 'agency'" class="fade-in max-w-xl">
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-2">Vínculo com Agência</h2>
        <p class="text-sm text-surface-500 dark:text-surface-400 mb-6">Redatores vinculados podem criar posts e acessar a biblioteca da agência</p>

        <div v-if="linkedAgency" class="bg-surface-50 dark:bg-surface-800/85 p-6 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-xs dark:shadow-card-dark mb-6">
          <div class="flex items-center justify-between gap-4">
            <div>
              <span class="text-xs font-semibold text-emerald-600 dark:text-mint-400 uppercase tracking-wider">Vinculado à Agência</span>
              <h3 class="text-lg font-bold text-surface-900 dark:text-surface-100 mt-1">{{ linkedAgency.user.name }}</h3>
              <p class="text-xs text-surface-500 dark:text-surface-400">CNPJ: {{ linkedAgency.cnpj }} · {{ linkedAgency.user.email }}</p>
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
              placeholder="Cole o token de convite aqui..."
              class="flex-1 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm font-mono bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
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
import { ref, onMounted } from 'vue'
import StatusBadge from '@/components/StatusBadge.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import AvatarUpload from '@/components/AvatarUpload.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import EditPostModal from '@/components/EditPostModal.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useModals } from '@/composables/useModals'
import { useTheme } from '@/composables/useTheme'
import { meApi } from '@/api/me'
import { useToast } from '@/composables/useToast'
import type { PostItem } from '@/types/api'
import { FileText, Building, User, Plus, Edit, Trash2, CheckCircle2, Sun, Moon } from '@lucide/vue'

const currentSection = ref('posts')

const { currentUser, logout, fetchProfile } = useAuth()
const { posts, fetchPosts, updateStatus, deletePost } = usePosts()
const { linkedAgency, fetchMyAgency, linkWithToken, selfUnlink } = useAgencyMembers()
const { openCreatePostModal, openEditPostModal, openPostDetailModal } = useModals()
const { showToast } = useToast()
const { isDark, toggleTheme } = useTheme()

const profileName = ref('')
const profileEmail = ref('')
const tokenInput = ref('')

onMounted(async () => {
  await Promise.all([
    fetchProfile().catch(() => {}),
    fetchPosts().catch(() => {}),
    fetchMyAgency().catch(() => {})
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
  if (!confirm(`Deseja realmente marcar o post "${post.title}" como publicado?`)) return
  try {
    await updateStatus(post.id, 'published', post.version)
    showToast('Post publicado com sucesso!', 'success')
  } catch {}
}

async function handleDelete(postId: string) {
  if (!confirm('Deseja realmente excluir este post?')) return
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
  if (!confirm('Deseja realmente desvincular-se da agência?')) return
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
  if (!confirm('Tem certeza de que deseja desativar sua conta?')) return
  try {
    await meApi.deactivateAccount()
    logout(false)
    showToast('Conta desativada com sucesso.', 'info')
  } catch (err: any) {
    showToast(err.message || 'Erro ao desativar conta', 'error')
  }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR')
  } catch {
    return iso
  }
}
</script>