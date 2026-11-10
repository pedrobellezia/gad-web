<template>
  <footer class="w-full bg-surface-900 text-surface-400 border-t border-surface-800 py-12 px-6 mt-auto">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div class="flex items-center gap-2.5">
          <img src="/favicon.png" alt="GAD" class="h-8 w-8 object-contain" />
          <span class="font-extrabold text-white text-lg tracking-tight">GAD</span>
        </div>
        <div class="border-t sm:border-t-0 sm:border-l border-surface-700 pt-2 sm:pt-0 sm:pl-4">
          <p class="text-xs text-surface-400 font-medium">Gestor de Agências Digitais</p>
          <p class="text-[11px] text-surface-500">Conectando criação, estratégia e aprovação em um único lugar.</p>
        </div>
      </div>

      <div class="flex items-center gap-6 text-xs text-surface-400">
        <router-link to="/login" class="hover:text-white transition">Entrar</router-link>
        <router-link to="/register" class="hover:text-white transition">Cadastrar</router-link>
        <span class="text-surface-700">•</span>
        <span class="text-surface-500">Em conformidade com a LGPD</span>
      </div>
    </div>

    <div class="max-w-6xl mx-auto mt-8 pt-6 border-t border-surface-800 text-center text-[11px] text-surface-500">
      © {{ new Date().getFullYear() }} GAD - Todos os direitos reservados.
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
