<template>
  <div class="space-y-6">
    <!-- Agência vinculada -->
    <div class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xs dark:shadow-card-dark flex items-center gap-5 flex-wrap">
      <div class="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-lg overflow-hidden border border-surface-200 dark:border-brand-500/30 shrink-0">
        <img v-if="agencyAvatar" :src="agencyAvatar" :alt="agency.user.name" class="w-full h-full object-cover" />
        <span v-else>{{ initials(agency.user.name) }}</span>
      </div>
      <div class="flex-1 min-w-0">
        <span class="text-xs font-semibold text-emerald-600 dark:text-mint-400 uppercase tracking-wider">Agência vinculada</span>
        <h3 class="text-xl font-bold text-surface-900 dark:text-surface-50 truncate" :title="agency.user.name">{{ agency.user.name }}</h3>
        <p class="text-sm text-surface-500 dark:text-surface-400 font-mono">CNPJ {{ formatCnpj(agency.cnpj) }}</p>
      </div>
      <button
        type="button"
        @click="emit('unlink')"
        :disabled="unlinking"
        class="btn-danger px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50 shrink-0"
      >
        <Unlink class="w-4 h-4" />{{ unlinking ? 'Desvinculando...' : 'Desvincular-me' }}
      </button>
    </div>

    <!-- Membros da agência: só foto e nome -->
    <div :class="['grid grid-cols-1 gap-4', groups.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2']">
      <section
        v-for="group in groups"
        :key="group.key"
        class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-5 shadow-xs dark:shadow-card-dark"
      >
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">{{ group.title }}</h4>
          <span class="text-xs px-2 py-0.5 rounded-full bg-surface-200/80 dark:bg-surface-700 text-surface-700 dark:text-surface-200 font-semibold">
            {{ group.members.length }}
          </span>
        </div>

        <p v-if="isLoading" class="text-xs text-surface-500 dark:text-surface-400">Carregando...</p>
        <p v-else-if="group.members.length === 0" class="text-xs text-surface-500 dark:text-surface-400">{{ group.emptyText }}</p>
        <ul v-else class="space-y-3 max-h-80 overflow-y-auto pr-1">
          <li v-for="member in group.members" :key="member.id">
            <UserChip :user="member.user" :empty-text="member.user.name" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { agencyApi } from '@/api/agency'
import { useMediaCache } from '@/composables/useMediaCache'
import UserChip from './UserChip.vue'
import type { AgencyMember, AgencyPublic } from '@/types/api'
import { Unlink } from '@lucide/vue'

const props = defineProps<{
  agency: AgencyPublic
  // Cliente não vê outros clientes da agência (a API também bloqueia)
  showClients: boolean
  unlinking?: boolean
}>()
const emit = defineEmits<{ unlink: [] }>()

const { getAvatarUrl, loadAvatar } = useMediaCache()

const clients = ref<AgencyMember[]>([])
const writers = ref<AgencyMember[]>([])
const designers = ref<AgencyMember[]>([])
const isLoading = ref(false)

// Busca própria (não usa o estado compartilhado de useAgencyMembers, que é da agência)
async function loadMembers() {
  isLoading.value = true
  try {
    const [w, d, c] = await Promise.all([
      agencyApi.getWriters().catch(() => []),
      agencyApi.getDesigners().catch(() => []),
      props.showClients ? agencyApi.getClients().catch(() => []) : Promise.resolve([])
    ])
    writers.value = w
    designers.value = d
    clients.value = c
  } finally {
    isLoading.value = false
  }
}

onMounted(loadMembers)
watch(() => props.agency.id, loadMembers)

watch(() => props.agency.user.avatar_url, (path) => { if (path) loadAvatar(path) }, { immediate: true })
const agencyAvatar = computed(() => getAvatarUrl(props.agency.user.avatar_url) || null)

const groups = computed(() => [
  { key: 'writers', title: 'Redatores', members: writers.value, emptyText: 'Nenhum redator vinculado.' },
  ...(props.showClients
    ? [{ key: 'clients', title: 'Clientes', members: clients.value, emptyText: 'Nenhum cliente vinculado.' }]
    : []),
  { key: 'designers', title: 'Designers', members: designers.value, emptyText: 'Nenhum designer vinculado.' }
])

// 12345678000190 -> 12.345.678/0001-90
function formatCnpj(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return cnpj
  return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

function initials(name: string): string {
  const parts = name.split(' ').filter(Boolean)
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name.slice(0, 2).toUpperCase()
}
</script>
