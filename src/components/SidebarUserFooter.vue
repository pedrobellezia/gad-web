<template>
  <div class="p-4 border-t border-surface-200 dark:border-surface-800 space-y-2 mt-auto bg-surface-50 dark:bg-surface-950/80 transition-colors duration-200">
    <div class="flex items-center gap-3 px-2 py-1">
      <div
        :class="['w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase overflow-hidden shrink-0 border',
          avatarBgClass]"
      >
        <img
          v-if="userAvatarUrl"
          :src="userAvatarUrl"
          :alt="userName"
          class="w-full h-full object-cover"
        />
        <span v-else>{{ userInitials }}</span>
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-surface-800 dark:text-surface-100 truncate leading-tight" :title="userName">
          {{ userName }}
        </p>
        <span
          :class="['inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border mt-1',
            roleBadgeClass]"
        >
          {{ roleLabel }}
        </span>
      </div>
    </div>

    <button
      @click="() => logout()"
      class="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-surface-600 dark:text-surface-400 hover:text-danger dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
    >
      <LogOut class="w-4 h-4" />
      <span>Sair da conta</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { LogOut } from '@lucide/vue'

const { currentUser, userAvatarUrl, logout } = useAuth()

const userName = computed(() => {
  return currentUser.value?.name || 'Carregando...'
})

const userInitials = computed(() => {
  if (!currentUser.value?.name) return 'US'
  return currentUser.value.name.substring(0, 2).toUpperCase()
})

const roleLabel = computed(() => {
  switch (currentUser.value?.type) {
    case 'agency':
      return 'Agência'
    case 'client':
      return 'Cliente'
    case 'writer':
      return 'Redator'
    case 'designer':
      return 'Designer'
    default:
      return 'Usuário'
  }
})

const roleBadgeClass = computed(() => {
  switch (currentUser.value?.type) {
    case 'agency':
      return 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:border-brand-500/30'
    case 'client':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30'
    case 'writer':
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30'
    case 'designer':
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30'
    default:
      return 'bg-surface-100 text-surface-600 border-surface-200 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700'
  }
})

const avatarBgClass = computed(() => {
  switch (currentUser.value?.type) {
    case 'agency':
      return 'bg-brand-100 text-brand-700 border-brand-200 dark:bg-brand-500/20 dark:text-brand-300 dark:border-brand-500/30'
    case 'client':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
    case 'writer':
      return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
    case 'designer':
      return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30'
    default:
      return 'bg-surface-100 text-surface-700 border-surface-200 dark:bg-surface-800 dark:text-surface-200 dark:border-surface-700'
  }
})
</script>