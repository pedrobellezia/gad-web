<template>
  <div class="min-h-full flex-1 bg-gradient-to-br from-brand-50 via-surface-50 to-white dark:from-brand-950/50 dark:via-surface-900 dark:to-surface-950 flex items-center justify-center p-6 antialiased transition-colors duration-200">
    <div class="w-full max-w-md bg-white dark:bg-surface-800/90 rounded-2xl shadow-xl dark:shadow-card-dark p-8 fade-in border border-surface-200 dark:border-surface-700/80 backdrop-blur-sm">
      <router-link to="/login" class="inline-flex items-center gap-1.5 text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-300 mb-6 transition">
        <ArrowLeft class="w-4 h-4" /> Voltar ao login
      </router-link>
      <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-1">Recuperar Senha</h2>
      <p class="text-sm text-surface-500 dark:text-surface-400 mb-6">Informe seu e-mail cadastrado para receber as instruções</p>

      <form @submit.prevent="handleRecovery">
        <label for="rec-email" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">E-mail cadastrado</label>
        <input
          v-model="email"
          id="rec-email"
          type="email"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-6 text-sm bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors"
          placeholder="seu@email.com"
        />

        <button type="submit" class="w-full btn-primary py-3 rounded-lg font-semibold">Enviar Token de Recuperação</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { ArrowLeft } from '@lucide/vue'

const { showToast } = useToast()
const email = ref('')

function handleRecovery() {
  showToast('Token de recuperação enviado para seu e-mail!', 'success')
}
</script>