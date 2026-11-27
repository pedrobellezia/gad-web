<template>
  <div class="min-h-full flex-1 bg-gradient-to-br from-brand-50/80 via-surface-100 to-surface-200/60 dark:from-brand-950/50 dark:via-surface-900 dark:to-surface-950 flex items-center justify-center p-6 antialiased transition-colors duration-200">
    <div class="w-full max-w-md bg-surface-50 dark:bg-surface-800/90 rounded-2xl shadow-xl dark:shadow-card-dark p-8 fade-in border border-surface-200 dark:border-surface-700/80 backdrop-blur-sm">
      <div class="flex items-center justify-between mb-6">
        <router-link to="/" class="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-300 transition">
          <ArrowLeft class="w-4 h-4" /> Voltar
        </router-link>
        <img src="/favicon.png" alt="GAD" class="h-8 w-8 object-contain" />
      </div>

      <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-1">Criar Nova Conta</h2>
      <p class="text-sm text-surface-600 dark:text-surface-400 mb-6">Preencha os dados abaixo para se cadastrar</p>

      <form @submit.prevent="handleRegister">
        <label for="reg-role" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">
          Tipo de perfil <span class="text-danger">*</span>
        </label>
        <select
          v-model="role"
          id="reg-role"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-4 text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors"
        >
          <option value="" class="bg-surface-50 dark:bg-surface-900 text-surface-500 dark:text-surface-400">Selecione o perfil...</option>
          <option value="agency" class="bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">Agência</option>
          <option value="client" class="bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">Cliente</option>
          <option value="writer" class="bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">Redator</option>
          <option value="designer" class="bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100">Designer</option>
        </select>

        <div v-if="role === 'agency'" id="cnpj-field">
          <label for="reg-cnpj" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">
            CNPJ da Agência <span class="text-danger">*</span>
          </label>
          <input
            v-model="cnpj"
            id="reg-cnpj"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-4 text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors"
            placeholder="00.000.000/0000-00 ou 14 dígitos"
          />
        </div>

        <label for="reg-name" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">
          {{ role === 'agency' ? 'Razão Social / Nome da Agência' : role === 'client' ? 'Nome da Empresa / Cliente' : 'Nome completo' }}
        </label>
        <input
          v-model="name"
          id="reg-name"
          type="text"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-4 text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors"
          :placeholder="role === 'agency' ? 'Ex: Agência Criativa Ltda' : 'Seu nome completo'"
        />

        <label for="reg-email" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">E-mail</label>
        <input
          v-model="email"
          id="reg-email"
          type="email"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-4 text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors"
          placeholder="seu@email.com"
        />

        <label for="reg-pass" class="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Senha</label>
        <input
          v-model="password"
          id="reg-pass"
          type="password"
          required
          class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none mb-4 text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 transition-colors"
          placeholder="Mínimo 8 caracteres"
        />

        <div class="flex items-start gap-2.5 mb-6">
          <input
            v-model="termsAccepted"
            id="reg-terms"
            type="checkbox"
            required
            class="mt-0.5 h-4 w-4 rounded border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-900 text-brand-600 focus:ring-brand-500 cursor-pointer shrink-0"
          />
          <label for="reg-terms" class="text-xs text-surface-600 dark:text-surface-300 leading-relaxed cursor-pointer select-none">
            Li e concordo com os
            <router-link to="/terms" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">Termos de Uso</router-link>
            e com a
            <router-link to="/privacy" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">Política de Privacidade</router-link>.
          </label>
        </div>

        <button type="submit" :disabled="isLoading" class="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50">
          {{ isLoading ? 'Cadastrando...' : 'Cadastrar Minha Conta' }}
        </button>
      </form>

      <p class="text-center text-sm text-surface-600 dark:text-surface-400 mt-6">
        Já possui conta?
        <router-link to="/login" class="text-brand-600 dark:text-brand-400 hover:underline font-medium">Entrar</router-link>
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
const termsAccepted = ref(false)

async function handleRegister() {
  if (!termsAccepted.value) {
    showToast('Você deve aceitar os Termos de Uso e a Política de Privacidade para continuar!', 'error')
    return
  }

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