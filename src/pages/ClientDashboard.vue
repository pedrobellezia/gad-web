<template>
  <div class="h-full bg-surface-50 text-surface-800 antialiased flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
      <router-link to="/" class="p-5 border-b border-surface-200 flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <PenTool class="w-4 h-4 text-white" />
        </div>
        <span class="font-bold text-surface-800">GAD Cliente</span>
      </router-link>
      <nav class="flex-1 py-4 px-3 space-y-1">
        <button
          @click="currentSection = 'posts'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'posts' }]"
        >
          <FileText class="w-4 h-4" />Meus Posts
        </button>
        <button
          @click="currentSection = 'instagram'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'instagram' }]"
        >
          <Camera class="w-4 h-4" />Instagram
        </button>
        <button
          @click="currentSection = 'token'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left', { active: currentSection === 'token' }]"
        >
          <Key class="w-4 h-4" />Token de Vínculo
        </button>
      </nav>
      <div class="p-4 border-t border-surface-200">
        <router-link to="/" class="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-400 hover:text-danger rounded-lg transition">
          <LogOut class="w-4 h-4" />Sair
        </router-link>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-8 bg-surface-50">
      <div v-if="currentSection === 'posts'" class="fade-in">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-surface-800">Meus Posts para Aprovação</h1>
            <p class="text-sm text-surface-400">Loja ABC · Vinculado à Agência Digital XYZ</p>
          </div>
        </div>

        <!-- Post Awaiting Approval -->
        <div class="bg-white rounded-xl border border-surface-200 p-6 mb-4 card-hover shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <h4 class="font-semibold text-surface-700">Carrossel - Dicas de Saúde</h4>
              <StatusBadge status="pending" />
            </div>
            <span class="text-xs text-surface-400">24/05/2026</span>
          </div>
          <p class="text-sm text-surface-500 mb-4 leading-relaxed">
            Post educativo sobre hábitos saudáveis para o perfil da clínica. Inclui 4 slides com dicas práticas e 1 slide final com chamada para ação (CTA).
          </p>
          <div class="flex items-center gap-2">
            <button @click="openApprovalModal('approve')" class="btn-success px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
              <Check class="w-4 h-4" />Aprovar
            </button>
            <button @click="openApprovalModal('reject')" class="btn-danger px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
              <X class="w-4 h-4" />Rejeitar
            </button>
            <button @click="openApprovalModal('change')" class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
              <Edit class="w-4 h-4" />Solicitar Alteração
            </button>
          </div>
        </div>

        <!-- Approved Post -->
        <div class="bg-white rounded-xl border border-surface-200 p-6 card-hover shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <h4 class="font-semibold text-surface-700">Post Instagram - Promoção Verão</h4>
              <StatusBadge status="approved" />
            </div>
            <span class="text-xs text-surface-400">23/05/2026</span>
          </div>
          <p class="text-sm text-surface-500">Carrossel com 5 slides sobre a promoção de verão da loja.</p>
        </div>
      </div>

      <div v-if="currentSection === 'instagram'" class="fade-in">
        <h2 class="text-2xl font-bold text-surface-800 mb-4">Integração Instagram</h2>
        <div class="bg-white rounded-xl p-6 border border-surface-200 max-w-md shadow-sm">
          <p class="text-sm text-surface-500 mb-4">Conecte sua conta do Instagram Business para agendar postagens automáticas.</p>
          <button @click="showToast('Instagram conectado com sucesso!', 'success')" class="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
            <Camera class="w-4 h-4" />Conectar Conta
          </button>
        </div>
      </div>

      <div v-if="currentSection === 'token'" class="fade-in">
        <h2 class="text-2xl font-bold text-surface-800 mb-4">Token de Vínculo</h2>
        <div class="bg-white rounded-xl p-6 border border-surface-200 max-w-md shadow-sm">
          <p class="text-sm text-surface-500 mb-4">Insira um novo token fornecido pela sua agência para atualizar seu vínculo.</p>
          <input v-model="tokenInput" type="text" placeholder="TKN-XXXX-XXXX" class="w-full px-4 py-2.5 rounded-lg border border-surface-300 outline-none text-sm mb-4">
          <button @click="validateToken" class="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium">Validar Token</button>
        </div>
      </div>
    </main>

    <!-- Approval Modal -->
    <ApprovalModal />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StatusBadge from '@/components/StatusBadge.vue'
import ApprovalModal from '@/components/ApprovalModal.vue'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { PenTool, FileText, Camera, Key, LogOut, Check, X, Edit } from '@lucide/vue'

const currentSection = ref('posts')
const tokenInput = ref('')

const { openApprovalModal } = useModals()
const { showToast } = useToast()

function validateToken() {
  if (!tokenInput.value.trim()) {
    showToast('Informe um token válido!', 'error')
    return
  }
  showToast('Vínculo atualizado!', 'success')
  tokenInput.value = ''
}
</script>
