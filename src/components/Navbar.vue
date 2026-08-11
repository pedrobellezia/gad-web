<template>
  <nav class="w-full flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-sm border-b border-surface-200 sticky top-0 z-50">
    <router-link to="/" class="flex items-center gap-2">
      <div class="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-md shadow-brand-500/20">
        <PenTool class="w-5 h-5 text-white" />
      </div>
      <span class="text-xl font-bold text-surface-800 tracking-tight">GAD</span>
    </router-link>
    <div class="flex items-center gap-3">
      <router-link to="/login" class="px-4 py-2 text-sm font-medium text-surface-600 hover:text-brand-500 transition">Entrar</router-link>
      <router-link to="/register" class="btn-primary px-5 py-2 rounded-lg text-sm font-medium">Criar Conta</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { PenTool } from '@lucide/vue'
</script>
