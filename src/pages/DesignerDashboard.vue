<template>
  <div class="h-screen bg-surface-100/70 dark:bg-surface-900 text-surface-800 dark:text-surface-100 antialiased flex overflow-hidden transition-colors duration-200">
    <!-- Sidebar -->
    <aside class="w-64 bg-surface-50 dark:bg-surface-950/80 border-r border-surface-200 dark:border-surface-800 flex flex-col shrink-0 transition-colors duration-200">
      <div class="px-5 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 group">
          <span class="font-extrabold text-brand-600 dark:text-brand-400 text-2xl tracking-tight">GAD</span>
        </router-link>

        <button
          type="button"
          @click="toggleTheme"
          class="btn-secondary p-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center"
          :title="isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'"
        >
          <Sun v-if="isDark" class="w-4 h-4 text-mint-400" />
          <Moon v-else class="w-4 h-4 text-brand-600" />
        </button>
      </div>

      <nav class="flex-1 py-4 px-3 space-y-1">
        <button
          @click="currentSection = 'gallery'"
          :class="['nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition',
            { active: currentSection === 'gallery' }]"
        >
          <Image class="w-4 h-4" />
          <span>Galeria de Mídias</span>
          <span v-if="myMedias.length" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-surface-200/80 dark:bg-surface-800 text-surface-700 dark:text-surface-200 font-semibold" title="Mídias enviadas por você">
            {{ myMedias.length }}
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
    <main class="flex-1 overflow-auto p-8 bg-surface-100/70 dark:bg-surface-900 transition-colors duration-200">
      <!-- Section: Galeria de Mídias -->
      <div v-if="currentSection === 'gallery'" class="fade-in space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Galeria de Mídias</h1>
            <p class="text-sm text-surface-500 dark:text-surface-400">Faça upload de fotos e vídeos para serem utilizados nos posts da agência</p>
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
        <div v-if="loadingMedias" class="text-center py-12 text-surface-500 dark:text-surface-400 text-sm">
          Carregando acervo de mídias...
        </div>

        <!-- Empty state -->
        <div v-else-if="medias.length === 0" class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-12 text-center max-w-md mx-auto shadow-xs dark:shadow-card-dark">
          <div class="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto mb-4">
            <Image class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-surface-800 dark:text-surface-100 mb-1">Nenhuma mídia cadastrada</h3>
          <p class="text-xs text-surface-500 dark:text-surface-400 mb-6">Envie suas primeiras imagens ou vídeos para iniciar o acervo da agência.</p>
          <button @click="openUploadMediaModal" class="btn-primary px-4 py-2 rounded-lg text-sm font-medium">
            Enviar Agora
          </button>
        </div>

        <!-- Mesma grade da biblioteca da agência; o designer edita só as próprias mídias -->
        <template v-else>
          <div class="flex gap-1 bg-surface-50 dark:bg-surface-800/90 border border-surface-200 dark:border-surface-700/80 p-1 rounded-lg text-xs w-fit">
            <button
              v-for="opt in ownerOptions"
              :key="opt.value"
              type="button"
              @click="ownerFilter = opt.value"
              :class="['px-2.5 py-1 rounded-md font-medium transition', ownerFilter === opt.value ? 'bg-brand-500 text-white' : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100']"
            >
              {{ opt.label }} ({{ opt.value === 'mine' ? myMedias.length : medias.length }})
            </button>
          </div>

          <MediaLibraryGrid
            :medias="visibleMedias"
            :empty-text="ownerFilter === 'mine' ? 'Você ainda não enviou mídias.' : 'Nenhuma mídia enviada ainda para esta agência.'"
          >
            <template #actions="{ media }">
              <button
                v-if="isMine(media)"
                type="button"
                @click="openMediaDetailModal(media)"
                class="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 shrink-0"
              >
                <Edit class="w-3.5 h-3.5" />Editar
              </button>
              <button
                v-else
                type="button"
                @click="openMediaDetailModal(media)"
                class="p-1.5 -mr-1 rounded-md text-surface-500 hover:text-surface-800 hover:bg-surface-200/70 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/70 transition shrink-0"
                title="Detalhes da mídia"
              >
                <Menu class="w-4 h-4" />
              </button>
            </template>
          </MediaLibraryGrid>
        </template>
      </div>

      <!-- Section: Vínculo com Agência -->
      <div v-else-if="currentSection === 'agency'" :class="['fade-in space-y-6', linkedAgency ? 'max-w-5xl' : 'max-w-2xl']">
        <div>
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Vínculo com Agência</h1>
          <p class="text-sm text-surface-500 dark:text-surface-400">Gerencie a conexão da sua conta de Designer com uma agência cadastrada</p>
        </div>

        <LinkedAgencyOverview v-if="linkedAgency" :agency="linkedAgency" :show-clients="true" :unlinking="unlinking" @unlink="handleUnlink" />

        <div v-else class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xs dark:shadow-card-dark space-y-4">
          <div class="w-10 h-10 rounded-xl bg-surface-200/70 dark:bg-surface-700/70 text-surface-600 dark:text-surface-300 flex items-center justify-center">
            <Key class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-surface-900 dark:text-surface-100">Vincular a uma Agência</h3>
            <p class="text-xs text-surface-500 dark:text-surface-400 mt-1">
              Insira o token de convite fornecido pelo gestor da agência para associar sua conta de Designer à equipe criativa.
            </p>
          </div>

          <div class="space-y-3 pt-2">
            <input
              v-model="tokenInput"
              type="text"
              placeholder="Ex: K7M2QP"
              autocomplete="off"
              autocapitalize="characters"
              spellcheck="false"
              class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/25 outline-none text-sm font-mono uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500"
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
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Meu Perfil</h1>
          <p class="text-sm text-surface-500 dark:text-surface-400">Informações pessoais e segurança da conta</p>
        </div>

        <div class="bg-surface-50 dark:bg-surface-800/85 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-xs dark:shadow-card-dark space-y-6">
          <AvatarUpload />

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-600 dark:text-surface-400 mb-1">Nome Completo</label>
              <input
                v-model="profileName"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 focus:border-brand-500 dark:focus:border-brand-400 outline-none text-sm bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase text-surface-600 dark:text-surface-400 mb-1">E-mail</label>
              <input
                :value="user?.email"
                disabled
                type="email"
                class="w-full px-4 py-2.5 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-900/60 text-surface-500 text-sm cursor-not-allowed"
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

          <div class="pt-6 border-t border-surface-200 dark:border-surface-700/80 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-semibold text-surface-800 dark:text-surface-100">Segurança</h4>
              <p class="text-xs text-surface-500 dark:text-surface-400">Altere sua senha de acesso periodicamente</p>
            </div>
            <button
              @click="openChangePasswordModal"
              class="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
            >
              Alterar Senha
            </button>
          </div>

          <div class="pt-6 border-t border-surface-200 dark:border-surface-700/80 flex items-center justify-between">
            <div>
              <h4 class="text-xs font-medium text-surface-600 dark:text-surface-300">Desativação da conta</h4>
              <p class="text-[11px] text-surface-500 dark:text-surface-400">Você perderá o acesso e vínculos com agências até reativar</p>
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
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useDashboardSection } from '@/composables/useDashboardSection'
import { useMedia } from '@/composables/useMedia'
import { useModals } from '@/composables/useModals'
import { useToast } from '@/composables/useToast'
import { useTheme } from '@/composables/useTheme'
import { agencyApi } from '@/api/agency'
import { meApi } from '@/api/me'
import type { AgencyPublic, MediaItem } from '@/types/api'
import UploadMediaModal from '@/components/UploadMediaModal.vue'
import SidebarUserFooter from '@/components/SidebarUserFooter.vue'
import LinkedAgencyOverview from '@/components/LinkedAgencyOverview.vue'
import MediaDetailModal from '@/components/MediaDetailModal.vue'
import MediaLibraryGrid from '@/components/MediaLibraryGrid.vue'
import AvatarUpload from '@/components/AvatarUpload.vue'
import {
  Image,
  Building2,
  User,
  Upload,
  Edit,
  Menu,
  Key,
  Link as LinkIcon,
  Unlink,
  Sun,
  Moon
} from '@lucide/vue'

const { confirmDialog } = useDialog()
const { user, logout, fetchProfile } = useAuth()
const { medias, isLoading: loadingMedias, fetchMedias } = useMedia()

// A API lista a biblioteca inteira da agência; o designer edita só as próprias mídias
type OwnerFilter = 'mine' | 'all'
const ownerFilter = ref<OwnerFilter>('mine')
const ownerOptions: { value: OwnerFilter; label: string }[] = [
  { value: 'mine', label: 'Minhas mídias' },
  { value: 'all', label: 'Todas da agência' }
]

function isMine(media: MediaItem): boolean {
  return !!user.value && media.designer_id === user.value.id
}

const myMedias = computed(() => medias.value.filter(isMine))
const visibleMedias = computed(() => (ownerFilter.value === 'mine' ? myMedias.value : medias.value))
const { openUploadMediaModal, openMediaDetailModal, openChangePasswordModal } = useModals()
const { showToast } = useToast()
const { isDark, toggleTheme } = useTheme()

const currentSection = useDashboardSection(['gallery', 'agency', 'profile'] as const, 'gallery')
const profileName = ref('')
const linkedAgency = ref<AgencyPublic | null>(null)
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
  if (!(await confirmDialog({ title: 'Desvincular da agência', message: 'Deseja realmente se desvincular desta agência?', confirmLabel: 'Desvincular', danger: true }))) return
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
  if (!(await confirmDialog({ title: 'Desativar conta', message: 'Tem certeza absoluta que deseja desativar sua conta? Você será deslogado imediatamente.', confirmLabel: 'Desativar', danger: true }))) return
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