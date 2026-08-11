<template>
  <div class="h-full bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-6 antialiased">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 fade-in border border-surface-200">
      <router-link to="/" class="flex items-center gap-1 text-sm text-surface-400 hover:text-brand-500 mb-6 transition">
        <ArrowLeft class="w-4 h-4" /> Voltar ao início
      </router-link>
      <h2 class="text-2xl font-bold text-surface-800 mb-1">Bem-vindo de volta</h2>
      <p class="text-sm text-surface-400 mb-6">Entre na sua conta para acessar os painéis</p>
      
      <form @submit.prevent="handleLogin">
        <label for="login-email" class="block text-sm font-medium text-surface-600 mb-1">E-mail</label>
        <input v-model="email" id="login-email" type="email" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm" placeholder="seu@email.com">
        
        <label for="login-pass" class="block text-sm font-medium text-surface-600 mb-1">Senha</label>
        <input v-model="password" id="login-pass" type="password" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-2 text-sm" placeholder="••••••••">
        
        <div class="text-right mb-6">
          <router-link to="/recovery" class="text-xs text-brand-500 hover:underline">Esqueceu a senha?</router-link>
        </div>
        
        <button type="submit" class="w-full btn-primary py-3 rounded-lg font-semibold">Entrar</button>
      </form>

      <!-- Shortcut Links to Demos -->
      <div class="mt-6 pt-4 border-t border-surface-100">
        <p class="text-xs text-center text-surface-400 mb-2">Acesso rápido aos painéis de demonstração:</p>
        <div class="flex justify-center gap-2 text-xs">
          <router-link to="/dashboard-agency" class="px-2.5 py-1 bg-surface-100 rounded text-surface-600 hover:bg-brand-50 hover:text-brand-600 transition">Agência</router-link>
          <router-link to="/dashboard-client" class="px-2.5 py-1 bg-surface-100 rounded text-surface-600 hover:bg-brand-50 hover:text-brand-600 transition">Cliente</router-link>
          <router-link to="/dashboard-writer" class="px-2.5 py-1 bg-surface-100 rounded text-surface-600 hover:bg-brand-50 hover:text-brand-600 transition">Redator</router-link>
        </div>
      </div>

      <p class="text-center text-sm text-surface-400 mt-6">
        Não tem uma conta? <router-link to="/register" class="text-brand-500 hover:underline font-medium">Cadastre-se</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { ArrowLeft } from '@lucide/vue'

const router = useRouter()
const { showToast } = useToast()

const email = ref('')
const password = ref('')

function handleLogin() {
  showToast('Login realizado com sucesso!', 'success')
  setTimeout(() => {
    router.push('/dashboard-agency')
  }, 800)
}
</script>
