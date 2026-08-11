<template>
  <div class="h-full bg-surface-50 text-surface-800 antialiased flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
      <router-link to="/" class="p-5 border-b border-surface-200 flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <PenTool class="w-4 h-4 text-white" />
        </div>
        <span class="font-bold text-surface-800">GAD Agência</span>
      </router-link>
      <nav class="flex-1 py-4 px-3 space-y-1">
        <button
          @click="currentSection = 'overview'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'overview' }]"
        >
          <LayoutDashboard class="w-4 h-4" />Visão Geral
        </button>
        <button
          @click="currentSection = 'posts'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'posts' }]"
        >
          <FileText class="w-4 h-4" />Posts
        </button>
        <button
          @click="currentSection = 'tokens'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'tokens' }]"
        >
          <Key class="w-4 h-4" />Tokens
        </button>
        <button
          @click="currentSection = 'members'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'members' }]"
        >
          <Users class="w-4 h-4" />Membros
        </button>
        <button
          @click="currentSection = 'notifications'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'notifications' }]"
        >
          <Bell class="w-4 h-4" />Notificações
        </button>
      </nav>
      <div class="p-4 border-t border-surface-200">
        <router-link to="/" class="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-400 hover:text-danger rounded-lg transition">
          <LogOut class="w-4 h-4" />Sair da Conta
        </router-link>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-8 bg-surface-50">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-surface-800">Painel da Agência</h1>
          <p class="text-sm text-surface-400">Agência Digital XYZ</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="currentSection = 'notifications'" class="relative p-2 rounded-lg bg-white border border-surface-200 hover:bg-surface-100 transition">
            <Bell class="w-5 h-5 text-surface-500" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>
          <div class="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white font-semibold text-sm shadow">
            A
          </div>
        </div>
      </div>

      <!-- Section: Overview -->
      <div v-if="currentSection === 'overview'" class="fade-in">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-xl p-5 border border-surface-200 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-surface-400">Posts Total</span>
              <FileText class="w-4 h-4 text-brand-400" />
            </div>
            <p class="text-2xl font-bold text-surface-800">47</p>
          </div>
          <div class="bg-white rounded-xl p-5 border border-surface-200 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-surface-400">Aprovados</span>
              <CheckCircle class="w-4 h-4 text-success" />
            </div>
            <p class="text-2xl font-bold text-success">32</p>
          </div>
          <div class="bg-white rounded-xl p-5 border border-surface-200 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-surface-400">Pendentes</span>
              <Clock class="w-4 h-4 text-warning" />
            </div>
            <p class="text-2xl font-bold text-warning">8</p>
          </div>
          <div class="bg-white rounded-xl p-5 border border-surface-200 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-surface-400">Membros</span>
              <Users class="w-4 h-4 text-purple-400" />
            </div>
            <p class="text-2xl font-bold text-surface-800">12</p>
          </div>
        </div>

        <!-- Recent Posts -->
        <div class="bg-white rounded-xl border border-surface-200 overflow-hidden shadow-sm">
          <div class="px-6 py-4 border-b border-surface-200 flex items-center justify-between">
            <h3 class="font-semibold text-surface-700">Posts Recentes</h3>
            <button @click="currentSection = 'posts'" class="text-sm text-brand-500 hover:underline">Ver todos</button>
          </div>
          <div class="divide-y divide-surface-100">
            <div v-for="post in posts" :key="post.id" class="px-6 py-4 flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-surface-700">{{ post.title }}</p>
                <p class="text-xs text-surface-400">Cliente: {{ post.client }} · Redator: {{ post.writer }}</p>
              </div>
              <StatusBadge :status="post.status" />
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Posts -->
      <div v-if="currentSection === 'posts'" class="fade-in">
        <div class="flex items-center justify-between mb-6">
          <div class="flex gap-2">
            <button
              v-for="filter in [
                { key: 'all', label: 'Todos' },
                { key: 'draft', label: 'Rascunho' },
                { key: 'pending', label: 'Pendentes' },
                { key: 'approved', label: 'Aprovados' }
              ]"
              :key="filter.key"
              @click="setFilter(filter.key)"
              :class="['px-3 py-1.5 text-xs font-medium rounded-full transition', activeFilter === filter.key ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-500 hover:bg-surface-200']"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
        <div class="grid gap-4">
          <div v-for="post in filteredPosts" :key="post.id" class="bg-white rounded-xl p-5 border border-surface-200 card-hover flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-surface-700">{{ post.title }}</h4>
                <StatusBadge :status="post.status" />
              </div>
              <p class="text-sm text-surface-400 mb-2">{{ post.description }}</p>
              <div class="flex items-center gap-4 text-xs text-surface-400">
                <span class="flex items-center gap-1"><User class="w-3 h-3" />{{ post.client }}</span>
                <span class="flex items-center gap-1"><Edit class="w-3 h-3" />{{ post.writer }}</span>
                <span class="flex items-center gap-1"><Calendar class="w-3 h-3" />{{ post.date }}</span>
                <span class="flex items-center gap-1"><MessageCircle class="w-3 h-3" />{{ post.commentsCount }} comentários</span>
              </div>
            </div>
            <button class="p-2 hover:bg-surface-100 rounded-lg"><MoreVertical class="w-4 h-4 text-surface-400" /></button>
          </div>
        </div>
      </div>

      <!-- Section: Tokens -->
      <div v-if="currentSection === 'tokens'" class="fade-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-surface-700">Gerenciar Tokens de Vínculo</h3>
            <p class="text-sm text-surface-400">Máximo de 5 tokens disponíveis simultaneamente (RN03)</p>
          </div>
          <button @click="generateToken" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus class="w-4 h-4" />Gerar Novo Token
          </button>
        </div>
        <div class="space-y-3">
          <div v-for="token in tokens" :key="token.id" class="bg-white rounded-xl p-5 border border-surface-200 flex items-center justify-between">
            <div>
              <code class="text-sm font-mono bg-surface-100 px-3 py-1 rounded text-brand-600 font-bold">{{ token.code }}</code>
              <p class="text-xs text-surface-400 mt-1">Criado em {{ token.date }} · Tipo: {{ token.type }}</p>
            </div>
            <button @click="deleteToken(token.id)" class="btn-danger px-3 py-1.5 rounded-lg text-xs font-medium">Excluir</button>
          </div>
        </div>
        <p class="text-xs text-surface-400 mt-4 flex items-center gap-1">
          <Info class="w-3.5 h-3.5 text-brand-500" />Token é automaticamente invalidado ao ser utilizado por um novo usuário (RN04)
        </p>
      </div>

      <!-- Section: Members -->
      <div v-if="currentSection === 'members'" class="fade-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-surface-700">Membros Vinculados</h3>
            <p class="text-sm text-surface-400">Máximo de 5 membros por tipo de perfil (RN02)</p>
          </div>
        </div>
        <div class="space-y-3">
          <div v-for="member in members" :key="member.id" class="bg-white rounded-xl p-4 border border-surface-200 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div :class="['w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold', member.colorClass]">
                {{ member.avatar }}
              </div>
              <div>
                <p class="text-sm font-medium text-surface-700">{{ member.name }}</p>
                <p class="text-xs text-surface-400">{{ member.role }} · Vinculado em {{ member.date }}</p>
              </div>
            </div>
            <button @click="removeMember(member.id)" class="btn-danger px-3 py-1.5 rounded-lg text-xs font-medium">Desvincular</button>
          </div>
        </div>
      </div>

      <!-- Section: Notifications -->
      <div v-if="currentSection === 'notifications'" class="fade-in">
        <h3 class="text-lg font-semibold text-surface-700 mb-6">Notificações Recentes</h3>
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-4 border border-surface-200 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Check class="w-4 h-4 text-success" />
            </div>
            <div>
              <p class="text-sm text-surface-700"><strong>Loja ABC</strong> aprovou o post "Promoção Verão"</p>
              <p class="text-xs text-surface-400">Há 2 horas</p>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 border border-surface-200 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <XIcon class="w-4 h-4 text-danger" />
            </div>
            <div>
              <p class="text-sm text-surface-700"><strong>Clínica XYZ</strong> rejeitou o post "Dicas de Saúde"</p>
              <p class="text-xs text-surface-400">Há 5 horas</p>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 border border-surface-200 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <UserPlus class="w-4 h-4 text-brand-500" />
            </div>
            <div>
              <p class="text-sm text-surface-700"><strong>Ana Lima</strong> conectou-se como Redatora via Token</p>
              <p class="text-xs text-surface-400">Há 1 dia</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { usePosts } from '@/composables/usePosts'
import { useTokens } from '@/composables/useTokens'
import { useToast } from '@/composables/useToast'
import {
  PenTool, LayoutDashboard, FileText, Key, Users, Bell, LogOut,
  CheckCircle, Clock, Plus, User, Edit, Calendar, MessageCircle,
  MoreVertical, Info, Check, X as XIcon, UserPlus
} from '@lucide/vue'

const currentSection = ref('overview')

const { posts, activeFilter, filteredPosts, setFilter } = usePosts()
const { tokens, generateToken, deleteToken } = useTokens()
const { showToast } = useToast()

const members = ref([
  { id: '1', name: 'Loja ABC', role: 'Cliente', date: '15/03/2026', avatar: 'C', colorClass: 'bg-blue-100 text-blue-600' },
  { id: '2', name: 'Maria Silva', role: 'Redatora', date: '01/04/2026', avatar: 'R', colorClass: 'bg-green-100 text-green-600' },
  { id: '3', name: 'Carlos Design', role: 'Designer', date: '10/04/2026', avatar: 'D', colorClass: 'bg-purple-100 text-purple-600' }
])

function removeMember(id: string) {
  members.value = members.value.filter(m => m.id !== id)
  showToast('Membro desvinculado!', 'info')
}
</script>
