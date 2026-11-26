<template>
  <div class="min-h-full flex-1 bg-gradient-to-br from-brand-50/80 via-surface-100 to-surface-200/60 dark:from-brand-950/50 dark:via-surface-900 dark:to-surface-950 flex items-center justify-center p-6 antialiased transition-colors duration-200">
    <div class="w-full max-w-md bg-surface-50 dark:bg-surface-800/90 rounded-2xl shadow-xl dark:shadow-card-dark p-8 fade-in border border-surface-200 dark:border-surface-700/80 backdrop-blur-sm">
      <div class="flex items-center justify-between mb-6">
        <router-link to="/" class="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-300 transition">
          <ArrowLeft class="w-4 h-4" /> Voltar
        </router-link>
        <img src="/favicon.png" alt="GAD" class="h-8 w-8 object-contain" />
      </div>

      <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-1">Bem-vindo de volta</h2>
      <p class="text-sm text-surface-600 dark:text-surface-400 mb-6">Entre com suas credenciais da GAD</p>

      <form @submit.prevent="handleLogin">
        <label for="login-email" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">E-mail</label>
        <input
          v-model="email"
          id="login-email"
          type="email"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-4 text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors"
          placeholder="seu@email.com"
        />

        <label for="login-pass" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Senha</label>
        <input
          v-model="password"
          id="login-pass"
          type="password"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-6 text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors"
          placeholder="••••••••"
        />

        <button type="submit" :disabled="isLoading" class="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="text-center text-sm text-surface-600 dark:text-surface-400 mt-6">
        Não tem uma conta?
        <router-link to="/register" class="text-brand-600 dark:text-brand-400 hover:underline font-medium">Cadastre-se</router-link>
      </p>
    </div>

    <!-- Modal to restore deactivated account -->
    <RestoreAccountModal @confirm-restore="handleConfirmRestore" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useModals } from '@/composables/useModals'
import RestoreAccountModal from '@/components/RestoreAccountModal.vue'
import { ArrowLeft } from '@lucide/vue'

const { login, isLoading } = useAuth()
const { openRestoreAccountModal, closeRestoreAccountModal } = useModals()

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await login({
      email: email.value.trim(),
      pswd: password.value
    })
  } catch (err: any) {
    if (err.status === 409) {
      openRestoreAccountModal()
    }
  }
}

async function handleConfirmRestore() {
  closeRestoreAccountModal()
  try {
    await login({
      email: email.value.trim(),
      pswd: password.value,
      restore: true
    })
  } catch {}
}
</script>