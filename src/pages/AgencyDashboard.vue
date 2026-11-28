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
          @click="currentSection = 'overview'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'overview' }]"
        >
          <LayoutDashboard class="w-4 h-4" />Visão Geral
        </button>
        <button
          @click="currentSection = 'medias'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'medias' }]"
        >
          <Image class="w-4 h-4" />Biblioteca de Mídias
        </button>
        <button
          @click="currentSection = 'tokens'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'tokens' }]"
        >
          <Key class="w-4 h-4" />Tokens de Convite
        </button>
        <button
          @click="currentSection = 'members'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'members' }]"
        >
          <Users class="w-4 h-4" />Membros da Equipe
        </button>
        <button
          @click="currentSection = 'activity'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'activity' }]"
        >
          <Activity class="w-4 h-4" />Atividades
        </button>
      </nav>

      <SidebarUserFooter />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-8 bg-surface-100/70 dark:bg-surface-900 transition-colors duration-200">
      <!-- Section: Overview -->
      <div v-if="currentSection === 'overview'" class="fade-in">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Painel Geral da Agência</h1>
            <p class="text-sm text-surface-500 dark:text-surface-400">Acompanhamento de postagens, membros e mídias</p>
          </div>
        </div>

        <PostStatusSummary
          class="mb-8"
          :counts="statusCounts"
          :active="activeFilter === 'all' ? null : activeFilter"
          @select="selectStatus"
        />
      </div>

      <!-- Section: Posts -->
      <div v-if="currentSection === 'overview'" class="fade-in mb-8">
        <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 class="text-lg font-bold text-surface-900 dark:text-surface-50">Lista de Publicações</h2>
          <div class="flex flex-wrap gap-1.5 bg-surface-50 dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700/80 p-1 rounded-lg text-xs">
            <button
              v-for="st in filterOptions"
              :key="st.value"
              @click="setFilter(st.value)"
              :class="['px-2.5 py-1 rounded-md font-medium transition', activeFilter === st.value ? 'bg-brand-500 text-white' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100']"
            >
              {{ st.label }}
            </button>
          </div>
        </div>

        <div v-if="filteredPosts.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
          Nenhum post encontrado com o filtro selecionado.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" @open="openPostDetailModal">
            <template v-if="post.status !== 'published'" #actions>
              <span v-if="post.status === 'denied'" class="flex-1 text-xs text-surface-500 dark:text-surface-400">Reprovado pelo cliente</span>
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
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 dark:bg-mint-600 dark:hover:bg-mint-700 text-white transition shadow-xs"
              >
                Publicar
              </button>
              <span v-else class="flex-1 text-xs text-surface-500 dark:text-surface-400">Aguardando o cliente</span>
              <button
                @click="handleDeletePost(post.id)"
                class="p-2 text-surface-500 dark:text-surface-400 hover:text-danger dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/15 transition"
                title="Excluir post"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </template>
          </PostCard>
        </div>
      </div>

      <!-- Section: Medias -->
      <div v-if="currentSection === 'medias'" class="fade-in mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-surface-900 dark:text-surface-50">Biblioteca de Mídias da Agência</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">Gerenciamento de mídias enviadas pelos designers</p>
          </div>
        </div>

        <div v-if="medias.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
          Nenhuma mídia enviada ainda para esta agência.
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="m in medias"
            :key="m.id"
            class="bg-surface-50 dark:bg-surface-800/85 rounded-xl border border-surface-200 dark:border-surface-700/80 overflow-hidden flex flex-col shadow-xs dark:shadow-card-dark"
          >
            <button
              type="button"
              @click="openMediaViewer(m)"
              class="h-36 w-full bg-surface-200/70 dark:bg-surface-900 flex items-center justify-center overflow-hidden relative cursor-zoom-in"
              :title="m.media_type === 'video' ? 'Assistir vídeo original' : 'Ver imagem original'"
            >
              <MediaImage :media-id="m.id" :alt="m.alias" :video="m.media_type === 'video'" />
            </button>

            <div class="p-3 flex-1 flex flex-col justify-between">
              <div>
                <p class="text-xs font-semibold text-surface-800 dark:text-surface-100 truncate" :title="m.alias">{{ m.alias }}</p>
                <p class="text-[11px] text-surface-500 dark:text-surface-400 font-mono">{{ (m.size_bytes / 1024).toFixed(1) }} KB</p>
                <p class="text-[11px] text-surface-500 dark:text-surface-400 truncate">Designer: {{ memberName(designers, m.designer_id) }}</p>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-surface-200/80 dark:border-surface-700/80 mt-2">
                <button
                  @click="promptRenameMedia(m)"
                  class="text-[11px] text-brand-600 dark:text-brand-400 hover:underline font-medium"
                >
                  Renomear
                </button>
                <button
                  @click="openAssignDesigner(m)"
                  class="text-[11px] text-surface-600 dark:text-surface-300 hover:underline"
                >
                  Designer
                </button>
                <button
                  @click="handleDeleteMedia(m.id)"
                  class="text-surface-400 hover:text-danger dark:hover:text-red-400 p-1"
                  title="Excluir mídia"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Tokens -->
      <div v-if="currentSection === 'tokens'" class="fade-in mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-surface-900 dark:text-surface-50">Tokens de Convite</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">Tokens de uso único para vincular clientes, redatores e designers</p>
          </div>
          <button @click="handleGenerateToken" :disabled="isGeneratingToken" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 disabled:opacity-50">
            <Plus class="w-4 h-4" />Gerar token
          </button>
        </div>

        <div v-if="tokens.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
          Nenhum token ativo no momento. Clique acima para gerar.
        </div>

        <div v-else class="flex flex-wrap gap-2">
          <div
            v-for="t in tokens"
            :key="t.token"
            :class="[
              'inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-lg border bg-surface-50 dark:bg-surface-800/85 shadow-xs dark:shadow-card-dark transition',
              t.token === lastToken ? 'border-brand-400 dark:border-brand-500/60 ring-2 ring-brand-200 dark:ring-brand-500/25' : 'border-surface-200 dark:border-surface-700/80'
            ]"
          >
            <code class="text-sm font-mono font-bold text-brand-600 dark:text-brand-300 mr-1">{{ t.token }}</code>
            <button @click="copyToken(t.token)" class="p-1.5 rounded-md text-surface-500 hover:text-surface-800 hover:bg-surface-200/70 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/70 transition" title="Copiar">
              <Copy class="w-3.5 h-3.5" />
            </button>
            <button @click="handleDeleteToken(t.token)" class="p-1.5 rounded-md text-surface-500 hover:text-red-600 hover:bg-red-50 dark:text-surface-400 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition" title="Excluir">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Section: Members -->
      <div v-if="currentSection === 'members'" class="fade-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-surface-900 dark:text-surface-50">Membros da Agência</h2>
            <p class="text-sm text-surface-500 dark:text-surface-400">Clientes, Redatores e Designers vinculados</p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Clients -->
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300 mb-3">Clientes ({{ clients.length }})</h3>
            <div v-if="clients.length === 0" class="text-xs text-surface-500 dark:text-surface-400 p-4 bg-surface-50 dark:bg-surface-800/85 rounded-xl border border-surface-200 dark:border-surface-700/80">
              Nenhum cliente vinculado.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div v-for="c in clients" :key="c.user.id" class="p-4 bg-surface-50 dark:bg-surface-800/85 border border-surface-200 dark:border-surface-700/80 rounded-xl flex items-center justify-between shadow-xs dark:shadow-card-dark">
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-surface-900 dark:text-surface-100 truncate">{{ c.user.name }}</p>
                </div>
                <button @click="handleUnlink(c.user.id)" class="btn-danger px-2.5 py-1 rounded text-xs font-medium shrink-0 ml-2">Desvincular</button>
              </div>
            </div>
          </div>

          <!-- Writers -->
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300 mb-3">Redatores ({{ writers.length }})</h3>
            <div v-if="writers.length === 0" class="text-xs text-surface-500 dark:text-surface-400 p-4 bg-surface-50 dark:bg-surface-800/85 rounded-xl border border-surface-200 dark:border-surface-700/80">
              Nenhum redator vinculado.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div v-for="w in writers" :key="w.user.id" class="p-4 bg-surface-50 dark:bg-surface-800/85 border border-surface-200 dark:border-surface-700/80 rounded-xl flex items-center justify-between shadow-xs dark:shadow-card-dark">
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-surface-900 dark:text-surface-100 truncate">{{ w.user.name }}</p>
                </div>
                <button @click="handleUnlink(w.user.id)" class="btn-danger px-2.5 py-1 rounded text-xs font-medium shrink-0 ml-2">Desvincular</button>
              </div>
            </div>
          </div>

          <!-- Designers -->
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-surface-600 dark:text-surface-300 mb-3">Designers ({{ designers.length }})</h3>
            <div v-if="designers.length === 0" class="text-xs text-surface-500 dark:text-surface-400 p-4 bg-surface-50 dark:bg-surface-800/85 rounded-xl border border-surface-200 dark:border-surface-700/80">
              Nenhum designer vinculado.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div v-for="d in designers" :key="d.user.id" class="p-4 bg-surface-50 dark:bg-surface-800/85 border border-surface-200 dark:border-surface-700/80 rounded-xl flex items-center justify-between shadow-xs dark:shadow-card-dark">
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-surface-900 dark:text-surface-100 truncate">{{ d.user.name }}</p>
                </div>
                <button @click="handleUnlink(d.user.id)" class="btn-danger px-2.5 py-1 rounded text-xs font-medium shrink-0 ml-2">Desvincular</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Activity -->
      <AgencyActivityFeed v-if="currentSection === 'activity'" class="fade-in" />
    </main>

    <!-- Modals -->
    <CreatePostModal />
    <EditPostModal />
    <PostDetailModal @change-writer="openAssignWriter" />
    <AssignMemberModal
      :open="assign.open"
      :title="assign.title"
      :label="assign.label"
      :empty-label="assign.emptyLabel"
      :no-options-hint="assign.noOptionsHint"
      :options="assign.options"
      :current-id="assign.currentId"
      :on-confirm="assign.onConfirm"
      @close="assign.open = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import { ref, reactive, computed, onMounted } from 'vue'
import PostCard from '@/components/PostCard.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import EditPostModal from '@/components/EditPostModal.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import AssignMemberModal, { type MemberOption } from '@/components/AssignMemberModal.vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useAutoRefresh } from '@/composables/useAutoRefresh'
import { useMedia } from '@/composables/useMedia'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { useTheme } from '@/composables/useTheme'
import MediaImage from '@/components/MediaImage.vue'
import AgencyActivityFeed from '@/components/AgencyActivityFeed.vue'
import { useMediaViewer } from '@/composables/useMediaViewer'
import type { PostItem, MediaItem, PostStatus } from '@/types/api'
import PostStatusSummary from '@/components/PostStatusSummary.vue'
import { countByStatus } from '@/utils/postStatus'
import {
  LayoutDashboard, Image, Key, Users, Activity,
  Plus, Edit, Trash2, Copy, Sun, Moon
} from '@lucide/vue'

const { confirmDialog, promptDialog } = useDialog()
const currentSection = ref('overview')

const filterOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'draft', label: 'Rascunho' },
  { value: 'review', label: 'Revisão' },
  { value: 'approved', label: 'Aprovado' },
  { value: 'denied', label: 'Reprovado' },
  { value: 'published', label: 'Publicado' }
]

const { fetchProfile } = useAuth()
const { posts, filteredPosts, activeFilter, setFilter, fetchPosts, refreshPostsSilently, updateStatus, updateWriter, deletePost } = usePosts()
useAutoRefresh(() => refreshPostsSilently())
const { openMediaViewer } = useMediaViewer()
const { medias, fetchMedias, updateAlias, updateDesigner, deleteMedia } = useMedia()
const { tokens, clients, writers, designers, fetchTokens, createTokens, deleteToken, fetchAllMembers, unlinkMember } = useAgencyMembers()
const { openPostDetailModal } = useModals()
const { showToast } = useToast()
const { isDark, toggleTheme } = useTheme()

onMounted(async () => {
  await Promise.all([
    fetchProfile().catch(() => {}),
    fetchPosts().catch(() => {}),
    fetchMedias().catch(() => {}),
    fetchTokens().catch(() => {}),
    fetchAllMembers().catch(() => {})
  ])
})

const statusCounts = computed(() => countByStatus(posts.value))

// Clicar no card do status filtra a lista; clicar de novo volta para todos
function selectStatus(status: PostStatus) {
  setFilter(activeFilter.value === status ? 'all' : status)
}

async function sendToReview(post: PostItem) {
  if (post.medias.length === 0) {
    showToast('O post precisa de pelo menos 1 mídia anexada para entrar em revisão!', 'error')
    return
  }
  await updateStatus(post.id, 'review', post.version)
}

async function publishPost(post: PostItem) {
  if (!(await confirmDialog({ title: 'Publicar post', message: `Confirmar publicação do post "${post.title}"? Esta ação é definitiva.`, confirmLabel: 'Publicar' }))) return
  await updateStatus(post.id, 'published', post.version)
}

const assign = reactive({
  open: false,
  title: '',
  label: '',
  emptyLabel: '',
  noOptionsHint: '',
  options: [] as MemberOption[],
  currentId: null as string | null,
  onConfirm: (async () => {}) as (id: string | null) => Promise<unknown>
})

type Member = { user: { id: string; name: string } }

function toOptions(members: Member[]): MemberOption[] {
  return members.map(m => ({ id: m.user.id, name: m.user.name }))
}

function memberName(members: Member[], id: string | null): string {
  if (!id) return 'Nenhum'
  return members.find(m => m.user.id === id)?.user.name ?? 'Desvinculado'
}

function openAssignWriter(post: PostItem) {
  Object.assign(assign, {
    open: true,
    title: 'Trocar Redator',
    label: `Redator responsável por "${post.title}"`,
    emptyLabel: 'Nenhum redator',
    noOptionsHint: 'Nenhum redator vinculado à agência ainda.',
    options: toOptions(writers.value),
    currentId: post.writer_id,
    onConfirm: (id: string | null) => updateWriter(post.id, id, post.version)
  })
}

async function handleDeletePost(postId: string) {
  if (!(await confirmDialog({ title: 'Excluir post', message: 'Deseja realmente excluir este post?', confirmLabel: 'Excluir', danger: true }))) return
  await deletePost(postId)
}

async function promptRenameMedia(media: MediaItem) {
  const newAlias = await promptDialog({ title: 'Renomear mídia', label: 'Novo alias da mídia', defaultValue: media.alias, confirmLabel: 'Renomear' })
  if (!newAlias || newAlias.trim() === media.alias) return
  await updateAlias(media.id, newAlias.trim())
}

function openAssignDesigner(media: MediaItem) {
  Object.assign(assign, {
    open: true,
    title: 'Atribuir Designer',
    label: `Designer responsável por "${media.alias}"`,
    emptyLabel: 'Nenhum designer',
    noOptionsHint: 'Nenhum designer vinculado à agência ainda.',
    options: toOptions(designers.value),
    currentId: media.designer_id,
    onConfirm: (id: string | null) => updateDesigner(media.id, id)
  })
}

async function handleDeleteMedia(mediaId: string) {
  if (!(await confirmDialog({ title: 'Excluir mídia', message: 'Deseja realmente excluir esta mídia da biblioteca?', confirmLabel: 'Excluir', danger: true }))) return
  await deleteMedia(mediaId)
}

// Gera um token na hora e já copia, para colar direto no convite
const isGeneratingToken = ref(false)
const lastToken = ref<string | null>(null)

async function handleGenerateToken() {
  isGeneratingToken.value = true
  try {
    const [created] = await createTokens(1)
    if (!created) return
    lastToken.value = created
    const copied = await writeClipboard(created)
    showToast(copied ? 'Token gerado e copiado!' : 'Token gerado!', 'success')
  } catch {
    // erro já exibido via toast pelo composable
  } finally {
    isGeneratingToken.value = false
  }
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

async function copyToken(tokenStr: string) {
  const copied = await writeClipboard(tokenStr)
  showToast(copied ? 'Token copiado!' : 'Não foi possível copiar o token', copied ? 'success' : 'error')
}

async function handleDeleteToken(tokenStr: string) {
  if (!(await confirmDialog({ title: 'Excluir token', message: 'Deseja excluir este token de convite?', confirmLabel: 'Excluir', danger: true }))) return
  await deleteToken(tokenStr)
}

async function handleUnlink(userId: string) {
  if (!(await confirmDialog({ title: 'Desvincular membro', message: 'Deseja realmente desvincular este membro da agência?', confirmLabel: 'Desvincular', danger: true }))) return
  await unlinkMember(userId)
}
</script>