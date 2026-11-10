<template>
  <div v-if="postDetailModalOpen && selectedPostForDetail" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-white rounded-2xl w-full max-w-3xl fade-in shadow-2xl my-8 border border-surface-200 overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="p-6 border-b border-surface-200 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <h3 class="text-xl font-bold text-surface-800">{{ selectedPostForDetail.title }}</h3>
          <StatusBadge :status="selectedPostForDetail.status" />
        </div>
        <button @click="closePostDetailModal" class="p-1 hover:bg-surface-100 rounded-lg">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex border-b border-surface-200 px-6 bg-surface-50 shrink-0">
        <button
          @click="activeTab = 'content'"
          :class="['px-4 py-3 text-sm font-medium border-b-2 transition flex items-center gap-2', activeTab === 'content' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-surface-500 hover:text-surface-700']"
        >
          <FileText class="w-4 h-4" />Conteúdo & Mídias ({{ selectedPostForDetail.medias.length }})
        </button>
        <button
          @click="activeTab = 'comments'"
          :class="['px-4 py-3 text-sm font-medium border-b-2 transition flex items-center gap-2', activeTab === 'comments' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-surface-500 hover:text-surface-700']"
        >
          <MessageCircle class="w-4 h-4" />Comentários ({{ comments.length }})
        </button>
        <button
          @click="activeTab = 'history'"
          :class="['px-4 py-3 text-sm font-medium border-b-2 transition flex items-center gap-2', activeTab === 'history' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-surface-500 hover:text-surface-700']"
        >
          <History class="w-4 h-4" />Histórico de Auditoria
        </button>
      </div>

      <!-- Content Area -->
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <!-- TAB 1: Content & Medias -->
        <div v-if="activeTab === 'content'" class="space-y-6">
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-2">Conteúdo do Post</h4>
            <div class="p-4 bg-surface-50 rounded-xl border border-surface-200 text-sm text-surface-700 leading-relaxed whitespace-pre-wrap">
              {{ selectedPostForDetail.content }}
            </div>
          </div>

          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-2">
              Mídias Anexadas (Ordenadas por Posição)
            </h4>
            <div v-if="selectedPostForDetail.medias.length === 0" class="text-sm text-surface-400 p-4 border border-dashed rounded-xl text-center">
              Nenhuma mídia anexada a este post.
            </div>
            <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div
                v-for="pm in selectedPostForDetail.medias"
                :key="pm.media.id"
                class="border border-surface-200 rounded-xl overflow-hidden bg-surface-50 flex flex-col group relative"
              >
                <div class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-xs font-mono font-semibold z-10">
                  Posição #{{ pm.position }}
                </div>
                <div class="h-36 bg-surface-200 flex items-center justify-center overflow-hidden">
                  <img
                    v-if="pm.media.media_type === 'image'"
                    :src="getMediaFileUrl(pm.media.id)"
                    :alt="pm.media.alias"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="flex flex-col items-center justify-center text-surface-500">
                    <Video class="w-8 h-8 mb-1" />
                    <span class="text-xs">Vídeo MP4</span>
                  </div>
                </div>
                <div class="p-2.5">
                  <p class="text-xs font-medium text-surface-700 truncate">{{ pm.media.alias }}</p>
                  <p class="text-[11px] text-surface-400 font-mono">{{ formatBytes(pm.media.size_bytes) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: Comments -->
        <div v-if="activeTab === 'comments'" class="space-y-4">
          <form @submit.prevent="handleSendComment" class="flex gap-2">
            <input
              v-model="newComment"
              type="text"
              placeholder="Escreva um comentário neste post..."
              required
              class="flex-1 px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm"
            />
            <button type="submit" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 shrink-0">
              <Send class="w-4 h-4" />Enviar
            </button>
          </form>

          <div v-if="comments.length === 0" class="text-center py-8 text-sm text-surface-400">
            Nenhum comentário adicionado ainda.
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="cmt in comments"
              :key="cmt.id"
              class="p-4 bg-surface-50 rounded-xl border border-surface-200 flex items-start justify-between gap-3"
            >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs font-semibold text-surface-700">Autor #{{ cmt.author_id.slice(0, 8) }}</span>
                  <span class="text-[11px] text-surface-400">{{ formatDate(cmt.created_at) }}</span>
                </div>
                <p class="text-sm text-surface-700 leading-relaxed">{{ cmt.content }}</p>
              </div>
              <button
                v-if="canDeleteComment(cmt)"
                @click="handleDeleteComment(cmt.id)"
                class="text-surface-400 hover:text-danger p-1 rounded transition"
                title="Excluir comentário"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- TAB 3: Audit History -->
        <div v-if="activeTab === 'history'">
          <AuditTimeline resource-type="post" :resource-id="selectedPostForDetail.id" />
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="p-4 border-t border-surface-200 bg-surface-50 flex items-center justify-between shrink-0">
        <div class="text-xs text-surface-400">
          Versão do Post: <strong class="text-surface-600">{{ selectedPostForDetail.version }}</strong>
        </div>
        <button @click="closePostDetailModal" class="btn-secondary px-5 py-2 rounded-lg text-sm font-medium">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useModals } from '@/composables/useModals'
import { usePosts } from '@/composables/usePosts'
import { useAuth } from '@/composables/useAuth'
import { getMediaFileUrl } from '@/api/client'
import StatusBadge from './StatusBadge.vue'
import AuditTimeline from './AuditTimeline.vue'
import type { CommentItem } from '@/types/api'
import { X, FileText, MessageCircle, History, Video, Send, Trash2 } from '@lucide/vue'

const { postDetailModalOpen, selectedPostForDetail, closePostDetailModal } = useModals()
const { comments, fetchComments, addComment, removeComment } = usePosts()
const { currentUser } = useAuth()

const activeTab = ref<'content' | 'comments' | 'history'>('content')
const newComment = ref('')

watch(selectedPostForDetail, (post) => {
  if (post) {
    activeTab.value = 'content'
    fetchComments(post.id).catch(() => {})
  }
})

async function handleSendComment() {
  if (!selectedPostForDetail.value || !newComment.value.trim()) return
  try {
    await addComment(selectedPostForDetail.value.id, newComment.value.trim())
    newComment.value = ''
  } catch {}
}

async function handleDeleteComment(commentId: string) {
  if (!selectedPostForDetail.value) return
  if (!confirm('Deseja realmente remover este comentário?')) return
  await removeComment(selectedPostForDetail.value.id, commentId)
}

function canDeleteComment(cmt: CommentItem): boolean {
  if (!currentUser.value) return false
  return currentUser.value.type === 'agency' || currentUser.value.id === cmt.author_id
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('pt-BR')
  } catch {
    return iso
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>
