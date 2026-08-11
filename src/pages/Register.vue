<template>
  <div class="h-full bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-6 antialiased">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 fade-in border border-surface-200">
      <router-link to="/" class="flex items-center gap-1 text-sm text-surface-400 hover:text-brand-500 mb-6 transition">
        <ArrowLeft class="w-4 h-4" /> Voltar ao início
      </router-link>
      <h2 class="text-2xl font-bold text-surface-800 mb-1">Criar Nova Conta</h2>
      <p class="text-sm text-surface-400 mb-6">Preencha os dados abaixo para se cadastrar</p>

      <form @submit.prevent="handleRegister">
        <label for="reg-name" class="block text-sm font-medium text-surface-600 mb-1">Nome completo / Empresa</label>
        <input v-model="name" id="reg-name" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm" placeholder="Ex: Agência Digital XYZ">

        <label for="reg-email" class="block text-sm font-medium text-surface-600 mb-1">E-mail corporativo</label>
        <input v-model="email" id="reg-email" type="email" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm" placeholder="contato@empresa.com">

        <label for="reg-role" class="block text-sm font-medium text-surface-600 mb-1">Tipo de perfil</label>
        <select v-model="role" id="reg-role" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm bg-white">
          <option value="">Selecione o perfil...</option>
          <option value="agencia">Agência</option>
          <option value="cliente">Cliente</option>
          <option value="redator">Redator</option>
          <option value="designer">Designer</option>
        </select>

        <div v-if="role === 'agencia'" id="cnpj-field">
          <label for="reg-cnpj" class="block text-sm font-medium text-surface-600 mb-1">CNPJ <span class="text-danger">*</span></label>
          <input v-model="cnpj" id="reg-cnpj" type="text" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm" placeholder="00.000.000/0000-00">
        </div>

        <label for="reg-pass" class="block text-sm font-medium text-surface-600 mb-1">Senha</label>
        <input v-model="password" id="reg-pass" type="password" required class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-6 text-sm" placeholder="Mínimo 8 caracteres">

        <button type="submit" class="w-full btn-primary py-3 rounded-lg font-semibold">Cadastrar Minha Conta</button>
      </form>

      <p class="text-center text-sm text-surface-400 mt-6">
        Já possui conta? <router-link to="/login" class="text-brand-500 hover:underline font-medium">Entrar</router-link>
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

const name = ref('')
const email = ref('')
const role = ref('')
const cnpj = ref('')
const password = ref('')

function handleRegister() {
  if (role.value === 'agencia' && !cnpj.value) {
    showToast('CNPJ é obrigatório para Agências!', 'error')
    return
  }

  showToast('Cadastro realizado com sucesso! Redirecionando...', 'success')
  setTimeout(() => {
    if (role.value === 'agencia') router.push('/dashboard-agency')
    else if (role.value === 'cliente') router.push('/dashboard-client')
    else if (role.value === 'redator') router.push('/dashboard-writer')
    else router.push('/dashboard-agency')
  }, 800)
}
</script>
