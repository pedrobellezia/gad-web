<template>
  <div :class="['flex items-center gap-2 min-w-0', { 'flex-row-reverse text-right': reverse }]">
    <div
      :class="[
        'rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold shrink-0 overflow-hidden border border-surface-200 dark:border-brand-500/30',
        size === 'sm' ? 'w-6 h-6 text-[9px]' : 'w-8 h-8 text-[11px]'
      ]"
    >
      <img v-if="avatar" :src="avatar" :alt="displayName" class="w-full h-full object-cover" />
      <UserIcon v-else-if="!user" class="w-3.5 h-3.5" />
      <span v-else>{{ initials }}</span>
    </div>
    <div class="min-w-0 leading-tight">
      <p v-if="label" class="text-[10px] uppercase tracking-wider text-surface-500 dark:text-surface-400">{{ label }}</p>
      <p
        :class="['truncate', size === 'sm' ? 'text-xs' : 'text-sm', user ? 'font-medium text-surface-800 dark:text-surface-100' : 'italic text-surface-500 dark:text-surface-400']"
        :title="displayName"
      >
        {{ displayName }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useMediaCache } from '@/composables/useMediaCache'
import type { UserSummary } from '@/types/api'
import { User as UserIcon } from '@lucide/vue'

const props = withDefaults(defineProps<{
  user: UserSummary | null | undefined
  label?: string
  // Texto quando não há usuário (ex.: post sem redator)
  emptyText?: string
  size?: 'sm' | 'md'
  // Espelhado: foto à direita e texto alinhado à direita
  reverse?: boolean
}>(), {
  emptyText: 'Não definido',
  size: 'md'
})

const { getAvatarUrl, loadAvatar } = useMediaCache()

watch(() => props.user?.avatar_url, (path) => { if (path) loadAvatar(path) }, { immediate: true })

const avatar = computed(() => getAvatarUrl(props.user?.avatar_url) || null)
const displayName = computed(() => props.user?.name ?? props.emptyText)

const initials = computed(() => {
  const parts = (props.user?.name ?? '').split(' ').filter(Boolean)
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return (props.user?.name ?? '').slice(0, 2).toUpperCase()
})
</script>
