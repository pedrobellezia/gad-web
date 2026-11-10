<template>
  <header class="bg-white border-b border-surface-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
    <div class="flex items-center gap-3">
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-xs">
          <PenTool class="w-4 h-4 text-white" />
        </div>
        <span class="font-bold text-surface-800 text-lg">GAD</span>
      </router-link>
      <span v-if="roleBadge" class="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-600 border border-brand-100">
        {{ roleBadge }}
      </span>
    </div>

    <!-- Right user controls -->
    <div v-if="currentUser" class="flex items-center gap-3">
      <router-link
        :to="dashboardRoute"
        class="text-xs text-brand-600 hover:text-brand-700 font-semibold transition hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100"
      >
        Meu Painel
      </router-link>

      <button
        @click="openChangePasswordModal"
        class="text-xs text-surface-500 hover:text-brand-600 transition hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-surface-100"
      >
        <Key class="w-3.5 h-3.5" />Trocar Senha
      </button>

      <div class="flex items-center gap-2.5 pl-2 border-l border-surface-200">
        <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold overflow-hidden border border-brand-200">
          <img v-if="currentUser.avatar" :src="avatarUrl" :alt="currentUser.name" class="w-full h-full object-cover" />
          <span v-else>{{ initials }}</span>
        </div>
        <div class="hidden sm:block text-left">
          <p class="text-xs font-semibold text-surface-700 leading-tight">{{ currentUser.name }}</p>
          <p class="text-[11px] text-surface-400 leading-tight">{{ currentUser.email }}</p>
        </div>
      </div>

      <button
        @click="logout()"
        class="p-2 text-surface-400 hover:text-danger hover:bg-red-50 rounded-lg transition"
        title="Sair da conta"
      >
        <LogOut class="w-4 h-4" />
      </button>
    </div>

    <div v-else class="flex items-center gap-2">
      <router-link to="/login" class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-medium">Entrar</router-link>
      <router-link to="/register" class="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-medium">Cadastrar</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useModals } from '@/composables/useModals'
import { PenTool, Key, LogOut } from '@lucide/vue'

const { currentUser, logout } = useAuth()
const { openChangePasswordModal } = useModals()

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://api.gadagencia.com.br:8000'
const avatarUrl = computed(() => currentUser.value?.avatar ? `${BASE_URL}/me/avatar` : '')

const roleBadge = computed(() => {
  if (!currentUser.value) return ''
  switch (currentUser.value.type) {
    case 'agency': return 'Agência'
    case 'client': return 'Cliente'
    case 'writer': return 'Redator'
    case 'designer': return 'Designer'
    default: return ''
  }
})

const dashboardRoute = computed(() => {
  if (!currentUser.value) return '/'
  switch (currentUser.value.type) {
    case 'agency': return '/dashboard-agency'
    case 'client': return '/dashboard-client'
    case 'writer': return '/dashboard-writer'
    case 'designer': return '/dashboard-designer'
    default: return '/'
  }
})

const initials = computed(() => {
  if (!currentUser.value?.name) return 'U'
  return currentUser.value.name.substring(0, 2).toUpperCase()
})
</script>
