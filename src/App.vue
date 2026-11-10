<template>
  <div class="h-full flex flex-col">
    <router-view />
    <ToastContainer />
    <ThemeToggle />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ToastContainer from '@/components/ToastContainer.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

const { fetchProfile } = useAuth()
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
  const token = localStorage.getItem('gad_token')
  if (token) {
    fetchProfile().catch(() => {})
  }
})
</script>
