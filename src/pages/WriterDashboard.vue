<template>
  <div class="h-full bg-surface-50 text-surface-800 antialiased flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
      <router-link to="/" class="p-5 border-b border-surface-200 flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <PenTool class="w-4 h-4 text-white" />
        </div>
        <span class="font-bold text-surface-800">GAD Redator</span>
      </router-link>
      <nav class="flex-1 py-4 px-3 space-y-1">
        <button
          @click="currentSection = 'posts'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'posts' }]"
        >
          <FileText class="w-4 h-4" />Posts
        </button>
        <button
          @click="currentSection = 'comments'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'comments' }]"
        >
          <MessageCircle class="w-4 h-4" />Comentários
        </button>
        <button
          @click="currentSection = 'reports'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'reports' }]"
        >
          <BarChart3 class="w-4 h-4" />Relatórios IA
        </button>
        <button
          @click="currentSection = 'profile'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'profile' }]"
        >
          <Settings class="w-4 h-4" />Perfil
        </button>
      </nav>
      <div class="p-4 border-t border-surface-200">
        <router-link to="/" class="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-400 hover:text-danger rounded-lg transition">
          <LogOut class="w-4 h-4" />Sair
        </router-link>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-8 bg-surface-50">
      <!-- Writer Posts Section -->
      <div v-if="currentSection === 'posts'" class="fade-in">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-surface-800">Gerenciar Meus Posts</h1>
            <p class="text-sm text-surface-400">Agência Digital XYZ · Redator</p>
          </div>
          <button @click="openCreatePostModal" class="btn-primary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm">
            <Plus class="w-4 h-4" />Novo Post
          </button>
        </div>

        <div class="space-y-3">
          <div v-for="post in posts" :key="post.id" class="bg-white rounded-xl p-5 border border-surface-200 card-hover shadow-sm">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-semibold text-surface-700">{{ post.title }}</h4>
                  <StatusBadge :status="post.status" />
                </div>
                <p class="text-sm text-surface-400 mb-2">{{ post.description }}</p>
                <div class="flex items-center gap-3 text-xs text-surface-400">
                  <span>Cliente: {{ post.client }}</span>
                  <span>{{ post.date }}</span>
                </div>
              </div>
              <div class="flex gap-1">
                <button @click="openEditPostModal(post)" class="p-2 hover:bg-surface-100 rounded-lg">
                  <Edit class="w-4 h-4 text-surface-400" />
                </button>
                <button @click="deletePost(post.id)" class="p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 class="w-4 h-4 text-danger" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Writer Comments Section -->
      <div v-if="currentSection === 'comments'" class="fade-in">
        <h2 class="text-2xl font-bold text-surface-800 mb-6">Comentários dos Clientes</h2>
        <div class="space-y-4">
          <div class="bg-white rounded-xl p-5 border border-surface-200 shadow-sm">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-semibold">L</div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <p class="text-sm font-medium text-surface-700">Loja ABC</p>
                  <span class="text-xs text-surface-400">Há 2h</span>
                </div>
                <p class="text-sm text-surface-600 mb-2">Preciso que aumente o tamanho da fonte no segundo slide. Ficou muito pequena!</p>
                <button @click="showToast('Respondido!', 'success')" class="text-xs text-brand-500 hover:underline">Responder Cliente</button>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-5 border border-surface-200 shadow-sm">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-semibold">C</div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <p class="text-sm font-medium text-surface-700">Clínica XYZ</p>
                  <span class="text-xs text-surface-400">Há 1h</span>
                </div>
                <p class="text-sm text-surface-600">Adorei o resultado do último carrossel! Consegue fazer outro modelo similar?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Writer Reports Section -->
      <div v-if="currentSection === 'reports'" class="fade-in">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-surface-800">Relatórios Inteligentes com IA</h2>
          <button @click="openReportModal" class="btn-primary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm">
            <Plus class="w-4 h-4" />Gerar Relatório
          </button>
        </div>
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-5 border border-surface-200 card-hover shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-semibold text-surface-700">Análise Maio 2026 - Loja ABC</h4>
              <button @click="showToast('Baixando relatório PDF...', 'info')" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                <Download class="w-3.5 h-3.5" />Exportar PDF
              </button>
            </div>
            <p class="text-sm text-surface-400 mb-2">5 posts criados · 4 aprovados · Taxa de aprovação: 80%</p>
            <p class="text-xs text-surface-400">Gerado automaticamente em 25/05/2026</p>
          </div>
        </div>
      </div>

      <!-- Writer Profile Section -->
      <div v-if="currentSection === 'profile'" class="fade-in">
        <h2 class="text-2xl font-bold text-surface-800 mb-6">Meu Perfil</h2>
        <div class="bg-white rounded-xl border border-surface-200 p-6 max-w-md shadow-sm">
          <form @submit.prevent="showToast('Perfil atualizado!', 'success')" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-surface-600 mb-1">Nome completo</label>
              <input type="text" v-model="profileName" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-600 mb-1">E-mail</label>
              <input type="email" v-model="profileEmail" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm">
            </div>
            <button type="submit" class="btn-primary px-6 py-2.5 rounded-lg font-medium text-sm">Salvar Alterações</button>
          </form>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <CreatePostModal />
    <EditPostModal />
    <ReportModal />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StatusBadge from '@/components/StatusBadge.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import EditPostModal from '@/components/EditPostModal.vue'
import ReportModal from '@/components/ReportModal.vue'
import { usePosts } from '@/composables/usePosts'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { PenTool, FileText, MessageCircle, BarChart3, Settings, LogOut, Plus, Edit, Trash2, Download } from '@lucide/vue'

const currentSection = ref('posts')
const profileName = ref('Maria Silva')
const profileEmail = ref('maria@agencia.com')

const { posts, deletePost } = usePosts()
const { openCreatePostModal, openEditPostModal, openReportModal } = useModals()
const { showToast } = useToast()
</script>
