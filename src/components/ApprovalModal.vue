<template>
  <div v-if="approvalModalOpen && selectedPostForApproval" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl border border-surface-200">
      <h3 class="text-lg font-semibold text-surface-800 mb-2">
        {{ currentApprovalAction === 'approve' ? 'Aprovar Publicação' : 'Reprovar Publicação' }}
      </h3>
      <p class="text-sm text-surface-500 mb-4">
        Post: <strong>{{ selectedPostForApproval.title }}</strong>
      </p>

      <div>
        <label for="approval-comment" class="block text-sm font-medium text-surface-600 mb-1">
          Comentário {{ currentApprovalAction === 'deny' ? '(Obrigatório para justificar a recusa)' : '(Opcional)' }}
        </label>
        <textarea
          id="approval-comment"
          v-model="comment"
          rows="3"
          :placeholder="currentApprovalAction === 'deny' ? 'Explique o motivo da reprovação...' : 'Adicione observações para o redator...'"
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm mb-4"
        ></textarea>
      </div>

      <div class="flex gap-2 justify-end">
        <button type="button" @click="closeApprovalModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
          Cancelar
        </button>
        <button
          type="button"
          @click="submitApproval"
          :disabled="isLoading"
          :class="['px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50', currentApprovalAction === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700']"
        >
          {{ isLoading ? 'Processando...' : currentApprovalAction === 'approve' ? 'Confirmar Aprovação' : 'Confirmar Reprovação' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModals } from '@/composables/useModals'
import { usePosts } from '@/composables/usePosts'
import { useToast } from '@/composables/useToast'

const { approvalModalOpen, selectedPostForApproval, currentApprovalAction, closeApprovalModal } = useModals()
const { updateStatus, addComment } = usePosts()
const { showToast } = useToast()

const comment = ref('')
const isLoading = ref(false)

async function submitApproval() {
  if (!selectedPostForApproval.value) return

  if (currentApprovalAction.value === 'deny' && !comment.value.trim()) {
    showToast('Justificativa é obrigatória para reprovar o post!', 'error')
    return
  }

  isLoading.value = true
  try {
    const nextStatus = currentApprovalAction.value === 'approve' ? 'approved' : 'denied'
    await updateStatus(selectedPostForApproval.value.id, nextStatus, selectedPostForApproval.value.version)

    if (comment.value.trim()) {
      await addComment(selectedPostForApproval.value.id, comment.value.trim())
    }

    closeApprovalModal()
    comment.value = ''
  } catch {} finally {
    isLoading.value = false
  }
}
</script>
