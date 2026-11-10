<template>
  <div v-if="restoreAccountModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl border border-surface-200">
      <div class="flex items-center gap-3 mb-3 text-amber-600">
        <AlertTriangle class="w-6 h-6 shrink-0" />
        <h3 class="text-lg font-semibold text-surface-800">Conta Desativada</h3>
      </div>

      <p class="text-sm text-surface-600 mb-6 leading-relaxed">
        Esta conta foi desativada anteriormente. Deseja reativá-la agora e restaurar seu acesso ao sistema?
      </p>

      <div class="flex gap-2 justify-end">
        <button type="button" @click="closeRestoreAccountModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
          Cancelar
        </button>
        <button type="button" @click="$emit('confirmRestore')" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">
          Sim, Reativar Conta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModals } from '@/composables/useModals'
import { AlertTriangle } from '@lucide/vue'

defineEmits<{
  (e: 'confirmRestore'): void
}>()

const { restoreAccountModalOpen, closeRestoreAccountModal } = useModals()
</script>
