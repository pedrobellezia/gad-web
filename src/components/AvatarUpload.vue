<template>
  <div class="flex items-center gap-5 p-4 bg-surface-50 rounded-xl border border-surface-200">
    <!-- Avatar Preview -->
    <div class="relative group shrink-0">
      <div
        :class="[
          'w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl select-none overflow-hidden shadow-xs border-2 border-white ring-2 ring-surface-200',
          avatarBgClass
        ]"
      >
        <img
          v-if="userAvatarUrl"
          :src="userAvatarUrl"
          :alt="currentUser?.name || 'Avatar'"
          class="w-full h-full object-cover"
        />
        <span v-else class="text-surface-700">
          {{ userInitials }}
        </span>
      </div>

      <!-- Loading overlay -->
      <div
        v-if="isUploading"
        class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white"
      >
        <Loader2 class="w-6 h-6 animate-spin" />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-semibold text-surface-800 mb-0.5">Foto de Perfil</h4>
      <p class="text-xs text-surface-400 mb-3">Formatos aceitos: PNG ou JPEG (máx. 5MB)</p>

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
          class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium text-danger hover:bg-red-50 hover:border-red-200 inline-flex items-center gap-1.5 disabled:opacity-50"
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
      return 'bg-brand-100 text-brand-700'
    case 'writer':
      return 'bg-purple-100 text-purple-700'
    case 'designer':
      return 'bg-pink-100 text-pink-700'
    case 'client':
      return 'bg-emerald-100 text-emerald-700'
    default:
      return 'bg-surface-200 text-surface-600'
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
