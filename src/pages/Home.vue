<template>
  <div class="min-h-full flex flex-col">
    <Navbar />

    <!-- Hero Section -->
    <section class="w-full px-8 py-20 text-center bg-gradient-to-br from-brand-50 via-white to-brand-100/50">
      <div class="max-w-3xl mx-auto fade-in">
        <span class="inline-block px-3 py-1 bg-brand-100 text-brand-600 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Plataforma Completa</span>
        <h1 class="font-display text-5xl md:text-6xl text-surface-800 leading-tight mb-6 font-bold">
          GAD - Gestão de Agência <span class="text-brand-500">Digital</span>
        </h1>
        <p class="text-lg text-surface-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Conecte agências, redatores, designers e clientes em um fluxo de trabalho colaborativo, transparente e intuitivo.
        </p>
        <div class="flex items-center justify-center gap-4">
          <router-link to="/register" class="btn-primary px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-brand-500/20">Começar Gratuitamente</router-link>
          <router-link to="/login" class="btn-secondary px-8 py-3.5 rounded-xl text-base font-semibold">Acessar Demonstração</router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full px-8 py-16 max-w-6xl mx-auto">
      <h2 class="text-center text-2xl font-bold mb-12 text-surface-700">Por que escolher o Postly?</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl border border-surface-200 card-hover">
          <div class="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
            <Users class="w-5 h-5 text-brand-500" />
          </div>
          <h3 class="font-semibold text-surface-800 mb-2">Conexão por Token</h3>
          <p class="text-sm text-surface-500 leading-relaxed">Vincule clientes, redatores e designers à agência com tokens seguros e controlados temporariamente.</p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-surface-200 card-hover">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle class="w-5 h-5 text-success" />
          </div>
          <h3 class="font-semibold text-surface-800 mb-2">Fluxo de Aprovação</h3>
          <p class="text-sm text-surface-500 leading-relaxed">Posts passam por revisão direta do cliente com opções de aprovação, rejeição ou alteração detalhada.</p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-surface-200 card-hover">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
            <Sparkles class="w-5 h-5 text-purple-500" />
          </div>
          <h3 class="font-semibold text-surface-800 mb-2">Relatórios com IA</h3>
          <p class="text-sm text-surface-500 leading-relaxed">Gere relatórios inteligentes de desempenho por período e cliente, com exportação rápida em formato PDF/Excel.</p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="w-full px-8 py-16 bg-surface-100">
      <h2 class="text-center text-2xl font-bold mb-12 text-surface-700">Planos e Preços</h2>
      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div class="bg-white p-6 rounded-xl border border-surface-200 flex flex-col justify-between">
          <div>
            <h3 class="font-semibold text-surface-600 mb-1">Starter</h3>
            <p class="text-3xl font-bold text-surface-800 mb-4">Grátis</p>
            <ul class="text-sm text-surface-500 space-y-2.5 mb-6">
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />1 Agência</li>
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />5 vínculos por tipo</li>
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />5GB de armazenamento</li>
            </ul>
          </div>
          <router-link to="/register" class="w-full btn-secondary text-center py-2.5 rounded-lg text-sm font-medium block">Selecionar Starter</router-link>
        </div>

        <div class="bg-white p-6 rounded-xl border-2 border-brand-500 relative flex flex-col justify-between shadow-xl">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Mais Popular</span>
          <div>
            <h3 class="font-semibold text-brand-600 mb-1">Pro</h3>
            <p class="text-3xl font-bold text-surface-800 mb-4">R$89<span class="text-base font-normal text-surface-400">/mês</span></p>
            <ul class="text-sm text-surface-500 space-y-2.5 mb-6">
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />Vínculos ilimitados</li>
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />20GB de armazenamento</li>
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />Relatórios automatizados com IA</li>
            </ul>
          </div>
          <router-link to="/register" class="w-full btn-primary text-center py-2.5 rounded-lg text-sm font-medium block">Selecionar Pro</router-link>
        </div>

        <div class="bg-white p-6 rounded-xl border border-surface-200 flex flex-col justify-between">
          <div>
            <h3 class="font-semibold text-surface-600 mb-1">Enterprise</h3>
            <p class="text-3xl font-bold text-surface-800 mb-4">Sob consulta</p>
            <ul class="text-sm text-surface-500 space-y-2.5 mb-6">
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />Tudo do plano Pro</li>
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />SLA de atendimento dedicado</li>
              <li class="flex items-center gap-2"><Check class="w-4 h-4 text-success" />Suporte prioritário 24/7</li>
            </ul>
          </div>
          <router-link to="/register" class="w-full btn-secondary text-center py-2.5 rounded-lg text-sm font-medium block">Falar com Consultor</router-link>
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
