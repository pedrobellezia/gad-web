<template>
  <button
    v-if="route.path !== '/'"
    @click="toggleTheme"
    type="button"
    :title="isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
    class="fixed bottom-6 right-6 z-50 p-3.5 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 group focus:outline-none"
    :class="[
      isDark
        ? 'bg-surface-800 text-amber-400 border border-surface-700 hover:bg-surface-700 shadow-brand/20'
        : 'bg-white text-surface-700 border border-surface-200 hover:bg-surface-50 hover:text-brand-600 shadow-surface-900/10'
    ]"
    aria-label="Alternar tema"
  >
    <Sun v-if="isDark" class="w-5 h-5 transition-transform group-hover:rotate-45" />
    <Moon v-else class="w-5 h-5 transition-transform group-hover:-rotate-12" />
  </button>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { Sun, Moon } from '@lucide/vue'

const route = useRoute()
const { isDark, toggleTheme } = useTheme()
</script>
