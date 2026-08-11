<template>
  <div v-if="createPostModalOpen" class="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl fade-in shadow-2xl my-8 border border-surface-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-surface-800">Criar Novo Post</h3>
        <button @click="closeCreatePostModal" class="p-1 hover:bg-surface-100 rounded-lg">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Título do Post *</label>
          <input v-model="form.title" type="text" required placeholder="Ex: Carrossel - Dicas de Saúde" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Cliente *</label>
          <select v-model="form.client" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm bg-white">
            <option value="">Selecione um cliente...</option>
            <option value="Loja ABC">Loja ABC</option>
            <option value="Clínica XYZ">Clínica XYZ</option>
            <option value="Restaurante 123">Restaurante 123</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-surface-600 mb-1">Conteúdo do Post *</label>
          <textarea v-model="form.content" required rows="4" placeholder="Descreva o conteúdo, legenda, estilo e estrutura dos slides..." class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm"></textarea>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-surface-600 mb-1">Tipo de Post</label>
            <select v-model="form.type" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm bg-white">
              <option>Carrossel</option>
              <option>Post Único</option>
              <option>Reels</option>
              <option>Stories</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-surface-600 mb-1">Data Planejada</label>
            <input v-model="form.date" type="date" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm">
          </div>
        </div>
        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="closeCreatePostModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">Cancelar</button>
          <button type="submit" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">Criar Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useModals } from '@/composables/useModals'
import { usePosts } from '@/composables/usePosts'
import { X } from '@lucide/vue'

const { createPostModalOpen, closeCreatePostModal } = useModals()
const { addPost } = usePosts()

const form = reactive({
  title: '',
  client: '',
  content: '',
  type: 'Carrossel',
  date: ''
})

function handleSubmit() {
  addPost({ ...form })
  closeCreatePostModal()
  form.title = ''
  form.client = ''
  form.content = ''
  form.type = 'Carrossel'
  form.date = ''
}
</script>
