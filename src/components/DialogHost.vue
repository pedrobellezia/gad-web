<template>
  <Teleport to="body">
    <div
      v-if="current"
      class="fixed inset-0 bg-surface-950/60 backdrop-blur-xs flex items-center justify-center z-[60] p-4"
      @click.self="cancel"
    >
      <div
        role="dialog"
        aria-modal="true"
        class="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl dark:shadow-card-dark border border-surface-200 dark:border-surface-700/80 transition-colors"
      >
        <!-- Confirm -->
        <template v-if="current.kind === 'confirm' && current.confirm">
          <div class="flex items-start gap-3 mb-5">
            <div
              :class="[
                'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border',
                current.confirm.danger
                  ? 'bg-red-50 dark:bg-red-500/15 text-danger dark:text-red-400 border-red-200 dark:border-red-500/25'
                  : 'bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300 border-brand-100 dark:border-brand-500/25'
              ]"
            >
              <AlertTriangle v-if="current.confirm.danger" class="w-4 h-4" />
              <HelpCircle v-else class="w-4 h-4" />
            </div>
            <div class="min-w-0">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-50">{{ current.confirm.title }}</h3>
              <p v-if="current.confirm.message" class="text-sm text-surface-600 dark:text-surface-300 mt-1">{{ current.confirm.message }}</p>
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <button type="button" @click="cancel" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
              {{ current.confirm.cancelLabel || 'Cancelar' }}
            </button>
            <button
              ref="confirmButton"
              type="button"
              @click="settle(true)"
              :class="[current.confirm.danger ? 'btn-danger' : 'btn-primary', 'px-4 py-2 rounded-lg text-sm font-medium']"
            >
              {{ current.confirm.confirmLabel || 'Confirmar' }}
            </button>
          </div>
        </template>

        <!-- Prompt -->
        <form v-else-if="current.kind === 'prompt' && current.prompt" @submit.prevent="submitPrompt" novalidate class="space-y-4">
          <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-50">{{ current.prompt.title }}</h3>

          <div>
            <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">{{ current.prompt.label }}</label>
            <input
              ref="promptInput"
              v-model="inputValue"
              :type="current.prompt.inputType || 'text'"
              :min="current.prompt.min"
              :max="current.prompt.max"
              :placeholder="current.prompt.placeholder"
              required
              class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
            />
          </div>

          <div class="flex gap-2 justify-end pt-1">
            <button type="button" @click="cancel" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
              {{ current.prompt.cancelLabel || 'Cancelar' }}
            </button>
            <button type="submit" :disabled="!inputValue.toString().trim()" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
              {{ current.prompt.confirmLabel || 'Confirmar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { AlertTriangle, HelpCircle } from '@lucide/vue'
import { useDialog } from '@/composables/useDialog'

const { current, settle } = useDialog()

const inputValue = ref<string | number>('')
const promptInput = ref<HTMLInputElement | null>(null)
const confirmButton = ref<HTMLButtonElement | null>(null)

watch(current, async (state) => {
  if (!state) return
  inputValue.value = state.prompt?.defaultValue ?? ''
  await nextTick()
  if (state.kind === 'prompt') {
    promptInput.value?.focus()
    promptInput.value?.select()
  } else {
    confirmButton.value?.focus()
  }
})

function cancel() {
  if (!current.value) return
  settle(current.value.kind === 'confirm' ? false : null)
}

function submitPrompt() {
  const value = inputValue.value.toString().trim()
  if (!value) return
  settle(value)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && current.value) cancel()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>
