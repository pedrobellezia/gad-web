<template>
  <div class="h-full bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-6 antialiased">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 fade-in border border-surface-200">
      <router-link to="/login" class="flex items-center gap-1 text-sm text-surface-400 hover:text-brand-500 mb-6 transition">
        <ArrowLeft class="w-4 h-4" /> Voltar ao login
      </router-link>
      <h2 class="text-2xl font-bold text-surface-800 mb-1">Recuperar Senha</h2>
      <p class="text-sm text-surface-400 mb-6">Informe seu e-mail cadastrado para receber as instruções</p>

      <form @submit.prevent="handleRecovery">
        <label for="rec-email" class="block text-sm font-medium text-surface-600 mb-1">E-mail cadastrado</label>
        <input v-model="email" id="rec-email" type="email" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-6 text-sm" placeholder="seu@email.com">

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
