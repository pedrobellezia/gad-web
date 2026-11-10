<template>
  <div class="h-full bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-6 antialiased">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 fade-in border border-surface-200">
      <router-link to="/" class="flex items-center gap-1 text-sm text-surface-400 hover:text-brand-500 mb-6 transition">
        <ArrowLeft class="w-4 h-4" /> Voltar ao início
      </router-link>
      <h2 class="text-2xl font-bold text-surface-800 mb-1">Criar Nova Conta</h2>
      <p class="text-sm text-surface-400 mb-6">Preencha os dados abaixo para se cadastrar</p>

      <form @submit.prevent="handleRegister">
        <label for="reg-name" class="block text-sm font-medium text-surface-600 mb-1">Nome completo / Razão Social</label>
        <input
          v-model="name"
          id="reg-name"
          type="text"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm"
          placeholder="Ex: Agência Digital XYZ ou Seu Nome"
        />

        <label for="reg-email" class="block text-sm font-medium text-surface-600 mb-1">E-mail</label>
        <input
          v-model="email"
          id="reg-email"
          type="email"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm"
          placeholder="seu@email.com"
        />

        <label for="reg-role" class="block text-sm font-medium text-surface-600 mb-1">Tipo de perfil</label>
        <select
          v-model="role"
          id="reg-role"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm bg-white"
        >
          <option value="">Selecione o perfil...</option>
          <option value="agency">Agência</option>
          <option value="client">Cliente</option>
          <option value="writer">Redator</option>
          <option value="designer">Designer</option>
        </select>

        <div v-if="role === 'agency'" id="cnpj-field">
          <label for="reg-cnpj" class="block text-sm font-medium text-surface-600 mb-1">CNPJ <span class="text-danger">*</span></label>
          <input
            v-model="cnpj"
            id="reg-cnpj"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-4 text-sm"
            placeholder="00.000.000/0000-00 ou 14 dígitos"
          />
        </div>

        <label for="reg-pass" class="block text-sm font-medium text-surface-600 mb-1">Senha</label>
        <input
          v-model="password"
          id="reg-pass"
          type="password"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none mb-6 text-sm"
          placeholder="Mínimo 8 caracteres"
        />

        <button type="submit" :disabled="isLoading" class="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50">
          {{ isLoading ? 'Cadastrando...' : 'Cadastrar Minha Conta' }}
        </button>
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
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'
import type { RegisterPayload } from '@/api/auth'
import { ArrowLeft } from '@lucide/vue'

const router = useRouter()
const { register, isLoading } = useAuth()
const { showToast } = useToast()

const name = ref('')
const email = ref('')
const role = ref<'agency' | 'client' | 'writer' | 'designer' | ''>('')
const cnpj = ref('')
const password = ref('')

async function handleRegister() {
  if (!role.value) {
    showToast('Selecione o tipo de perfil!', 'error')
    return
  }

  let payload: RegisterPayload
  if (role.value === 'agency') {
    const cleanCnpj = cnpj.value.replace(/\D/g, '')
    if (cleanCnpj.length !== 14) {
      showToast('CNPJ deve conter 14 dígitos válidos!', 'error')
      return
    }
    payload = {
      kind: 'agency',
      cnpj: cleanCnpj,
      user: {
        name: name.value.trim(),
        email: email.value.trim(),
        pswd: password.value
      }
    }
  } else {
    payload = {
      kind: role.value,
      user: {
        name: name.value.trim(),
        email: email.value.trim(),
        pswd: password.value
      }
    }
  }

  try {
    await register(payload)
    router.push('/login')
  } catch {}
}
</script>
