<template>
  <div class="min-h-full flex flex-col bg-surface-50 dark:bg-surface-950 text-surface-800 dark:text-surface-100 transition-colors duration-200">
    <Navbar />

    <!-- Hero Section -->
    <section class="w-full px-6 py-20 md:py-28 text-center bg-gradient-to-b from-brand-50/60 via-surface-50 to-surface-50 dark:from-brand-950/40 dark:via-surface-950 dark:to-surface-950 border-b border-surface-200/60 dark:border-surface-800/80">
      <div class="max-w-4xl mx-auto fade-in">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-100/80 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60 mb-6">
          Plataforma Completa
        </span>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-surface-900 dark:text-white tracking-tight leading-tight mb-6">
          GAD - Gestão de Agência <span class="text-brand-600 dark:text-brand-400">Digital</span>
        </h1>

        <p class="text-base sm:text-lg text-surface-600 dark:text-surface-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Conecte agências, redatores, designers e clientes em um fluxo de trabalho colaborativo, transparente e intuitivo.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/register" class="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold shadow-brand">
            Começar Gratuitamente
          </router-link>
          <router-link to="/login" class="w-full sm:w-auto btn-secondary px-8 py-3.5 rounded-xl text-sm font-semibold">
            Acessar Demonstração
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full px-6 py-20 max-w-6xl mx-auto">
      <h2 class="text-center text-2xl md:text-3xl font-extrabold mb-12 text-surface-900 dark:text-white tracking-tight">
        Por que escolher o GAD?
      </h2>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-surface-900 p-7 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/60 flex items-center justify-center mb-5">
              <Users class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-surface-800 dark:text-surface-100 text-lg mb-2">Conexão por Token</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Vincule clientes, redatores e designers à agência com tokens seguros e controlados temporariamente.
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-surface-900 p-7 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-mint-50 dark:bg-mint-950/60 text-mint-600 dark:text-mint-400 border border-mint-100 dark:border-mint-900/60 flex items-center justify-center mb-5">
              <CheckCircle class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-surface-800 dark:text-surface-100 text-lg mb-2">Fluxo de Aprovação</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Posts passam por revisão direta do cliente com opções de aprovação, rejeição ou alteração detalhada.
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-surface-900 p-7 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/60 flex items-center justify-center mb-5">
              <Sparkles class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-surface-800 dark:text-surface-100 text-lg mb-2">Relatórios Inteligentes</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Gere relatórios automatizados de desempenho por período e cliente com métricas consolidadas.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="w-full px-6 py-20 bg-surface-100/60 dark:bg-surface-900/40 border-t border-surface-200/80 dark:border-surface-800">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-center text-2xl md:text-3xl font-extrabold mb-12 text-surface-900 dark:text-white tracking-tight">
          Planos e Preços
        </h2>

        <div class="grid md:grid-cols-3 gap-6 items-stretch">
          <!-- Starter -->
          <div class="bg-white dark:bg-surface-900 p-7 rounded-2xl border border-surface-200 dark:border-surface-800 flex flex-col justify-between shadow-card">
            <div>
              <h3 class="font-bold text-surface-700 dark:text-surface-200 text-base mb-1">Starter</h3>
              <p class="text-3xl font-extrabold text-surface-900 dark:text-white mb-4">Grátis</p>
              <ul class="text-sm text-surface-600 dark:text-surface-400 space-y-2.5 mb-6">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />1 Agência</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />5 vínculos por tipo</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />5GB de armazenamento</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-secondary text-center py-2.5 rounded-xl text-sm font-semibold block">
              Selecionar Starter
            </router-link>
          </div>

          <!-- Pro -->
          <div class="bg-white dark:bg-surface-900 p-7 rounded-2xl border-2 border-brand-500 relative flex flex-col justify-between shadow-xl shadow-brand-500/10 scale-102">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Mais Popular
            </span>
            <div>
              <h3 class="font-bold text-brand-600 dark:text-brand-400 text-base mb-1">Pro</h3>
              <p class="text-3xl font-extrabold text-surface-900 dark:text-white mb-4">
                R$ 89<span class="text-base font-normal text-surface-400">/mês</span>
              </p>
              <ul class="text-sm text-surface-600 dark:text-surface-400 space-y-2.5 mb-6">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />Vínculos ilimitados</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />20GB de armazenamento</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />Relatórios automatizados com IA</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-primary text-center py-3 rounded-xl text-sm font-semibold block shadow-brand">
              Selecionar Pro
            </router-link>
          </div>

          <!-- Enterprise -->
          <div class="bg-white dark:bg-surface-900 p-7 rounded-2xl border border-surface-200 dark:border-surface-800 flex flex-col justify-between shadow-card">
            <div>
              <h3 class="font-bold text-surface-700 dark:text-surface-200 text-base mb-1">Enterprise</h3>
              <p class="text-3xl font-extrabold text-surface-900 dark:text-white mb-4">Sob consulta</p>
              <ul class="text-sm text-surface-600 dark:text-surface-400 space-y-2.5 mb-6">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />Tudo do plano Pro</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />SLA de atendimento dedicado</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-500 shrink-0" />Suporte prioritário 24/7</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-secondary text-center py-2.5 rounded-xl text-sm font-semibold block">
              Falar com Consultor
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { Users, CheckCircle, Sparkles, Check } from '@lucide/vue'
</script>
