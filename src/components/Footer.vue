<template>
  <footer class="w-full bg-surface-100 dark:bg-surface-950/90 text-surface-600 dark:text-surface-400 border-t border-surface-200 dark:border-surface-800 py-12 px-6 mt-auto transition-colors duration-200">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <span class="font-extrabold text-brand-600 dark:text-surface-50 text-2xl tracking-tight">GAD</span>
        <div class="border-t sm:border-t-0 sm:border-l border-surface-300 dark:border-surface-700 pt-2 sm:pt-0 sm:pl-4">
          <p class="text-xs text-surface-700 dark:text-surface-300 font-medium">Gestor de Agências Digitais</p>
          <p class="text-[11px] text-surface-500 dark:text-surface-400">Conectando criação, estratégia e aprovação em um único lugar.</p>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-xs text-surface-600 dark:text-surface-400">
        <router-link to="/login" class="hover:text-brand-600 dark:hover:text-surface-100 transition">Entrar</router-link>
        <router-link to="/register" class="hover:text-brand-600 dark:hover:text-surface-100 transition">Cadastrar</router-link>
        <span class="text-surface-300 dark:text-surface-700 hidden sm:inline">•</span>
        <router-link to="/terms" class="hover:text-brand-600 dark:hover:text-surface-100 transition">Termos de Uso</router-link>
        <router-link to="/privacy" class="hover:text-brand-600 dark:hover:text-surface-100 transition">Privacidade (LGPD)</router-link>
      </div>
    </div>

    <div class="max-w-6xl mx-auto mt-8 pt-6 border-t border-surface-200 dark:border-surface-800/80 text-center text-[11px] text-surface-500 dark:text-surface-500">
      © {{ new Date().getFullYear() }} GAD - Todos os direitos reservados.
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>