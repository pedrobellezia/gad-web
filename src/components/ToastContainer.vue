<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast pointer-events-auto shadow-lg"
        :style="{ background: getBgColor(toast.type) }"
      >
        <component :is="getIcon(toast.type)" class="w-4 h-4 text-white shrink-0" />
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast, ToastType } from '@/composables/useToast'
import { CheckCircle, AlertCircle, AlertTriangle, Info } from '@lucide/vue'

const { toasts } = useToast()

function getBgColor(type: ToastType) {
  const colors: Record<ToastType, string> = {
    success: '#2f9e44',
    error: '#e03131',
    info: '#4c6ef5',
    warning: '#e67700'
  }
  return colors[type] || colors.info
}

function getIcon(type: ToastType) {
  if (type === 'success') return CheckCircle
  if (type === 'error') return AlertCircle
  if (type === 'warning') return AlertTriangle
  return Info
}
</script>
