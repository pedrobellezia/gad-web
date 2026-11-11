<template>
  <div class="h-full bg-surface-50 text-surface-800 antialiased flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
      <router-link to="/" class="px-5 py-4 border-b border-surface-200 flex items-center hover:bg-surface-50 transition group">
        <span class="font-extrabold text-brand-600 text-2xl tracking-tight">GAD</span>
      </router-link>

      <nav class="flex-1 py-4 px-3 space-y-1">
        <button
          @click="currentSection = 'gallery'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'gallery' }]"
        >
          <Image class="w-4 h-4" />
          <span>Minha Galeria</span>
          <span v-if="medias.length" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-surface-100 text-surface-600 font-semibold">
            {{ medias.length }}
          </span>
        </button>

        <button
          @click="currentSection = 'agency'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'agency' }]"
        >
          <Building2 class="w-4 h-4" />
          <span>Vínculo com Agência</span>
        </button>

        <button
          @click="currentSection = 'profile'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'profile' }]"
        >
          <User class="w-4 h-4" />
          <span>Meu Perfil</span>
        </button>
      </nav>

      <SidebarUserFooter />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-8 bg-surface-50">
      <!-- Section: Galeria de Mídias -->
      <div v-if="currentSection === 'gallery'" class="fade-in space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-surface-800">Minha Galeria de Mídias</h1>
            <p class="text-sm text-surface-400">Faça upload de fotos e vídeos para serem utilizados nos posts da agência</p>
          </div>
          <button
            @click="openUploadMediaModal"
            class="btn-primary px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 self-start"
          >
            <Upload class="w-4 h-4" />
            <span>Enviar Novas Mídias</span>
          </button>
        </div>

        <!-- Loading state -->
        <div v-if="loadingMedias" class="text-center py-12 text-surface-400 text-sm">
          Carregando acervo de mídias...
        </div>

        <!-- Empty state -->
        <div v-else-if="medias.length === 0" class="bg-white rounded-2xl border border-surface-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <div class="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
            <Image class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-surface-700 mb-1">Nenhuma mídia cadastrada</h3>
          <p class="text-xs text-surface-400 mb-6">Envie suas primeiras imagens ou vídeos para iniciar o acervo da agência.</p>
          <button @click="openUploadMediaModal" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">
            Enviar Agora
          </button>
        </div>

        <!-- Medias Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="media in medias"
            :key="media.id"
            class="bg-white rounded-xl border border-surface-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group cursor-pointer"
            @click="openMediaDetailModal(media)"
          >
            <!-- Media Thumbnail Placeholder / Header -->
            <div class="h-40 bg-surface-100 flex items-center justify-center relative overflow-hidden">
              <span class="text-xs font-mono uppercase px-2 py-1 bg-surface-900/60 text-white rounded-md backdrop-blur-xs">
                {{ media.mime_type.split('/')[1] }}
              </span>
              <span class="absolute top-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                {{ (media.size_bytes / 1024).toFixed(0) }} KB
              </span>
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-semibold text-surface-800 text-sm truncate mb-1" :title="media.alias">
                  {{ media.alias }}
                </h4>
                <p class="text-xs text-surface-400 truncate">
                  {{ media.filename }}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-400">
                <span class="text-[11px] font-medium text-brand-600">Ver detalhes & histórico</span>
                <ChevronRight class="w-4 h-4 text-surface-300 group-hover:text-brand-500 transition" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Vínculo com Agência -->
      <div v-else-if="currentSection === 'agency'" class="fade-in space-y-6 max-w-2xl">
        <div>
          <h1 class="text-2xl font-bold text-surface-800">Vínculo com Agência</h1>
          <p class="text-sm text-surface-400">Gerencie a conexão da sua conta de Designer com uma agência cadastrada</p>
        </div>

        <!-- Se já vinculado -->
        <div v-if="linkedAgency" class="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Building2 class="w-6 h-6" />
            </div>
            <div>
              <span class="text-xs text-success-600 font-semibold tracking-wider uppercase block">Vinculado Atualmente</span>
              <h3 class="text-lg font-bold text-surface-800">{{ linkedAgency.user.name }}</h3>
              <p class="text-xs text-surface-400">{{ linkedAgency.user.email }}</p>
            </div>
          </div>

          <div class="bg-surface-50 p-4 rounded-xl border border-surface-200 text-xs space-y-1">
            <p><strong class="text-surface-700">CNPJ:</strong> {{ linkedAgency.cnpj }}</p>
            <p><strong class="text-surface-700">Status:</strong> Conta Ativa</p>
          </div>

          <div class="pt-2">
            <button
              @click="handleUnlink"
              :disabled="unlinking"
              class="btn-danger px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <Unlink class="w-4 h-4" />
              <span>{{ unlinking ? 'Desvinculando...' : 'Desvincular Desta Agência' }}</span>
            </button>
          </div>
        </div>

        <!-- Se não vinculado -->
        <div v-else class="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs space-y-4">
          <div class="w-10 h-10 rounded-xl bg-surface-100 text-surface-500 flex items-center justify-center">
            <Key class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-surface-800">Vincular a uma Agência</h3>
            <p class="text-xs text-surface-500 mt-1">
              Insira o token de convite fornecido pelo gestor da agência para associar sua conta de Designer à equipe criativa.
            </p>
          </div>

          <div class="space-y-3 pt-2">
            <input
              v-model="tokenInput"
              type="text"
              placeholder="Ex: TKN-12345678"
              class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm font-mono"
            />
            <button
              @click="handleLinkAgency"
              :disabled="linking || !tokenInput.trim()"
              class="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <LinkIcon class="w-4 h-4" />
              <span>{{ linking ? 'Vinculando...' : 'Vincular com Token' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Section: Meu Perfil -->
      <div v-else-if="currentSection === 'profile'" class="fade-in space-y-6 max-w-2xl">
        <div>
          <h1 class="text-2xl font-bold text-surface-800">Meu Perfil</h1>
          <p class="text-sm text-surface-400">Informações pessoais e segurança da conta</p>
        </div>

        <div class="bg-white rounded-2xl border border-surface-200 p-6 shadow-xs space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-500 mb-1">Nome Completo</label>
              <input
                v-model="profileName"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:border-brand-500 outline-none text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-500 mb-1">E-mail</label>
              <input
                :value="user?.email"
                disabled
                type="email"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-200 bg-surface-50 text-surface-400 text-sm cursor-not-allowed"
              />
            </div>

            <div class="flex justify-end">
              <button
                @click="handleSaveProfile"
                :disabled="savingProfile || profileName === user?.name"
                class="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {{ savingProfile ? 'Salvando...' : 'Atualizar Nome' }}
              </button>
            </div>
          </div>

          <div class="pt-6 border-t border-surface-200 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-semibold text-surface-800">Segurança</h4>
              <p class="text-xs text-surface-400">Altere sua senha de acesso periodicamente</p>
            </div>
            <button
              @click="openChangePasswordModal"
              class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
            >
              Alterar Senha
            </button>
          </div>

          <div class="pt-6 border-t border-surface-200 flex items-center justify-between">
            <div>
              <h4 class="text-xs font-medium text-surface-500">Desativação da conta</h4>
              <p class="text-[11px] text-surface-400">Você perderá o acesso e vínculos com agências até reativar</p>
            </div>
            <button
              @click="handleDeactivateAccount"
              class="text-xs text-danger hover:underline font-medium"
            >
              Desativar conta
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modais -->
    <UploadMediaModal />
    <MediaDetailModal />
    <ChangePasswordModal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useMedia } from '@/composables/useMedia'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { agencyApi } from '@/api/agency'
import { meApi } from '@/api/me'
import type { Agency } from '@/types/api'
import UploadMediaModal from '@/components/UploadMediaModal.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import MediaDetailModal from '@/components/MediaDetailModal.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal.vue'
import {
  Palette,
  Image,
  Building2,
  User,
  LogOut,
  Upload,
  ChevronRight,
  Key,
  Link as LinkIcon,
  Unlink
} from '@lucide/vue'

const router = useRouter()
const { user, logout, fetchProfile } = useAuth()
const { medias, isLoading: loadingMedias, fetchMedias } = useMedia()
const { openUploadMediaModal, openMediaDetailModal, openChangePasswordModal } = useModals()
const { showToast } = useToast()

const currentSection = ref<'gallery' | 'agency' | 'profile'>('gallery')
const profileName = ref('')
const linkedAgency = ref<Agency | null>(null)
const tokenInput = ref('')
const linking = ref(false)
const unlinking = ref(false)
const savingProfile = ref(false)

onMounted(async () => {
  await fetchProfile()
  if (user.value) {
    profileName.value = user.value.name
  }
  fetchMedias()
  loadAgencyInfo()
})

async function loadAgencyInfo() {
  try {
    linkedAgency.value = await agencyApi.getMyAgency()
  } catch {
    linkedAgency.value = null
  }
}

async function handleLinkAgency() {
  if (!tokenInput.value.trim()) return
  linking.value = true
  try {
    const res = await agencyApi.linkByToken(tokenInput.value.trim())
    showToast(res.details || 'Vinculado com sucesso!', 'success')
    tokenInput.value = ''
    await loadAgencyInfo()
  } catch (err: any) {
    showToast(err.message || 'Erro ao vincular agência', 'error')
  } finally {
    linking.value = false
  }
}

async function handleUnlink() {
  if (!confirm('Deseja realmente se desvincular desta agência?')) return
  unlinking.value = true
  try {
    const res = await agencyApi.selfUnlink()
    showToast(res.details || 'Desvinculado com sucesso', 'success')
    linkedAgency.value = null
  } catch (err: any) {
    showToast(err.message || 'Erro ao desvincular', 'error')
  } finally {
    unlinking.value = false
  }
}

async function handleSaveProfile() {
  if (!profileName.value.trim()) return
  savingProfile.value = true
  try {
    await meApi.updateProfile({ name: profileName.value.trim() })
    await fetchProfile()
    showToast('Perfil atualizado!', 'success')
  } catch (err: any) {
    showToast(err.message || 'Erro ao atualizar perfil', 'error')
  } finally {
    savingProfile.value = false
  }
}

async function handleDeactivateAccount() {
  if (!confirm('Tem certeza absoluta que deseja desativar sua conta? Você será deslogado imediatamente.')) return
  try {
    await meApi.deactivateAccount()
    showToast('Conta desativada com sucesso.', 'info')
    logout()
  } catch (err: any) {
    showToast(err.message || 'Erro ao desativar conta', 'error')
  }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR')
  } catch {
    return iso
  }
}
</script>
