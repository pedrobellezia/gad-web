<template>
  <div v-if="open" class="fixed inset-0 bg-surface-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" @click.self="emit('close')">
    <div class="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl dark:shadow-card-dark border border-surface-200 dark:border-surface-700/80 transition-colors">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-50">{{ title }}</h3>
        <button @click="emit('close')" class="p-1.5 hover:bg-surface-200/60 dark:hover:bg-surface-700/70 rounded-lg transition">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">{{ label }}</label>
          <select
            v-model="selectedId"
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100"
          >
            <option :value="null" class="bg-surface-50 dark:bg-surface-900 text-surface-500 dark:text-surface-400">{{ emptyLabel }}</option>
            <option v-for="opt in options" :key="opt.id" :value="opt.id" class="bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
              {{ opt.name }} ({{ opt.email }})
            </option>
          </select>
          <p v-if="options.length === 0" class="text-xs text-surface-500 dark:text-surface-400 mt-1">
            {{ noOptionsHint }}
          </p>
        </div>

        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="emit('close')" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">Cancelar</button>
          <button type="submit" :disabled="isUnchanged || isSaving" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
            {{ isSaving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { X } from '@lucide/vue'

export interface MemberOption {
  id: string
  name: string
  email: string
}

const props = defineProps<{
  open: boolean
  title: string
  label: string
  emptyLabel: string
  noOptionsHint: string
  options: MemberOption[]
  currentId: string | null
  onConfirm: (id: string | null) => Promise<unknown>
}>()

const emit = defineEmits<{ close: [] }>()

const selectedId = ref<string | null>(null)
const isSaving = ref(false)

watch(() => props.open, (isOpen) => {
  if (isOpen) selectedId.value = props.currentId
})

const isUnchanged = computed(() => selectedId.value === props.currentId)

async function handleSubmit() {
  isSaving.value = true
  try {
    await props.onConfirm(selectedId.value)
    emit('close')
  } catch {
    // erro já exibido via toast pelo composable
  } finally {
    isSaving.value = false
  }
}
</script>
