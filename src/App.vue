<template>
  <div class="min-h-screen flex flex-col bg-surface-100/70 text-surface-800 dark:bg-surface-900 dark:text-surface-100 transition-colors duration-200">
    <router-view />
    <ToastContainer />
    <ChangePasswordModal />
    <DialogHost />
    <MediaViewer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ToastContainer from '@/components/ToastContainer.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal.vue'
import DialogHost from '@/components/DialogHost.vue'
import MediaViewer from '@/components/MediaViewer.vue'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

const { fetchProfile } = useAuth()
const { applyTheme } = useTheme()

onMounted(() => {
  const savedTheme = localStorage.getItem('gad_theme')
  applyTheme(savedTheme !== 'light')

  const token = localStorage.getItem('gad_token')
  if (token) {
    fetchProfile().catch(() => {})
  }
})
</script>