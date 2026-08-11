<template>
  <div v-if="approvalModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl border border-surface-200">
      <h3 class="text-lg font-semibold text-surface-800 mb-2">{{ modalTitle }}</h3>
      <p class="text-sm text-surface-400 mb-4">Comentário descritivo é obrigatório para esta ação (RN13)</p>
      
      <label for="modal-comment" class="block text-sm font-medium text-surface-600 mb-1">Seu comentário</label>
      <textarea
        id="modal-comment"
        v-model="comment"
        rows="3"
        required
        class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm mb-4"
        placeholder="Descreva os detalhes ou motivos..."
      ></textarea>
      
      <div class="flex gap-2 justify-end">
        <button @click="closeApprovalModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">Cancelar</button>
        <button @click="submitApproval" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'

const { approvalModalOpen, currentApprovalAction, closeApprovalModal } = useModals()
const { showToast } = useToast()

const comment = ref('')

const modalTitle = computed(() => {
  const titles: Record<string, string> = { approve: 'Aprovar Post', reject: 'Rejeitar Post', change: 'Solicitar Alteração' }
  return titles[currentApprovalAction.value] || 'Ação no Post'
})

function submitApproval() {
  if (!comment.value.trim()) {
    showToast('Comentário é obrigatório (RN13)!', 'error')
    return
  }

  const msgs: Record<string, string> = {
    approve: 'Post aprovado com sucesso!',
    reject: 'Post rejeitado.',
    change: 'Solicitação de alteração enviada para o redator.'
  }

  showToast(msgs[currentApprovalAction.value] || 'Ação registrada!', currentApprovalAction.value === 'approve' ? 'success' : 'info')
  closeApprovalModal()
  comment.value = ''
}
</script>
