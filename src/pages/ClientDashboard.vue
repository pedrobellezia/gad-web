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
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'posts' }]"
        >
          <FileText class="w-4 h-4" />
          <span>Posts para Aprovação</span>
          <span v-if="pendingReviewCount > 0" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
            {{ pendingReviewCount }}
          </span>
        </button>

        <button
          @click="currentSection = 'history'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'history' }]"
        >
          <History class="w-4 h-4" />
          <span>Histórico de Posts</span>
        </button>

        <button
          @click="currentSection = 'agency'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'agency' }]"
        >
          <Building2 class="w-4 h-4" />
          <span>Vínculo com Agência</span>
        </button>

        <button
          @click="currentSection = 'profile'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'profile' }]"
        >
          <User class="w-4 h-4" />
          <span>Meu Perfil</span>
        </button>
      </nav>

      <SidebarUserFooter />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-8 bg-surface-100/70 dark:bg-surface-900 transition-colors duration-200">
      <!-- Section: Posts para Aprovação -->
      <div v-if="currentSection === 'posts'" class="fade-in space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Posts Aguardando Aprovação</h1>
            <p class="text-sm text-surface-500 dark:text-surface-400">Revise o texto, as mídias e decida sobre a aprovação ou solicitação de ajuste</p>
          </div>
          <button
            @click="() => fetchPosts()"
            class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 self-start"
          >
            <RefreshCw :class="['w-4 h-4', { 'animate-spin': isLoading }]" />
            <span>Atualizar</span>
          </button>
        </div>

        <div v-if="isLoading" class="text-center py-12 text-surface-500 dark:text-surface-400 text-sm">
          Carregando publicações...
        </div>

        <div v-else-if="pendingReviewPosts.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-12 text-center max-w-md mx-auto shadow-xs dark:shadow-card-dark">
          <div class="w-12 h-12 rounded-full bg-mint-50 dark:bg-mint-500/15 text-mint-600 dark:text-mint-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-surface-800 dark:text-surface-100 mb-1">Tudo em dia!</h3>
          <p class="text-xs text-surface-500 dark:text-surface-400">Não há nenhuma publicação aguardando sua revisão no momento.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <PostCard v-for="post in pendingReviewPosts" :key="post.id" :post="post" @open="openPostDetailModal">
            <template #actions>
              <button
                @click="openApprovalModal(post, 'approve')"
                class="btn-success flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5"
              >
                <Check class="w-3.5 h-3.5" />Aprovar
              </button>
              <button
                @click="openApprovalModal(post, 'deny')"
                class="btn-danger flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5"
              >
                <X class="w-3.5 h-3.5" />Reprovar
              </button>
            </template>
          </PostCard>
        </div>
      </div>

      <!-- Section: Histórico Completo de Posts -->
      <div v-else-if="currentSection === 'history'" class="fade-in space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Histórico de Publicações</h1>
          <p class="text-sm text-surface-500 dark:text-surface-400">Todas as publicações aprovadas, reprovadas ou publicadas</p>
        </div>

        <div v-if="historyPosts.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-12 text-center max-w-md mx-auto shadow-xs dark:shadow-card-dark">
          <p class="text-sm text-surface-500 dark:text-surface-400">Nenhum post no histórico até o momento.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <PostCard v-for="post in historyPosts" :key="post.id" :post="post" @open="openPostDetailModal" />
        </div>
      </div>

      <!-- Section: Vínculo com Agência -->
      <div v-else-if="currentSection === 'agency'" class="fade-in space-y-6 max-w-2xl">
        <div>
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Vínculo com Agência</h1>
          <p class="text-sm text-surface-500 dark:text-surface-400">Informações da agência responsável pelo gerenciamento do seu conteúdo</p>
        </div>

        <div v-if="linkedAgency" class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xs dark:shadow-card-dark space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300 flex items-center justify-center">
              <Building2 class="w-6 h-6" />
            </div>
            <div>
              <span class="text-xs text-mint-600 dark:text-mint-400 font-semibold tracking-wider uppercase block">Agência Vinculada</span>
              <h3 class="text-lg font-bold text-surface-900 dark:text-surface-100">{{ linkedAgency.user.name }}</h3>
            </div>
          </div>

          <div class="bg-surface-100/80 dark:bg-surface-900/70 p-4 rounded-xl border border-surface-200 dark:border-surface-700/80 text-xs space-y-1 text-surface-600 dark:text-surface-300">
            <p><strong class="text-surface-800 dark:text-surface-100">CNPJ:</strong> {{ linkedAgency.cnpj }}</p>
            <p><strong class="text-surface-800 dark:text-surface-100">Status:</strong> Conexão Ativa</p>
          </div>

          <div class="pt-2">
            <button
              @click="handleUnlink"
              :disabled="unlinking"
              class="btn-danger px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <Unlink class="w-4 h-4" />
              <span>{{ unlinking ? 'Desvinculando...' : 'Desvincular Desta Agência' }}</span>
            </button>
          </div>
        </div>

        <div v-else class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xs dark:shadow-card-dark space-y-4">
          <div class="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-700/70 text-surface-600 dark:text-surface-300 flex items-center justify-center">
            <Key class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-surface-900 dark:text-surface-100">Conectar a uma Agência</h3>
            <p class="text-xs text-surface-500 dark:text-surface-400 mt-1">
              Insira o token de vínculo gerado pela agência contratada para permitir a gestão dos seus posts.
            </p>
          </div>

          <div class="space-y-3 pt-2">
            <input
              v-model="tokenInput"
              type="text"
              placeholder="Ex: TKN-12345678"
              class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm font-mono bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
            />
            <button
              @click="handleLinkAgency"
              :disabled="linking || !tokenInput.trim()"
              class="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <LinkIcon class="w-4 h-4" />
              <span>{{ linking ? 'Conectando...' : 'Vincular com Token' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Section: Meu Perfil -->
      <div v-else-if="currentSection === 'profile'" class="fade-in space-y-6 max-w-2xl">
        <div>
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Meu Perfil</h1>
          <p class="text-sm text-surface-500 dark:text-surface-400">Informações cadastrais e configurações de segurança</p>
        </div>

        <div class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xs dark:shadow-card-dark space-y-6">
          <AvatarUpload />

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-500 dark:text-surface-400 mb-1">Nome da Empresa / Cliente</label>
              <input
                v-model="profileName"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-500 dark:text-surface-400 mb-1">E-mail Cadastrado</label>
              <input
                :value="user?.email"
                disabled
                type="email"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-100/80 dark:bg-surface-900/60 text-surface-500 dark:text-surface-500 text-sm cursor-not-allowed"
              />
            </div>

            <div class="flex justify-end">
              <button
                @click="handleSaveProfile"
                :disabled="savingProfile || profileName === user?.name"
                class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {{ savingProfile ? 'Salvando...' : 'Atualizar Nome' }}
              </button>
            </div>
          </div>

          <div class="pt-6 border-t border-surface-200 dark:border-surface-700/80 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-semibold text-surface-800 dark:text-surface-100">Segurança da Senha</h4>
              <p class="text-xs text-surface-500 dark:text-surface-400">Altere sua senha de acesso ao portal</p>
            </div>
            <button
              @click="openChangePasswordModal"
              class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
            >
              Alterar Senha
            </button>
          </div>

          <div class="pt-6 border-t border-surface-200 dark:border-surface-700/80 flex items-center justify-between">
            <div>
              <h4 class="text-xs font-medium text-surface-600 dark:text-surface-300">Desativação da conta</h4>
              <p class="text-[11px] text-surface-500 dark:text-surface-400">Você perderá o acesso até solicitar restauração</p>
            </div>
            <button
              @click="handleDeactivateAccount"
              class="text-xs text-danger hover:underline font-medium"
            >
              Desativar conta
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modais -->
    <ApprovalModal />
    <PostDetailModal />
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { useTheme } from '@/composables/useTheme'
import { agencyApi } from '@/api/agency'
import { meApi } from '@/api/me'
import type { Agency } from '@/types/api'
import PostCard from '@/components/PostCard.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import AvatarUpload from '@/components/AvatarUpload.vue'
import ApprovalModal from '@/components/ApprovalModal.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import {
  CheckCircle2,
  FileText,
  History,
  Building2,
  User,
  RefreshCw,
  Check,
  X,
  Key,
  Link as LinkIcon,
  Unlink,
  Sun,
  Moon
} from '@lucide/vue'

const { confirmDialog } = useDialog()
const { user, logout, fetchProfile } = useAuth()
const { posts, isLoading, fetchPosts } = usePosts()
const { openApprovalModal, openPostDetailModal, openChangePasswordModal } = useModals()
const { showToast } = useToast()
const { isDark, toggleTheme } = useTheme()

const currentSection = ref<'posts' | 'history' | 'agency' | 'profile'>('posts')
const profileName = ref('')
const linkedAgency = ref<Agency | null>(null)
const tokenInput = ref('')
const linking = ref(false)
const unlinking = ref(false)
const savingProfile = ref(false)

const pendingReviewPosts = computed(() => {
  return posts.value.filter(p => p.status === 'review')
})

const pendingReviewCount = computed(() => pendingReviewPosts.value.length)

const historyPosts = computed(() => {
  return posts.value.filter(p => p.status !== 'review' && p.status !== 'draft')
})

onMounted(async () => {
  await fetchProfile()
  if (user.value) {
    profileName.value = user.value.name
  }
  fetchPosts()
  loadAgencyInfo()
})

async function loadAgencyInfo() {
  try {
    linkedAgency.value = await agencyApi.getMyAgency()
  } catch {
    linkedAgency.value = null
  }
}

async function handleLinkAgency() {
  if (!tokenInput.value.trim()) return
  linking.value = true
  try {
    const res = await agencyApi.linkByToken(tokenInput.value.trim())
    showToast(res.details || 'Vinculado com sucesso!', 'success')
    tokenInput.value = ''
    await loadAgencyInfo()
    fetchPosts()
  } catch (err: any) {
    showToast(err.message || 'Erro ao vincular agência', 'error')
  } finally {
    linking.value = false
  }
}

async function handleUnlink() {
  if (!(await confirmDialog({ title: 'Desvincular da agência', message: 'Deseja realmente se desvincular desta agência?', confirmLabel: 'Desvincular', danger: true }))) return
  unlinking.value = true
  try {
    const res = await agencyApi.selfUnlink()
    showToast(res.details || 'Desvinculado com sucesso', 'success')
    linkedAgency.value = null
    fetchPosts()
  } catch (err: any) {
    showToast(err.message || 'Erro ao desvincular', 'error')
  } finally {
    unlinking.value = false
  }
}

async function handleSaveProfile() {
  if (!profileName.value.trim()) return
  savingProfile.value = true
  try {
    await meApi.updateProfile({ name: profileName.value.trim() })
    await fetchProfile()
    showToast('Perfil atualizado com sucesso!', 'success')
  } catch (err: any) {
    showToast(err.message || 'Erro ao atualizar perfil', 'error')
  } finally {
    savingProfile.value = false
  }
}

async function handleDeactivateAccount() {
  if (!(await confirmDialog({ title: 'Desativar conta', message: 'Tem certeza absoluta que deseja desativar sua conta? Você precisará de restauração para acessá-la novamente.', confirmLabel: 'Desativar', danger: true }))) return
  try {
    await meApi.deactivateAccount()
    showToast('Conta desativada com sucesso.', 'info')
    logout()
  } catch (err: any) {
    showToast(err.message || 'Erro ao desativar conta', 'error')
  }
}
</script>