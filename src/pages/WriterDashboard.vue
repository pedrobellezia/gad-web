<template>
  <div class="h-full bg-surface-50 text-surface-800 antialiased flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
      <router-link to="/" class="px-5 py-4 border-b border-surface-200 flex items-center hover:bg-surface-50 transition group">
        <img src="/gad.png" alt="GAD - Gestor de Agências Digitais" class="h-10 w-auto max-w-[180px] object-contain transition-transform group-hover:scale-102" />
      </router-link>

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
    <main class="flex-1 overflow-auto p-8 bg-surface-50">
      <!-- Section: Posts -->
      <div v-if="currentSection === 'posts'" class="fade-in">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-surface-800">Painel do Redator</h1>
            <p class="text-sm text-surface-400">Gerenciamento e envio de publicações para revisão</p>
          </div>
          <button
            @click="openCreatePostModal"
            class="btn-primary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus class="w-4 h-4" />Criar Novo Post
          </button>
        </div>

        <div v-if="posts.length === 0" class="bg-white rounded-xl p-8 border border-surface-200 text-center text-sm text-surface-400">
          Você ainda não possui posts. Clique acima para criar um post de rascunho.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="post in posts"
            :key="post.id"
            class="bg-white rounded-xl p-5 border border-surface-200 flex items-center justify-between shadow-xs hover:border-brand-300 transition"
          >
            <div class="flex-1 cursor-pointer" @click="openPostDetailModal(post)">
              <div class="flex items-center gap-2 mb-1.5">
                <h4 class="font-semibold text-surface-800 text-sm hover:text-brand-600 transition">{{ post.title }}</h4>
                <StatusBadge :status="post.status" />
                <span class="text-xs font-mono text-surface-400">v{{ post.version }}</span>
              </div>
              <p class="text-xs text-surface-500 line-clamp-1 mb-2">{{ post.content }}</p>
              <div class="flex items-center gap-4 text-xs text-surface-400">
                <span>{{ post.medias.length }} mídia(s) anexada(s)</span>
                <span>{{ post.comments.length }} comentário(s)</span>
                <span>Criado em {{ formatDate(post.created_at) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0 ml-4">
              <!-- Send to Review if in draft -->
              <button
                v-if="post.status === 'draft'"
                @click="sendToReview(post)"
                class="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white"
              >
                Enviar p/ Revisão
              </button>

              <button
                v-if="post.status !== 'denied' && post.status !== 'published'"
                @click="openEditPostModal(post)"
                class="p-2 text-surface-400 hover:text-brand-600 rounded-lg hover:bg-surface-100 transition"
                title="Editar post"
              >
                <Edit class="w-4 h-4" />
              </button>

              <button
                v-if="post.status !== 'denied' && post.status !== 'published'"
                @click="handleDelete(post.id)"
                class="p-2 text-surface-400 hover:text-danger rounded-lg hover:bg-red-50 transition"
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
        <h2 class="text-2xl font-bold text-surface-800 mb-2">Vínculo com Agência</h2>
        <p class="text-sm text-surface-400 mb-6">Redatores vinculados podem criar posts e acessar a biblioteca da agência</p>

        <div v-if="linkedAgency" class="bg-white p-6 rounded-2xl border border-surface-200 shadow-xs mb-6">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Vinculado à Agência</span>
              <h3 class="text-lg font-bold text-surface-800 mt-1">{{ linkedAgency.user.name }}</h3>
              <p class="text-xs text-surface-400">CNPJ: {{ linkedAgency.cnpj }} · {{ linkedAgency.user.email }}</p>
            </div>
            <button @click="handleSelfUnlink" class="btn-danger px-4 py-2 rounded-lg text-xs font-medium">
              Desvincular-me
            </button>
          </div>
        </div>

        <div v-else class="bg-white p-6 rounded-2xl border border-surface-200 shadow-xs">
          <h3 class="text-base font-semibold text-surface-800 mb-2">Conectar a uma Agência</h3>
          <p class="text-xs text-surface-400 mb-4">Insira o token de convite fornecido pela agência para se vincular:</p>
          <form @submit.prevent="handleLinkByToken" class="flex gap-2">
            <input
              v-model="tokenInput"
              type="text"
              required
              placeholder="Cole o token de convite aqui..."
              class="flex-1 px-4 py-2 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm font-mono"
            />
            <button type="submit" class="btn-primary px-5 py-2 rounded-lg text-sm font-medium">
              Conectar
            </button>
          </form>
        </div>
      </div>

      <!-- Section: Profile -->
      <div v-if="currentSection === 'profile'" class="fade-in max-w-xl">
        <h2 class="text-2xl font-bold text-surface-800 mb-6">Meu Perfil</h2>
        <div class="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs space-y-6">
          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-surface-600 mb-1">Nome Completo</label>
              <input v-model="profileName" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-600 mb-1">E-mail</label>
              <input v-model="profileEmail" type="email" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm" />
            </div>
            <button type="submit" class="btn-primary px-6 py-2.5 rounded-lg font-medium text-sm">
              Salvar Alterações
            </button>
          </form>

          <div class="pt-6 border-t border-surface-200 flex items-center justify-between">
            <div>
              <h4 class="text-xs font-medium text-surface-500">Desativação da conta</h4>
              <p class="text-[11px] text-surface-400">Você perderá o acesso e vínculos com agências até reativar</p>
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
    <ChangePasswordModal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StatusBadge from '@/components/StatusBadge.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import EditPostModal from '@/components/EditPostModal.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal.vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useModals } from '@/composables/useModals'
import { meApi } from '@/api/me'
import { useToast } from '@/composables/useToast'
import type { PostItem } from '@/types/api'
import { PenTool, FileText, Building, User, LogOut, Plus, Edit, Trash2 } from '@lucide/vue'

const currentSection = ref('posts')

const { currentUser, logout, fetchProfile } = useAuth()
const { posts, fetchPosts, updateStatus, deletePost } = usePosts()
const { linkedAgency, fetchMyAgency, linkWithToken, selfUnlink } = useAgencyMembers()
const { openCreatePostModal, openEditPostModal, openPostDetailModal } = useModals()
const { showToast } = useToast()

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
