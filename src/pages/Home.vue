<template>
  <div class="min-h-screen w-full bg-surface-100/70 text-surface-800 dark:bg-surface-900 dark:text-surface-100 antialiased transition-colors duration-200">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden w-full px-6 py-14 md:py-20 bg-gradient-to-b from-brand-50/75 via-surface-50 to-surface-100/70 dark:from-brand-900/30 dark:via-surface-900 dark:to-surface-900 border-b border-surface-200/80 dark:border-surface-800">
      <div class="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[680px] h-[300px] rounded-full bg-brand-500/10 dark:bg-brand-500/15 blur-3xl"></div>

      <div class="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center fade-in">
        <!-- Coluna Principal -->
        <div class="lg:col-span-7 text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-100/80 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 border border-brand-200/80 dark:border-brand-500/30 mb-5">
            <Sparkles class="w-3.5 h-3.5 text-mint-600 dark:text-mint-400" />
            <span>Gestão colaborativa para agências digitais</span>
          </div>

          <h1 class="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold text-surface-900 dark:text-surface-50 tracking-tight leading-[1.18] mb-5">
            Da pauta à aprovação final com
            <span class="text-brand-600 dark:text-brand-400 font-bold">clareza e ritmo</span>
          </h1>

          <p class="text-base text-surface-600 dark:text-surface-300 mb-7 max-w-2xl leading-relaxed">
            O <strong class="font-semibold text-surface-800 dark:text-surface-100">GAD</strong> centraliza redatores, designers, agências e clientes no mesmo fluxo de conteúdo — eliminando mensagens soltas, versões perdidas e retrabalho sem contexto.
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-7">
            <router-link to="/register" class="btn-primary px-7 py-3.5 rounded-xl text-sm font-semibold text-center inline-flex items-center justify-center gap-2">
              <span>Começar gratuitamente</span>
              <ArrowRight class="w-4 h-4" />
            </router-link>
            <router-link to="/login" class="btn-secondary px-7 py-3.5 rounded-xl text-sm font-semibold text-center inline-flex items-center justify-center">
              Entrar na minha conta
            </router-link>
          </div>

          <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-surface-500 dark:text-surface-400">
            <span class="inline-flex items-center gap-1.5">
              <Check class="w-3.5 h-3.5 text-mint-600 dark:text-mint-400" />
              Vínculo seguro por token
            </span>
            <span class="inline-flex items-center gap-1.5">
              <Check class="w-3.5 h-3.5 text-mint-600 dark:text-mint-400" />
              Histórico completo de auditoria
            </span>
            <span class="inline-flex items-center gap-1.5">
              <Check class="w-3.5 h-3.5 text-mint-600 dark:text-mint-400" />
              Aprovação e ajustes com comentários
            </span>
          </div>
        </div>

        <!-- Coluna Visual: Resumo do Fluxo -->
        <div class="lg:col-span-5">
          <div class="bg-surface-50 dark:bg-surface-800/90 rounded-2xl border border-surface-200 dark:border-surface-700/80 p-6 shadow-card-hover dark:shadow-card-dark space-y-5">
            <div class="flex items-center justify-between pb-4 border-b border-surface-200/80 dark:border-surface-700/80">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Pipeline do Squad</p>
                <h2 class="font-display text-base font-bold text-surface-900 dark:text-surface-50">Ciclo de Conteúdo</h2>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-mint-50 dark:bg-mint-500/15 text-mint-700 dark:text-mint-300 border border-mint-200 dark:border-mint-500/30">
                4 Perfis Integrados
              </span>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 rounded-xl bg-surface-100/80 dark:bg-surface-900/75 border border-surface-200/70 dark:border-surface-700/70">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center justify-center">01</span>
                  <div>
                    <p class="text-xs font-semibold text-surface-800 dark:text-surface-100">Agência & Redator</p>
                    <p class="text-[11px] text-surface-500 dark:text-surface-400">Briefing, copy e organização da pauta</p>
                  </div>
                </div>
                <span class="text-[11px] font-medium text-brand-600 dark:text-brand-400">Rascunho</span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl bg-surface-100/80 dark:bg-surface-900/75 border border-surface-200/70 dark:border-surface-700/70">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center">02</span>
                  <div>
                    <p class="text-xs font-semibold text-surface-800 dark:text-surface-100">Designer</p>
                    <p class="text-[11px] text-surface-500 dark:text-surface-400">Upload de peças, mídias e ordenação</p>
                  </div>
                </div>
                <span class="text-[11px] font-medium text-amber-600 dark:text-amber-300">Revisão</span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-xl bg-surface-100/80 dark:bg-surface-900/75 border border-surface-200/70 dark:border-surface-700/70">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-lg bg-mint-100 dark:bg-mint-500/20 text-mint-700 dark:text-mint-300 text-xs font-bold flex items-center justify-center">03</span>
                  <div>
                    <p class="text-xs font-semibold text-surface-800 dark:text-surface-100">Cliente</p>
                    <p class="text-[11px] text-surface-500 dark:text-surface-400">Aprovação direta ou pedido de ajuste</p>
                  </div>
                </div>
                <span class="text-[11px] font-medium text-mint-700 dark:text-mint-300">Aprovado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full px-6 py-20 max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
            Recursos essenciais
          </span>
          <h2 class="font-display text-2xl sm:text-3xl font-semibold text-surface-900 dark:text-surface-50 tracking-tight">
            Feito para equipes criativas que prezam por controle
          </h2>
        </div>
        <p class="text-sm text-surface-600 dark:text-surface-400 max-w-md">
          Cada etapa fica registrada com clareza para o time produzir e o cliente aprovar com segurança.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="group bg-surface-50 dark:bg-surface-800/85 p-7 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark transition-all duration-200 hover:-translate-y-1 hover:border-brand-400/70 dark:hover:border-brand-400/60 flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 rounded-xl bg-brand-100/80 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300 flex items-center justify-center mb-5">
              <Users class="w-5 h-5" />
            </div>
            <h3 class="font-display font-bold text-surface-900 dark:text-surface-50 text-lg mb-2">
              Conexão por Token
            </h3>
            <p class="text-sm text-surface-600 dark:text-surface-300/85 leading-relaxed">
              Conecte clientes, redatores e designers à agência por meio de tokens com controle de acesso e vínculo.
            </p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="group bg-surface-50 dark:bg-surface-800/85 p-7 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark transition-all duration-200 hover:-translate-y-1 hover:border-mint-400/70 dark:hover:border-mint-400/60 flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 rounded-xl bg-mint-100/80 dark:bg-mint-500/15 text-mint-700 dark:text-mint-400 flex items-center justify-center mb-5">
              <CheckCircle class="w-5 h-5" />
            </div>
            <h3 class="font-display font-bold text-surface-900 dark:text-surface-50 text-lg mb-2">
              Fluxo de Aprovação
            </h3>
            <p class="text-sm text-surface-600 dark:text-surface-300/85 leading-relaxed">
              Envie publicações para revisão, registre comentários objetivos e aprove ou solicite alterações com histórico.
            </p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="group bg-surface-50 dark:bg-surface-800/85 p-7 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark transition-all duration-200 hover:-translate-y-1 hover:border-brand-400/70 dark:hover:border-brand-400/60 flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 rounded-xl bg-brand-100/80 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300 flex items-center justify-center mb-5">
              <BarChart3 class="w-5 h-5" />
            </div>
            <h3 class="font-display font-bold text-surface-900 dark:text-surface-50 text-lg mb-2">
              Relatórios Inteligentes
            </h3>
            <p class="text-sm text-surface-600 dark:text-surface-300/85 leading-relaxed">
              Acompanhe entregas, aprovações e desempenho por cliente e período em relatórios prontos para compartilhar.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="w-full px-6 py-20 bg-surface-100 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800">
      <div class="max-w-5xl mx-auto">
        <div class="text-center max-w-xl mx-auto mb-12">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
            Planos transparentes
          </span>
          <h2 class="font-display text-2xl sm:text-3xl font-semibold text-surface-900 dark:text-surface-50 tracking-tight mb-2">
            Planos e Preços
          </h2>
          <p class="text-sm text-surface-600 dark:text-surface-400">
            Comece agora e evolua conforme a operação da sua agência e dos seus clientes.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 items-stretch">
          <!-- Starter -->
          <div class="bg-surface-50 dark:bg-surface-800/85 p-7 rounded-2xl border border-surface-200 dark:border-surface-700/80 flex flex-col justify-between shadow-card dark:shadow-card-dark transition-all duration-200 hover:-translate-y-1">
            <div>
              <h3 class="font-display font-bold text-surface-800 dark:text-surface-100 text-lg mb-1">Starter</h3>
              <p class="text-xs text-surface-500 dark:text-surface-400 mb-4">Ideal para testar o fluxo e começar</p>
              <p class="font-display text-3xl font-extrabold text-surface-900 dark:text-surface-50 tabular-nums mb-6">Grátis</p>
              <ul class="text-sm text-surface-600 dark:text-surface-300 space-y-2.5 mb-8">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />1 Agência</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />5 vínculos por tipo</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />5GB de armazenamento</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-secondary text-center py-2.5 rounded-xl text-sm font-semibold block">
              Selecionar Starter
            </router-link>
          </div>

          <!-- Pro -->
          <div class="relative bg-surface-50 dark:bg-surface-800 p-7 rounded-2xl border-2 border-brand-500 dark:border-brand-400 flex flex-col justify-between shadow-xl shadow-brand-500/10 dark:shadow-brand-500/15 md:scale-[1.02] transition-all duration-200 hover:-translate-y-1">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-surface-50 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Mais Popular
            </span>
            <div>
              <h3 class="font-display font-bold text-brand-600 dark:text-brand-300 text-lg mb-1">Pro</h3>
              <p class="text-xs text-surface-500 dark:text-surface-400 mb-4">Para agências em crescimento contínuo</p>
              <p class="font-display text-3xl font-extrabold text-surface-900 dark:text-surface-50 tabular-nums mb-6">
                R$ 89<span class="text-sm font-sans font-normal text-surface-500 dark:text-surface-400">/mês</span>
              </p>
              <ul class="text-sm text-surface-600 dark:text-surface-300 space-y-2.5 mb-8">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />Vínculos ilimitados</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />20GB de armazenamento</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />Relatórios automatizados com IA</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-primary text-center py-3 rounded-xl text-sm font-semibold block">
              Selecionar Pro
            </router-link>
          </div>

          <!-- Enterprise -->
          <div class="bg-surface-50 dark:bg-surface-800/85 p-7 rounded-2xl border border-surface-200 dark:border-surface-700/80 flex flex-col justify-between shadow-card dark:shadow-card-dark transition-all duration-200 hover:-translate-y-1">
            <div>
              <h3 class="font-display font-bold text-surface-800 dark:text-surface-100 text-lg mb-1">Enterprise</h3>
              <p class="text-xs text-surface-500 dark:text-surface-400 mb-4">Operações com demandas sob medida</p>
              <p class="font-display text-3xl font-extrabold text-surface-900 dark:text-surface-50 mb-6">Sob consulta</p>
              <ul class="text-sm text-surface-600 dark:text-surface-300 space-y-2.5 mb-8">
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />Tudo do plano Pro</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />SLA de atendimento dedicado</li>
                <li class="flex items-center gap-2"><Check class="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0" />Suporte prioritário 24/7</li>
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
import { Users, CheckCircle, Sparkles, BarChart3, Check, ArrowRight } from '@lucide/vue'
</script>