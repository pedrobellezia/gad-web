<template>
  <div class="h-full bg-surface-50 text-surface-800 antialiased flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
      <router-link to="/" class="px-5 py-4.5 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between hover:bg-surface-50 dark:hover:bg-surface-800/40 transition group">
        <img src="/gad.png" alt="GAD - Gestor de Agências Digitais" class="h-11 w-auto max-w-[155px] object-contain transition-transform group-hover:scale-102" />
        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 shrink-0">
          Cliente
        </span>
      </router-link>

      <nav class="flex-1 py-4 px-3 space-y-1">
        <button
          @click="currentSection = 'posts'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'posts' }]"
        >
          <FileText class="w-4 h-4" />
          <span>Posts para Aprovação</span>
          <span v-if="pendingReviewCount > 0" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning-700 font-bold">
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
    <main class="flex-1 overflow-auto p-8 bg-surface-50">
      <!-- Section: Posts para Aprovação -->
      <div v-if="currentSection === 'posts'" class="fade-in space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-surface-800">Posts Aguardando Aprovação</h1>
            <p class="text-sm text-surface-400">Revise o texto, as mídias e decida sobre a aprovação ou solicitação de ajuste</p>
          </div>
          <button
            @click="() => fetchPosts()"
            class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 self-start"
          >
            <RefreshCw :class="['w-4 h-4', { 'animate-spin': isLoading }]" />
            <span>Atualizar</span>
          </button>
        </div>

        <div v-if="isLoading" class="text-center py-12 text-surface-400 text-sm">
          Carregando publicações...
        </div>

        <div v-else-if="pendingReviewPosts.length === 0" class="bg-white rounded-2xl border border-surface-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <div class="w-12 h-12 rounded-full bg-success/10 text-success-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-surface-700 mb-1">Tudo em dia!</h3>
          <p class="text-xs text-surface-400">Não há nenhuma publicação aguardando sua revisão no momento.</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="post in pendingReviewPosts"
            :key="post.id"
            class="bg-white rounded-xl border border-surface-200 p-6 shadow-xs hover:border-brand-200 transition"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <h3 class="font-bold text-surface-800 text-base">{{ post.title }}</h3>
                <StatusBadge :status="post.status" />
              </div>
              <span class="text-xs text-surface-400">{{ formatDate(post.created_at) }}</span>
            </div>

            <p class="text-sm text-surface-600 mb-4 whitespace-pre-line leading-relaxed">
              {{ post.content }}
            </p>

            <div class="flex flex-wrap items-center gap-4 text-xs text-surface-400 mb-4 py-2 border-y border-surface-100">
              <span class="font-medium text-surface-600">Versão: v{{ post.version }}</span>
              <span>•</span>
              <span>Criado em: {{ formatDate(post.created_at) }}</span>
              <span>•</span>
              <span>{{ post.medias?.length || 0 }} mídias anexadas</span>
            </div>

            <div class="flex items-center justify-between pt-1">
              <button
                @click="openPostDetailModal(post)"
                class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
              >
                <Eye class="w-3.5 h-3.5" />
                <span>Ver Mídias & Comentários</span>
              </button>

              <div class="flex items-center gap-2">
                <button
                  @click="openApprovalModal(post, 'approve')"
                  class="btn-success px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Check class="w-4 h-4" />
                  <span>Aprovar Post</span>
                </button>
                <button
                  @click="openApprovalModal(post, 'deny')"
                  class="btn-danger px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <X class="w-4 h-4" />
                  <span>Rejeitar / Ajustes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Histórico Completo de Posts -->
      <div v-else-if="currentSection === 'history'" class="fade-in space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-surface-800">Histórico de Publicações</h1>
          <p class="text-sm text-surface-400">Todas as publicações aprovadas, reprovadas ou publicadas</p>
        </div>

        <div v-if="historyPosts.length === 0" class="bg-white rounded-2xl border border-surface-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <p class="text-sm text-surface-400">Nenhum post no histórico até o momento.</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="post in historyPosts"
            :key="post.id"
            class="bg-white rounded-xl border border-surface-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-surface-300 transition"
            @click="openPostDetailModal(post)"
          >
            <div>
              <div class="flex items-center gap-2.5 mb-1">
                <h4 class="font-semibold text-surface-800 text-sm">{{ post.title }}</h4>
                <StatusBadge :status="post.status" />
              </div>
              <p class="text-xs text-surface-400 line-clamp-1 max-w-xl">{{ post.content }}</p>
            </div>
            <div class="text-right">
              <span class="text-xs text-surface-400 block">{{ formatDate(post.created_at) }}</span>
              <span class="text-[11px] text-brand-600 font-medium">Ver detalhes →</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Vínculo com Agência -->
      <div v-else-if="currentSection === 'agency'" class="fade-in space-y-6 max-w-2xl">
        <div>
          <h1 class="text-2xl font-bold text-surface-800">Vínculo com Agência</h1>
          <p class="text-sm text-surface-400">Informações da agência responsável pelo gerenciamento do seu conteúdo</p>
        </div>

        <div v-if="linkedAgency" class="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Building2 class="w-6 h-6" />
            </div>
            <div>
              <span class="text-xs text-success-600 font-semibold tracking-wider uppercase block">Agência Vinculada</span>
              <h3 class="text-lg font-bold text-surface-800">{{ linkedAgency.user.name }}</h3>
              <p class="text-xs text-surface-400">{{ linkedAgency.user.email }}</p>
            </div>
          </div>

          <div class="bg-surface-50 p-4 rounded-xl border border-surface-200 text-xs space-y-1">
            <p><strong class="text-surface-700">CNPJ:</strong> {{ linkedAgency.cnpj }}</p>
            <p><strong class="text-surface-700">Status:</strong> Conexão Ativa</p>
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

        <div v-else class="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs space-y-4">
          <div class="w-10 h-10 rounded-xl bg-surface-100 text-surface-500 flex items-center justify-center">
            <Key class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-surface-800">Conectar a uma Agência</h3>
            <p class="text-xs text-surface-500 mt-1">
              Insira o token de vínculo gerado pela agência contratada para permitir a gestão dos seus posts.
            </p>
          </div>

          <div class="space-y-3 pt-2">
            <input
              v-model="tokenInput"
              type="text"
              placeholder="Ex: TKN-12345678"
              class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm font-mono"
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
          <h1 class="text-2xl font-bold text-surface-800">Meu Perfil</h1>
          <p class="text-sm text-surface-400">Informações cadastrais e configurações de segurança</p>
        </div>

        <div class="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-500 mb-1">Nome da Empresa / Cliente</label>
              <input
                v-model="profileName"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 outline-none text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-500 mb-1">E-mail Cadastrado</label>
              <input
                :value="user?.email"
                disabled
                type="email"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-200 bg-surface-50 text-surface-400 text-sm cursor-not-allowed"
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

          <div class="pt-6 border-t border-surface-200 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-semibold text-surface-800">Segurança da Senha</h4>
              <p class="text-xs text-surface-400">Altere sua senha de acesso ao portal</p>
            </div>
            <button
              @click="openChangePasswordModal"
              class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
            >
              Alterar Senha
            </button>
          </div>

          <div class="pt-6 border-t border-surface-200 flex items-center justify-between">
            <div>
              <h4 class="text-xs font-medium text-surface-500">Desativação da conta</h4>
              <p class="text-[11px] text-surface-400">Você perderá o acesso até solicitar restauração</p>
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
    <ChangePasswordModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { agencyApi } from '@/api/agency'
import { meApi } from '@/api/me'
import type { Agency } from '@/types/api'
import StatusBadge from '@/components/StatusBadge.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import ApprovalModal from '@/components/ApprovalModal.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal.vue'
import {
  CheckCircle2,
  FileText,
  History,
  Building2,
  User,
  LogOut,
  RefreshCw,
  Eye,
  Check,
  X,
  Key,
  Link as LinkIcon,
  Unlink
} from '@lucide/vue'

const { user, logout, fetchProfile } = useAuth()
const { posts, isLoading, fetchPosts } = usePosts()
const { openApprovalModal, openPostDetailModal, openChangePasswordModal } = useModals()
const { showToast } = useToast()

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
  if (!confirm('Deseja realmente se desvincular desta agência?')) return
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
  if (!confirm('Tem certeza absoluta que deseja desativar sua conta? Você precisará de restauração para acessá-la novamente.')) return
  try {
    await meApi.deactivateAccount()
    showToast('Conta desativada com sucesso.', 'info')
    logout()
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
