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
          @click="currentSection = 'overview'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'overview' }]"
        >
          <LayoutDashboard class="w-4 h-4" />Visão Geral
        </button>
        <button
          @click="currentSection = 'posts'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition', { active: currentSection === 'posts' }]"
        >
          <FileText class="w-4 h-4" />Todos os Posts
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

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-surface-50 dark:bg-surface-800/85 p-5 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">Total de Posts</span>
              <div class="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/25 flex items-center justify-center">
                <FileText class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-surface-900 dark:text-surface-50">{{ posts.length }}</p>
          </div>

          <div class="bg-surface-50 dark:bg-surface-800/85 p-5 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-amber-600 dark:text-amber-300 uppercase tracking-wider">Em Revisão</span>
              <div class="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-500/25 flex items-center justify-center">
                <Clock class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-amber-700 dark:text-amber-300">{{ countStatus('review') }}</p>
          </div>

          <div class="bg-surface-50 dark:bg-surface-800/85 p-5 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-emerald-600 dark:text-mint-400 uppercase tracking-wider">Aprovados</span>
              <div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-mint-500/15 text-emerald-600 dark:text-mint-400 border border-emerald-200 dark:border-mint-500/25 flex items-center justify-center">
                <CheckCircle2 class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-emerald-700 dark:text-mint-300">{{ countStatus('approved') }}</p>
          </div>

          <div class="bg-surface-50 dark:bg-surface-800/85 p-5 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">Membros</span>
              <div class="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500/25 flex items-center justify-center">
                <Users class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-surface-900 dark:text-surface-50">{{ clients.length + writers.length + designers.length }}</p>
          </div>
        </div>
      </div>

      <!-- Section: Posts -->
      <div v-if="currentSection === 'posts' || currentSection === 'overview'" class="fade-in mb-8">
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

        <div v-else class="space-y-3">
          <div
            v-for="post in filteredPosts"
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
                <span>Cliente: {{ memberName(clients, post.client_id) }}</span>
                <span>Redator: {{ memberName(writers, post.writer_id) }}</span>
                <span>{{ post.medias.length }} mídia(s)</span>
                <span>{{ post.comments.length }} comentário(s)</span>
                <span>Atualizado em {{ formatDate(post.updated_at) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0 ml-4">
              <button
                v-if="post.status !== 'denied' && post.status !== 'published'"
                @click="openAssignWriter(post)"
                class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium"
                title="Trocar Redator"
              >
                Trocar Redator
              </button>

              <button
                v-if="post.status === 'approved'"
                @click="publishPost(post)"
                class="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 dark:bg-mint-600 dark:hover:bg-mint-700 text-white transition"
              >
                Publicar Post
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
                @click="handleDeletePost(post.id)"
                class="p-2 text-surface-500 dark:text-surface-400 hover:text-danger dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/15 transition"
                title="Excluir post"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
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
            <div class="h-36 bg-surface-200/70 dark:bg-surface-900 flex items-center justify-center overflow-hidden relative">
              <MediaImage
                v-if="m.media_type === 'image'"
                :media-id="m.id"
                :alt="m.alias"
              />
              <div v-else class="flex flex-col items-center justify-center text-surface-500 dark:text-surface-400">
                <Video class="w-8 h-8 mb-1" />
                <span class="text-xs">Vídeo MP4</span>
              </div>
            </div>

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
            <p class="text-sm text-surface-500 dark:text-surface-400">Tokens descartáveis para vincular clientes, redatores e designers</p>
          </div>
          <button @click="promptGenerateTokens" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
            <Plus class="w-4 h-4" />Gerar Tokens
          </button>
        </div>

        <div v-if="tokens.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-xl p-8 border border-surface-200 dark:border-surface-700/80 text-center text-sm text-surface-500 dark:text-surface-400">
          Nenhum token ativo no momento. Clique acima para gerar.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="t in tokens"
            :key="t.token"
            class="bg-surface-50 dark:bg-surface-800/85 p-4 rounded-xl border border-surface-200 dark:border-surface-700/80 flex items-center justify-between shadow-xs dark:shadow-card-dark"
          >
            <div>
              <code class="text-sm font-mono font-bold text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-500/15 px-2 py-0.5 rounded">{{ t.token }}</code>
              <p class="text-[11px] text-surface-500 dark:text-surface-400 mt-1">Token de uso único</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="copyToken(t.token)" class="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium">Copiar</button>
              <button @click="handleDeleteToken(t.token)" class="btn-danger px-2.5 py-1.5 rounded-lg text-xs font-medium">Excluir</button>
            </div>
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
                  <p class="text-xs text-surface-500 dark:text-surface-400 truncate">{{ c.user.email }}</p>
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
                  <p class="text-xs text-surface-500 dark:text-surface-400 truncate">{{ w.user.email }}</p>
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
                  <p class="text-xs text-surface-500 dark:text-surface-400 truncate">{{ d.user.email }}</p>
                </div>
                <button @click="handleUnlink(d.user.id)" class="btn-danger px-2.5 py-1 rounded text-xs font-medium shrink-0 ml-2">Desvincular</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <CreatePostModal />
    <EditPostModal />
    <PostDetailModal />
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
import { ref, reactive, onMounted } from 'vue'
import StatusBadge from '@/components/StatusBadge.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import EditPostModal from '@/components/EditPostModal.vue'
import PostDetailModal from '@/components/PostDetailModal.vue'
import AssignMemberModal, { type MemberOption } from '@/components/AssignMemberModal.vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useMedia } from '@/composables/useMedia'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { useTheme } from '@/composables/useTheme'
import MediaImage from '@/components/MediaImage.vue'
import type { PostItem, MediaItem } from '@/types/api'
import {
  LayoutDashboard, FileText, Image, Key, Users,
  Plus, Edit, Trash2, Video, Clock, CheckCircle2, Sun, Moon
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
const { posts, filteredPosts, activeFilter, setFilter, fetchPosts, updateStatus, updateWriter, deletePost } = usePosts()
const { medias, fetchMedias, updateAlias, updateDesigner, deleteMedia } = useMedia()
const { tokens, clients, writers, designers, fetchTokens, createTokens, deleteToken, fetchAllMembers, unlinkMember } = useAgencyMembers()
const { openEditPostModal, openPostDetailModal } = useModals()
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

function countStatus(st: string): number {
  return posts.value.filter(p => p.status === st).length
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

type Member = { user: { id: string; name: string; email: string } }

function toOptions(members: Member[]): MemberOption[] {
  return members.map(m => ({ id: m.user.id, name: m.user.name, email: m.user.email }))
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

async function promptGenerateTokens() {
  const qtyStr = await promptDialog({ title: 'Gerar tokens de convite', label: 'Quantidade de tokens (1 a 100)', defaultValue: '4', inputType: 'number', min: 1, max: 100, confirmLabel: 'Gerar' })
  if (!qtyStr) return
  const qty = parseInt(qtyStr, 10)
  if (isNaN(qty) || qty < 1 || qty > 100) {
    showToast('Quantidade inválida (deve ser entre 1 e 100)', 'error')
    return
  }
  await createTokens(qty)
}

function copyToken(tokenStr: string) {
  navigator.clipboard.writeText(tokenStr)
  showToast('Token copiado para a área de transferência!', 'success')
}

async function handleDeleteToken(tokenStr: string) {
  if (!(await confirmDialog({ title: 'Excluir token', message: 'Deseja excluir este token de convite?', confirmLabel: 'Excluir', danger: true }))) return
  await deleteToken(tokenStr)
}

async function handleUnlink(userId: string) {
  if (!(await confirmDialog({ title: 'Desvincular membro', message: 'Deseja realmente desvincular este membro da agência?', confirmLabel: 'Desvincular', danger: true }))) return
  await unlinkMember(userId)
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR')
  } catch {
    return iso
  }
}
</script>