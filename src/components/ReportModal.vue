<template>
  <div v-if="reportModalOpen" class="fixed inset-0 bg-surface-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
    <div class="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl dark:shadow-card-dark border border-surface-200 dark:border-surface-700/80 transition-colors">
      <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">Gerar Relatório de Desempenho</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Cliente Vinculado</label>
          <select
            v-model="client"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100"
          >
            <option value="" class="bg-surface-50 dark:bg-surface-900 text-surface-500 dark:text-surface-400">Selecione o cliente...</option>
            <option v-for="c in clients" :key="c.id" :value="c.id" class="bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
              {{ c.user.name }}
            </option>
          </select>
          <p v-if="clients.length === 0" class="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Nenhum cliente vinculado à agência ainda.
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Período de Análise</label>
          <div class="grid grid-cols-2 gap-2">
            <input v-model="startDate" type="date" required class="px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
            <input v-model="endDate" type="date" required class="px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">
          </div>
        </div>
        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="closeReportModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">Cancelar</button>
          <button type="submit" :disabled="clients.length === 0" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">Gerar Relatório</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { useAgencyMembers } from '@/composables/useAgencyMembers'

const { reportModalOpen, closeReportModal } = useModals()
const { showToast } = useToast()
const { clients } = useAgencyMembers()

const client = ref('')
const startDate = ref('')
const endDate = ref('')

function handleSubmit() {
  showToast('Relatório solicitado com sucesso para o período selecionado!', 'success')
  closeReportModal()
}
</script>