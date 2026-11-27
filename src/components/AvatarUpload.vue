<template>
  <div class="flex items-center gap-5 p-4 bg-surface-100/75 dark:bg-surface-900/75 rounded-xl border border-surface-200 dark:border-surface-700/80 transition-colors duration-200">
    <!-- Avatar Preview -->
    <div class="relative group shrink-0">
      <div
        :class="[
          'w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl select-none overflow-hidden shadow-xs border-2 border-surface-50 dark:border-surface-800 ring-2 ring-surface-200 dark:ring-surface-700',
          avatarBgClass
        ]"
      >
        <img
          v-if="userAvatarUrl"
          :src="userAvatarUrl"
          :alt="currentUser?.name || 'Avatar'"
          class="w-full h-full object-cover"
        />
        <span v-else>
          {{ userInitials }}
        </span>
      </div>

      <!-- Loading overlay -->
      <div
        v-if="isUploading"
        class="absolute inset-0 bg-surface-950/65 rounded-full flex items-center justify-center text-surface-50"
      >
        <Loader2 class="w-6 h-6 animate-spin" />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-0.5">Foto de Perfil</h4>
      <p class="text-xs text-surface-500 dark:text-surface-400 mb-3">Formatos aceitos: PNG ou JPEG (máx. 5MB)</p>

      <div class="flex items-center gap-2 flex-wrap">
        <label
          :class="[
            'btn-primary px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer inline-flex items-center gap-1.5',
            { 'opacity-50 pointer-events-none': isUploading }
          ]"
        >
          <Camera class="w-3.5 h-3.5" />
          <span>{{ userAvatarUrl ? 'Trocar foto' : 'Enviar foto' }}</span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            class="hidden"
            :disabled="isUploading"
            @change="handleFileChange"
          />
        </label>

        <button
          v-if="currentUser?.avatar"
          type="button"
          :disabled="isUploading"
          @click="handleRemoveAvatar"
          class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium text-danger dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/15 hover:border-red-200 dark:hover:border-red-500/30 inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <Trash2 class="w-3.5 h-3.5" />
          Remover
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'
import { meApi } from '@/api/me'
import { Camera, Trash2, Loader2 } from '@lucide/vue'

const { currentUser, userAvatarUrl, fetchProfile } = useAuth()
const { showToast } = useToast()
const isUploading = ref(false)

const userInitials = computed(() => {
  if (!currentUser.value?.name) return 'U'
  const parts = currentUser.value.name.trim().split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return currentUser.value.name.slice(0, 2).toUpperCase()
})

const avatarBgClass = computed(() => {
  switch (currentUser.value?.type) {
    case 'agency':
      return 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300'
    case 'writer':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'
    case 'designer':
      return 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300'
    case 'client':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
    default:
      return 'bg-surface-200 text-surface-700 dark:bg-surface-800 dark:text-surface-200'
  }
})

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
    showToast('Apenas imagens JPEG ou PNG são aceitas!', 'error')
    target.value = ''
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    showToast('A imagem não pode ultrapassar 5MB!', 'error')
    target.value = ''
    return
  }

  isUploading.value = true
  try {
    await meApi.updateAvatar(file)
    await fetchProfile()
    showToast('Foto de perfil atualizada com sucesso!', 'success')
  } catch (err: any) {
    showToast(err.message || 'Erro ao atualizar foto de perfil', 'error')
  } finally {
    isUploading.value = false
    target.value = ''
  }
}

async function handleRemoveAvatar() {
  if (!confirm('Deseja realmente remover sua foto de perfil?')) return
  isUploading.value = true
  try {
    await meApi.deleteAvatar()
    await fetchProfile()
    showToast('Foto de perfil removida com sucesso!', 'success')
  } catch (err: any) {
    showToast(err.message || 'Erro ao remover foto de perfil', 'error')
  } finally {
    isUploading.value = false
  }
}
</script>