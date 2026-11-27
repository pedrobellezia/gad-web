<template>
  <div>
    <div class="flex items-center justify-between mb-1.5">
      <label class="block text-sm font-medium text-surface-700 dark:text-surface-200">{{ label }}</label>
      <span v-if="invalid" class="text-xs text-danger dark:text-red-400">Selecione um cliente</span>
    </div>

    <div v-if="clients.length === 0" class="text-xs text-surface-500 dark:text-surface-400 p-4 rounded-xl border border-dashed border-surface-300 dark:border-surface-700 text-center">
      Nenhum cliente vinculado à agência ainda.
    </div>

    <div
      v-else
      :class="[
        'rounded-xl border bg-surface-100/70 dark:bg-surface-900/70 overflow-hidden',
        invalid ? 'border-red-300 dark:border-red-500/50' : 'border-surface-200 dark:border-surface-700/80'
      ]"
    >
      <div v-if="clients.length > 5" class="p-2 border-b border-surface-200 dark:border-surface-700/80">
        <div class="relative">
          <Search class="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            v-model="search"
            type="search"
            placeholder="Buscar cliente pelo nome..."
            class="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
            @keydown.enter.prevent
          />
        </div>
      </div>

      <div role="radiogroup" :aria-label="label" class="max-h-56 overflow-y-auto p-1.5 space-y-1">
        <button
          v-if="noneLabel"
          type="button"
          role="radio"
          :aria-checked="model === null"
          @click="model = null"
          :class="optionClass(model === null)"
        >
          <div class="w-9 h-9 rounded-full border border-dashed border-surface-300 dark:border-surface-600 flex items-center justify-center text-surface-400 shrink-0">
            <UserX class="w-4 h-4" />
          </div>
          <span class="flex-1 min-w-0 text-sm text-surface-600 dark:text-surface-300">{{ noneLabel }}</span>
          <Check v-if="model === null" class="w-4 h-4 text-brand-600 dark:text-brand-300 shrink-0" />
        </button>

        <button
          v-for="cl in filtered"
          :key="cl.user.id"
          type="button"
          role="radio"
          :aria-checked="model === cl.user.id"
          @click="model = cl.user.id"
          :class="optionClass(model === cl.user.id)"
        >
          <div class="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden border border-surface-200 dark:border-brand-500/30">
            <img v-if="avatarOf(cl)" :src="avatarOf(cl)" :alt="cl.user.name" class="w-full h-full object-cover" />
            <span v-else>{{ initials(cl.user.name) }}</span>
          </div>
          <p class="flex-1 min-w-0 text-left text-sm font-medium text-surface-900 dark:text-surface-100 truncate">{{ cl.user.name }}</p>
          <Check v-if="model === cl.user.id" class="w-4 h-4 text-brand-600 dark:text-brand-300 shrink-0" />
        </button>

        <p v-if="filtered.length === 0" class="text-xs text-surface-500 dark:text-surface-400 text-center py-3">
          Nenhum cliente corresponde a "{{ search }}".
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useMediaCache } from '@/composables/useMediaCache'
import type { AgencyMember } from '@/types/api'
import { Search, Check, UserX } from '@lucide/vue'

const props = defineProps<{
  label: string
  clients: AgencyMember[]
  // Quando informado, exibe a opção de deixar o post sem cliente
  noneLabel?: string
  invalid?: boolean
}>()

const model = defineModel<string | null>({ required: true })

const search = ref('')
const { getAvatarUrl, loadAvatar } = useMediaCache()

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

const filtered = computed(() => {
  const term = normalize(search.value.trim())
  if (!term) return props.clients
  return props.clients.filter(cl => normalize(cl.user.name).includes(term))
})

function avatarPath(cl: AgencyMember): string | null {
  return cl.user.avatar_url
}

function avatarOf(cl: AgencyMember): string | undefined {
  return getAvatarUrl(avatarPath(cl))
}

watch(
  () => props.clients,
  (list) => list.forEach(cl => loadAvatar(avatarPath(cl))),
  { immediate: true }
)

function initials(name: string): string {
  const parts = name.split(' ').filter(Boolean)
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function optionClass(selected: boolean): string {
  return [
    'w-full flex items-center gap-3 px-2.5 py-2 rounded-lg border transition',
    selected
      ? 'bg-brand-50 dark:bg-brand-500/15 border-brand-300 dark:border-brand-500/40'
      : 'border-transparent hover:bg-surface-50 dark:hover:bg-surface-800'
  ].join(' ')
}
</script>
