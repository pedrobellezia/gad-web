<template>
  <div class="h-full bg-surface-50 text-surface-800 antialiased flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
      <router-link to="/" class="px-5 py-4 border-b border-surface-200 flex items-center hover:bg-surface-50 transition group">
        <img src="/gad.png" alt="GAD - Gestor de Agências Digitais" class="h-10 w-auto max-w-[180px] object-contain transition-transform group-hover:scale-102" />
      </router-link>

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
    <main class="flex-1 overflow-auto p-8 bg-surface-50">
      <!-- Section: Overview -->
      <div v-if="currentSection === 'overview'" class="fade-in">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-surface-800">Painel Geral da Agência</h1>
            <p class="text-sm text-surface-400">Acompanhamento de postagens, membros e mídias</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-card hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-surface-400 uppercase tracking-wider">Total de Posts</span>
              <div class="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center">
                <FileText class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-surface-800">{{ posts.length }}</p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-card hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-amber-600 uppercase tracking-wider">Em Revisão</span>
              <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <Clock class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-amber-700">{{ countStatus('review') }}</p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-card hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Aprovados</span>
              <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-emerald-700">{{ countStatus('approved') }}</p>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-card hover:shadow-card-hover transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-surface-500 uppercase tracking-wider">Membros</span>
              <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <Users class="w-4 h-4" />
              </div>
            </div>
            <p class="text-3xl font-bold text-surface-800">{{ clients.length + writers.length + designers.length }}</p>
          </div>
        </div>
      </div>

      <!-- Section: Posts -->
      <div v-if="currentSection === 'posts' || currentSection === 'overview'" class="fade-in mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-surface-800">Lista de Publicações</h2>
          <div class="flex gap-1.5 bg-white border border-surface-200 p-1 rounded-lg text-xs">
            <button
              v-for="st in filterOptions"
              :key="st.value"
              @click="setFilter(st.value)"
              :class="['px-2.5 py-1 rounded-md font-medium transition', activeFilter === st.value ? 'bg-brand-500 text-white' : 'text-surface-500 hover:text-surface-700']"
            >
              {{ st.label }}
            </button>
          </div>
        </div>

        <div v-if="filteredPosts.length === 0" class="bg-white rounded-xl p-8 border border-surface-200 text-center text-sm text-surface-400">
          Nenhum post encontrado com o filtro selecionado.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="post in filteredPosts"
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
                <span>{{ post.medias.length }} mídia(s)</span>
                <span>{{ post.comments.length }} comentário(s)</span>
                <span>Atualizado em {{ formatDate(post.updated_at) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0 ml-4">
              <!-- Reassign Writer -->
              <button
                v-if="post.status !== 'denied' && post.status !== 'published'"
                @click="promptChangeWriter(post)"
                class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium"
                title="Trocar Redator"
              >
                Trocar Redator
              </button>

              <!-- Publish post if approved -->
              <button
                v-if="post.status === 'approved'"
                @click="publishPost(post)"
                class="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Publicar Post
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
                @click="handleDeletePost(post.id)"
                class="p-2 text-surface-400 hover:text-danger rounded-lg hover:bg-red-50 transition"
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
            <h2 class="text-xl font-bold text-surface-800">Biblioteca de Mídias da Agência</h2>
            <p class="text-sm text-surface-400">Gerenciamento de mídias enviadas pelos designers</p>
          </div>
        </div>

        <div v-if="medias.length === 0" class="bg-white rounded-xl p-8 border border-surface-200 text-center text-sm text-surface-400">
          Nenhuma mídia enviada ainda para esta agência.
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="m in medias"
            :key="m.id"
            class="bg-white rounded-xl border border-surface-200 overflow-hidden flex flex-col shadow-xs"
          >
            <div class="h-36 bg-surface-100 flex items-center justify-center overflow-hidden relative">
              <img
                v-if="m.media_type === 'image'"
                :src="getMediaFileUrl(m.id)"
                :alt="m.alias"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex flex-col items-center justify-center text-surface-500">
                <Video class="w-8 h-8 mb-1" />
                <span class="text-xs">Vídeo MP4</span>
              </div>
            </div>

            <div class="p-3 flex-1 flex flex-col justify-between">
              <div>
                <p class="text-xs font-semibold text-surface-700 truncate" :title="m.alias">{{ m.alias }}</p>
                <p class="text-[11px] text-surface-400 font-mono">{{ (m.size_bytes / 1024).toFixed(1) }} KB</p>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-surface-100 mt-2">
                <button
                  @click="promptRenameMedia(m)"
                  class="text-[11px] text-brand-600 hover:underline font-medium"
                >
                  Renomear
                </button>
                <button
                  @click="promptAssignDesigner(m)"
                  class="text-[11px] text-surface-500 hover:underline"
                >
                  Designer
                </button>
                <button
                  @click="handleDeleteMedia(m.id)"
                  class="text-surface-400 hover:text-danger p-1"
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
            <h2 class="text-xl font-bold text-surface-800">Tokens de Convite</h2>
            <p class="text-sm text-surface-400">Tokens descartáveis para vincular clientes, redatores e designers</p>
          </div>
          <button @click="promptGenerateTokens" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
            <Plus class="w-4 h-4" />Gerar Tokens
          </button>
        </div>

        <div v-if="tokens.length === 0" class="bg-white rounded-xl p-8 border border-surface-200 text-center text-sm text-surface-400">
          Nenhum token ativo no momento. Clique acima para gerar.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="t in tokens"
            :key="t.token"
            class="bg-white p-4 rounded-xl border border-surface-200 flex items-center justify-between shadow-xs"
          >
            <div>
              <code class="text-sm font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{{ t.token }}</code>
              <p class="text-[11px] text-surface-400 mt-1">Token de uso único</p>
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
            <h2 class="text-xl font-bold text-surface-800">Membros da Agência</h2>
            <p class="text-sm text-surface-400">Clientes, Redatores e Designers vinculados</p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Clients -->
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-surface-500 mb-3">Clientes ({{ clients.length }})</h3>
            <div v-if="clients.length === 0" class="text-xs text-surface-400 p-4 bg-white rounded-xl border border-surface-200">
              Nenhum cliente vinculado.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div v-for="c in clients" :key="c.user.id" class="p-4 bg-white border border-surface-200 rounded-xl flex items-center justify-between shadow-xs">
                <div>
                  <p class="text-sm font-semibold text-surface-800">{{ c.user.name }}</p>
                  <p class="text-xs text-surface-400">{{ c.user.email }}</p>
                </div>
                <button @click="handleUnlink(c.user.id)" class="btn-danger px-2.5 py-1 rounded text-xs font-medium">Desvincular</button>
              </div>
            </div>
          </div>

          <!-- Writers -->
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-surface-500 mb-3">Redatores ({{ writers.length }})</h3>
            <div v-if="writers.length === 0" class="text-xs text-surface-400 p-4 bg-white rounded-xl border border-surface-200">
              Nenhum redator vinculado.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div v-for="w in writers" :key="w.user.id" class="p-4 bg-white border border-surface-200 rounded-xl flex items-center justify-between shadow-xs">
                <div>
                  <p class="text-sm font-semibold text-surface-800">{{ w.user.name }}</p>
                  <p class="text-xs text-surface-400">{{ w.user.email }}</p>
                </div>
                <button @click="handleUnlink(w.user.id)" class="btn-danger px-2.5 py-1 rounded text-xs font-medium">Desvincular</button>
              </div>
            </div>
          </div>

          <!-- Designers -->
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-surface-500 mb-3">Designers ({{ designers.length }})</h3>
            <div v-if="designers.length === 0" class="text-xs text-surface-400 p-4 bg-white rounded-xl border border-surface-200">
              Nenhum designer vinculado.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div v-for="d in designers" :key="d.user.id" class="p-4 bg-white border border-surface-200 rounded-xl flex items-center justify-between shadow-xs">
                <div>
                  <p class="text-sm font-semibold text-surface-800">{{ d.user.name }}</p>
                  <p class="text-xs text-surface-400">{{ d.user.email }}</p>
                </div>
                <button @click="handleUnlink(d.user.id)" class="btn-danger px-2.5 py-1 rounded text-xs font-medium">Desvincular</button>
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
import { useMedia } from '@/composables/useMedia'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { getMediaFileUrl } from '@/api/client'
import type { PostItem, MediaItem } from '@/types/api'
import {
  PenTool, LayoutDashboard, FileText, Image, Key, Users, LogOut,
  Plus, Edit, Trash2, Video, Clock, CheckCircle2
} from '@lucide/vue'

const currentSection = ref('overview')

const filterOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'draft', label: 'Rascunho' },
  { value: 'review', label: 'Revisão' },
  { value: 'approved', label: 'Aprovado' },
  { value: 'denied', label: 'Reprovado' },
  { value: 'published', label: 'Publicado' }
]

const { logout, fetchProfile } = useAuth()
const { posts, filteredPosts, activeFilter, setFilter, fetchPosts, updateStatus, updateWriter, deletePost } = usePosts()
const { medias, fetchMedias, updateAlias, updateDesigner, deleteMedia } = useMedia()
const { tokens, clients, writers, designers, fetchTokens, createTokens, deleteToken, fetchAllMembers, unlinkMember } = useAgencyMembers()
const { openEditPostModal, openPostDetailModal } = useModals()
const { showToast } = useToast()

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
  if (!confirm(`Confirmar publicação do post "${post.title}"? Esta ação é definitiva.`)) return
  await updateStatus(post.id, 'published', post.version)
}

async function promptChangeWriter(post: PostItem) {
  const options = writers.value.map(w => `${w.user.id}: ${w.user.name}`).join('\n')
  const newWriterId = prompt(`Informe o ID do novo redator (ou deixe vazio para remover):\n\n${options}`, post.writer_id || '')
  if (newWriterId === null) return
  await updateWriter(post.id, newWriterId.trim() || null, post.version)
}

async function handleDeletePost(postId: string) {
  if (!confirm('Deseja realmente excluir este post?')) return
  await deletePost(postId)
}

async function promptRenameMedia(media: MediaItem) {
  const newAlias = prompt('Informe o novo alias da mídia:', media.alias)
  if (!newAlias || newAlias.trim() === media.alias) return
  await updateAlias(media.id, newAlias.trim())
}

async function promptAssignDesigner(media: MediaItem) {
  const options = designers.value.map(d => `${d.user.id}: ${d.user.name}`).join('\n')
  const newId = prompt(`Informe o ID do designer para esta mídia (ou vazio para desatribuir):\n\n${options}`, media.designer_id || '')
  if (newId === null) return
  await updateDesigner(media.id, newId.trim() || null)
}

async function handleDeleteMedia(mediaId: string) {
  if (!confirm('Deseja realmente excluir esta mídia da biblioteca?')) return
  await deleteMedia(mediaId)
}

async function promptGenerateTokens() {
  const qtyStr = prompt('Quantos tokens deseja gerar? (1 a 100)', '4')
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
  if (!confirm('Deseja excluir este token de convite?')) return
  await deleteToken(tokenStr)
}

async function handleUnlink(userId: string) {
  if (!confirm('Deseja realmente desvincular este membro da agência?')) return
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
