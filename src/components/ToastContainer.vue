<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast pointer-events-auto shadow-lg dark:shadow-card-dark flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-surface-50 border border-surface-100/20 dark:border-surface-900/30 transition-all duration-200"
        :style="{ background: getBgColor(toast.type) }"
      >
        <component :is="getIcon(toast.type)" class="w-4 h-4 text-surface-50 shrink-0" />
        <span class="leading-snug">{{ toast.message }}</span>
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