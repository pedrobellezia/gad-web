<template>
  <div v-if="reportModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl border border-surface-200">
      <h3 class="text-lg font-semibold text-surface-800 mb-4">Gerar Relatório com IA</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Cliente</label>
          <select v-model="client" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm bg-white">
            <option value="">Selecione o cliente...</option>
            <option value="loja">Loja ABC</option>
            <option value="clinica">Clínica XYZ</option>
            <option value="restaurante">Restaurante 123</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Período de Análise</label>
          <div class="grid grid-cols-2 gap-2">
            <input v-model="startDate" type="date" required class="px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm">
            <input v-model="endDate" type="date" required class="px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm">
          </div>
        </div>
        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="closeReportModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">Cancelar</button>
          <button type="submit" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">Gerar Relatório</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'

const { reportModalOpen, closeReportModal } = useModals()
const { showToast } = useToast()

const client = ref('')
const startDate = ref('')
const endDate = ref('')

function handleSubmit() {
  showToast('Relatório em geração via IA... Você receberá em breve!', 'success')
  closeReportModal()
}
</script>
