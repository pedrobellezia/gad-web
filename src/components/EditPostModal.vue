<template>
  <div v-if="editPostModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl fade-in shadow-2xl my-8 border border-surface-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-surface-800">Editar Post</h3>
        <button @click="closeEditPostModal" class="p-1 hover:bg-surface-100 rounded-lg">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Título do Post</label>
          <input v-model="form.title" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Conteúdo do Post *</label>
          <textarea v-model="form.description" required rows="4" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Comentário da Alteração (RN10)</label>
          <textarea v-model="form.changeComment" rows="2" placeholder="Descreva as mudanças realizadas..." class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm"></textarea>
          <p class="text-xs text-surface-400 mt-1">Obrigatório caso o post já tenha saído do estado de Rascunho</p>
        </div>
        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="closeEditPostModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">Cancelar</button>
          <button type="submit" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">Salvar Alterações</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useModals } from '@/composables/useModals'
import { usePosts } from '@/composables/usePosts'
import { X } from '@lucide/vue'

const { editPostModalOpen, selectedPostForEdit, closeEditPostModal } = useModals()
const { updatePost } = usePosts()

const form = reactive({
  title: 'Carrossel - Dicas de Saúde',
  description: 'Post educativo sobre hábitos saudáveis para o perfil da clínica.',
  changeComment: ''
})

watch(selectedPostForEdit, (newVal) => {
  if (newVal) {
    form.title = newVal.title || ''
    form.description = newVal.description || ''
  }
})

function handleSubmit() {
  if (selectedPostForEdit.value) {
    updatePost(selectedPostForEdit.value.id, {
      title: form.title,
      description: form.description
    })
  } else {
    updatePost('2', {
      title: form.title,
      description: form.description
    })
  }
  closeEditPostModal()
}
</script>
