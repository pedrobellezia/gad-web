<template>
  <header class="bg-white border-b border-surface-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
    <div class="flex items-center gap-3">
      <router-link to="/" class="flex items-center gap-2 group">
        <span class="font-extrabold text-brand-600 text-2xl tracking-tight">GAD</span>
      </router-link>
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
        <div
          :class="['w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden border shrink-0',
            avatarBgClass]"
        >
          <img v-if="userAvatarUrl" :src="userAvatarUrl" :alt="currentUser.name" class="w-full h-full object-cover" />
          <span v-else>{{ initials }}</span>
        </div>
        <div class="hidden sm:block text-left">
          <p class="text-xs font-semibold text-surface-800 leading-tight">{{ currentUser.name }}</p>
          <span
            :class="['inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border mt-0.5',
              roleBadgeClass]"
          >
            {{ roleBadge }}
          </span>
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
import { Key, LogOut } from '@lucide/vue'

const { currentUser, userAvatarUrl, logout } = useAuth()
const { openChangePasswordModal } = useModals()

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

const roleBadgeClass = computed(() => {
  switch (currentUser.value?.type) {
    case 'agency':
      return 'bg-brand-50 text-brand-700 border-brand-200'
    case 'client':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'writer':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'designer':
      return 'bg-purple-50 text-purple-700 border-purple-200'
    default:
      return 'bg-surface-100 text-surface-600 border-surface-200'
  }
})

const avatarBgClass = computed(() => {
  switch (currentUser.value?.type) {
    case 'agency':
      return 'bg-brand-100 text-brand-700 border-brand-200'
    case 'client':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 'writer':
      return 'bg-amber-100 text-amber-700 border-amber-200'
    case 'designer':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    default:
      return 'bg-surface-100 text-surface-700 border-surface-200'
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
