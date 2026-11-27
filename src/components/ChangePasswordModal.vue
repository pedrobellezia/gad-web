<template>
  <div v-if="changePasswordModalOpen" class="fixed inset-0 bg-surface-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
    <div class="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md fade-in shadow-2xl dark:shadow-card-dark border border-surface-200 dark:border-surface-700/80 transition-colors">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-50">Alterar Minha Senha</h3>
        <button @click="closeChangePasswordModal" class="p-1.5 hover:bg-surface-200/60 dark:hover:bg-surface-700/70 rounded-lg transition">
          <X class="w-5 h-5 text-surface-400" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Senha Atual *</label>
          <input
            v-model="currentPassword"
            type="password"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Nova Senha *</label>
          <input
            v-model="newPassword"
            type="password"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors"
          />
        </div>

        <div class="flex gap-2 justify-end pt-2">
          <button type="button" @click="closeChangePasswordModal" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
            {{ isLoading ? 'Alterando...' : 'Salvar Nova Senha' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authApi } from '@/api/auth'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { X } from '@lucide/vue'

const { changePasswordModalOpen, closeChangePasswordModal } = useModals()
const { showToast } = useToast()

const currentPassword = ref('')
const newPassword = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  if (currentPassword.value === newPassword.value) {
    showToast('A nova senha deve ser diferente da atual!', 'error')
    return
  }

  isLoading.value = true
  try {
    await authApi.changePassword({
      current_password: currentPassword.value,
      new_password: newPassword.value
    })
    showToast('Senha alterada com sucesso!', 'success')
    currentPassword.value = ''
    newPassword.value = ''
    closeChangePasswordModal()
  } catch (err: any) {
    showToast(err.message || 'Erro ao alterar senha', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>