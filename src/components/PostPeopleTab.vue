<template>
  <div class="space-y-4">
    <p
      v-if="isAgencyOwner && isFinalStatus"
      class="text-xs text-surface-500 dark:text-surface-400 bg-surface-100/70 dark:bg-surface-900/70 border border-surface-200 dark:border-surface-700/80 rounded-lg px-3 py-2"
    >
      Posts {{ post.status === 'published' ? 'publicados' : 'reprovados' }} não podem ter o redator ou o cliente alterados.
    </p>

    <section
      v-for="role in roles"
      :key="role.key"
      class="border border-surface-200 dark:border-surface-700/80 rounded-xl p-4 bg-surface-50 dark:bg-surface-900/40"
    >
      <h4 class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-3">{{ role.title }}</h4>

      <!-- Escolhendo outra pessoa -->
      <div v-if="editing === role.key" class="space-y-3">
        <MemberPicker
          v-model="selectedId"
          :label="role.current ? `Trocar ${role.noun}` : `Adicionar ${role.noun}`"
          :members="role.options"
          :noun="role.noun"
        />
        <p v-if="role.key === 'client' && changeClientHint" class="text-xs text-amber-700 dark:text-amber-300">
          {{ changeClientHint }}
        </p>
        <div class="flex justify-end gap-2">
          <button type="button" @click="cancelEdit" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
            Cancelar
          </button>
          <button
            type="button"
            @click="save(role.key, selectedId)"
            :disabled="isSaving || !selectedId || selectedId === role.currentId"
            class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            Salvar
          </button>
        </div>
      </div>

      <div v-else class="flex items-center justify-between gap-3 flex-wrap">
        <UserChip
          :user="role.current"
          :label="role.noun.charAt(0).toUpperCase() + role.noun.slice(1)"
          :empty-text="role.emptyText"
        />

        <div v-if="canEdit" class="flex items-center gap-2">
          <template v-if="role.current">
            <button
              type="button"
              @click="startEdit(role.key)"
              class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
            >
              <RefreshCw class="w-3.5 h-3.5" />Trocar
            </button>
            <button
              type="button"
              @click="remove(role.key)"
              :disabled="isSaving"
              class="px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 transition disabled:opacity-50"
            >
              <UserMinus class="w-3.5 h-3.5" />Remover
            </button>
          </template>
          <button
            v-else
            type="button"
            @click="startEdit(role.key)"
            class="btn-primary px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
          >
            <UserPlus class="w-3.5 h-3.5" />Adicionar
          </button>
        </div>
      </div>
    </section>

    <div v-if="post.published_at" class="text-xs text-surface-500 dark:text-surface-400">
      Publicado em <strong class="text-surface-700 dark:text-surface-200">{{ formatDate(post.published_at) }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { usePosts } from '@/composables/usePosts'
import { useAgencyMembers } from '@/composables/useAgencyMembers'
import { useDialog } from '@/composables/useDialog'
import UserChip from './UserChip.vue'
import MemberPicker from './MemberPicker.vue'
import type { PostItem } from '@/types/api'
import { RefreshCw, UserMinus, UserPlus } from '@lucide/vue'

type RoleKey = 'writer' | 'client'

const props = defineProps<{ post: PostItem }>()
const emit = defineEmits<{ updated: [post: PostItem] }>()

const { currentUser } = useAuth()
const { updatePost, updateWriter } = usePosts()
const { clients, writers, fetchAllMembers } = useAgencyMembers()
const { confirmDialog } = useDialog()

const editing = ref<RoleKey | null>(null)
const selectedId = ref<string | null>(null)
const isSaving = ref(false)

// Só a agência dona do post troca redator e cliente, e nunca em reprovados ou publicados
const isAgencyOwner = computed(() =>
  currentUser.value?.type === 'agency' && props.post.agency_id === currentUser.value.id
)
const isFinalStatus = computed(() => props.post.status === 'denied' || props.post.status === 'published')
const canEdit = computed(() => isAgencyOwner.value && !isFinalStatus.value)

watch(canEdit, (can) => { if (can) fetchAllMembers().catch(() => {}) }, { immediate: true })
watch(() => props.post.id, () => cancelEdit())

// Post publicado guarda o nome de quem era o cliente/redator, mesmo após desvínculo
function emptyText(recorded: string | null | undefined, fallback: string): string {
  return recorded ? `${recorded} (não vinculado)` : fallback
}

const roles = computed(() => [
  {
    key: 'writer' as RoleKey,
    title: 'Redator',
    noun: 'redator',
    current: props.post.writer ?? null,
    currentId: props.post.writer_id,
    options: writers.value,
    emptyText: emptyText(props.post.published_writer_name, 'Sem redator')
  },
  {
    key: 'client' as RoleKey,
    title: 'Cliente',
    noun: 'cliente',
    current: props.post.client ?? null,
    currentId: props.post.client_id,
    options: clients.value,
    emptyText: emptyText(props.post.published_client_name, 'Sem cliente')
  }
])

// Efeito da troca de cliente no status (mesma regra da API)
const changeClientHint = computed(() => {
  if (!props.post.client_id) return ''
  if (props.post.status === 'approved') return 'O post volta para revisão e o novo cliente precisa aprová-lo. O cliente atual deixa de vê-lo.'
  if (props.post.status === 'review') return 'O novo cliente passa a revisar o post. O cliente atual deixa de vê-lo.'
  return ''
})

function startEdit(key: RoleKey) {
  editing.value = key
  selectedId.value = key === 'writer' ? props.post.writer_id : props.post.client_id
}

function cancelEdit() {
  editing.value = null
  selectedId.value = null
}

async function save(key: RoleKey, id: string | null) {
  isSaving.value = true
  try {
    const updated = key === 'writer'
      ? await updateWriter(props.post.id, id, props.post.version)
      : await updatePost(props.post.id, { client_id: id, version: props.post.version })
    emit('updated', updated)
    cancelEdit()
  } catch {
    // erro já exibido via toast pelo composable
  } finally {
    isSaving.value = false
  }
}

async function remove(key: RoleKey) {
  const name = key === 'writer' ? props.post.writer?.name : props.post.client?.name
  let message: string
  if (key === 'writer') {
    message = `${name} deixa de ser o redator deste post. Até um novo redator ser adicionado, só a agência poderá editá-lo.`
  } else if (props.post.status === 'review' || props.post.status === 'approved') {
    message = `${name} deixa de ser o cliente deste post e não poderá mais vê-lo. O post volta para rascunho, porque não pode ficar em ${props.post.status === 'review' ? 'revisão' : 'aprovado'} sem cliente.`
  } else {
    message = `${name} deixa de ser o cliente deste post. Será preciso adicionar um cliente antes de enviá-lo para revisão.`
  }
  const ok = await confirmDialog({
    title: key === 'writer' ? 'Remover redator' : 'Remover cliente',
    message,
    confirmLabel: 'Remover',
    danger: true
  })
  if (!ok) return
  await save(key, null)
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('pt-BR')
  } catch {
    return iso
  }
}
</script>
