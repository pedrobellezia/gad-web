<template>
  <div class="h-full flex flex-col">
    <router-view />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ToastContainer from '@/components/ToastContainer.vue'
import { useAuth } from '@/composables/useAuth'

const { fetchProfile } = useAuth()

onMounted(() => {
  const token = localStorage.getItem('gad_token')
  if (token) {
    fetchProfile().catch(() => {})
  }
})
</script>
