<template>
  <div class="min-h-full flex flex-col bg-surface-50 text-surface-800 antialiased overflow-x-hidden relative">
    <Navbar />

    <!-- Ambient Glow Orbs & Technical Grid Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <!-- Glow Orb 1 (Purple - Top Left) -->
      <div class="absolute -top-40 -left-40 w-130 h-130 rounded-full bg-brand-500/15 blur-[120px] animate-pulse"></div>
      <!-- Glow Orb 2 (Mint Green - Top Right) -->
      <div class="absolute top-20 -right-40 w-120 h-120 rounded-full bg-mint-400/15 blur-[110px]"></div>
      <!-- Glow Orb 3 (Navy/Violet - Center Mid) -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-100 rounded-full bg-brand-600/10 blur-[140px]"></div>

      <!-- Subtle Dot Matrix Pattern -->
      <svg class="absolute inset-0 w-full h-full opacity-40 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" class="text-surface-300 fill-current" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>

    <!-- Hero Section -->
    <section class="relative z-10 w-full px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center max-w-6xl mx-auto">
      <div class="max-w-4xl mx-auto fade-in">
        <!-- Floating Pill Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-brand-200/60 shadow-xs mb-6 text-xs font-semibold text-brand-700">
          <span class="w-2 h-2 rounded-full bg-mint-500 animate-ping"></span>
          <span>Plataforma Oficial GAD v1.0.2</span>
          <span class="text-surface-300">•</span>
          <span class="text-surface-500 font-normal">Gestão Completa de Agências</span>
        </div>

        <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-surface-900 leading-[1.1] mb-6">
          O fluxo definitivo entre <br class="hidden sm:block" />
          <span class="bg-gradient-to-r from-brand-600 via-brand-500 to-mint-500 bg-clip-text text-transparent">
            Agência, Equipe e Cliente.
          </span>
        </h1>

        <p class="text-base sm:text-xl text-surface-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Conecte redatores, designers e clientes sem atritos. Crie pautas com controle de versão, aprove posts em tempo real e mantenha toda a operação centralizada.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
          <router-link
            to="/register"
            class="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 group shadow-brand"
          >
            <span>Começar Gratuitamente</span>
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </router-link>
          <router-link
            to="/login"
            class="w-full sm:w-auto btn-secondary px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <span>Acessar Minha Conta</span>
          </router-link>
        </div>

        <!-- Realistic Product Mockup / Floating Window -->
        <div class="relative mx-auto rounded-2xl p-2 bg-gradient-to-b from-white/90 to-surface-200/50 backdrop-blur-xl border border-white/80 shadow-2xl max-w-5xl">
          <div class="bg-surface-900 rounded-xl overflow-hidden border border-surface-800 text-left">
            <!-- Mockup Window Bar -->
            <div class="px-4 py-3 bg-surface-950/80 border-b border-surface-800 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span class="ml-2 text-xs font-mono text-surface-400">app.gadagencia.com.br/dashboard-agency</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono">Status: Produção</span>
              </div>
            </div>

            <!-- Mockup Dashboard Preview Body -->
            <div class="p-6 bg-surface-900/90 text-white space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="p-4 rounded-xl bg-surface-800/60 border border-surface-700/60">
                  <span class="text-xs text-surface-400 block mb-1">Posts no Mês</span>
                  <p class="text-2xl font-bold text-white">48</p>
                  <span class="text-[11px] text-mint-400 font-medium">↑ 18% vs mês anterior</span>
                </div>
                <div class="p-4 rounded-xl bg-surface-800/60 border border-surface-700/60">
                  <span class="text-xs text-amber-400 block mb-1">Em Revisão</span>
                  <p class="text-2xl font-bold text-white">7</p>
                  <span class="text-[11px] text-surface-400">Aguardando cliente</span>
                </div>
                <div class="p-4 rounded-xl bg-surface-800/60 border border-surface-700/60">
                  <span class="text-xs text-mint-400 block mb-1">Aprovados</span>
                  <p class="text-2xl font-bold text-white">32</p>
                  <span class="text-[11px] text-mint-400 font-medium">Prontos para postar</span>
                </div>
                <div class="p-4 rounded-xl bg-surface-800/60 border border-surface-700/60">
                  <span class="text-xs text-brand-400 block mb-1">Taxa de Aprovação</span>
                  <p class="text-2xl font-bold text-white">94.2%</p>
                  <span class="text-[11px] text-surface-400">Tempo médio: 4h</span>
                </div>
              </div>

              <!-- Mockup Posts List Row -->
              <div class="bg-surface-800/40 border border-surface-700/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
                    <FileText class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="text-sm font-semibold text-white">Campanha Black Friday - Coleção Verão</h4>
                      <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Aprovado
                      </span>
                    </div>
                    <p class="text-xs text-surface-400 mt-0.5">Cliente: Loja ABC Moda · Redator: Pedro B. · 3 mídias em anexo</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 self-end sm:self-center">
                  <button class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white shadow-xs">
                    Publicar Agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Modern Cards -->
    <section class="relative z-10 w-full px-6 py-20 max-w-6xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">Diferenciais da Plataforma</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight">
          Feito sob medida para agências que buscam eficiência
        </h2>
        <p class="text-sm md:text-base text-surface-500 mt-3">
          Elimine aprovações perdidas no WhatsApp, planilhas desorganizadas e retrabalho de pautas.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-surface-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-6">
              <Key class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-surface-800 mb-2">Vínculo Seguro por Token</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Associe redatores, designers e clientes gerando tokens de convite exclusivos e temporários. Controle o acesso de cada participante com precisão.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs font-semibold text-brand-600">
            <span>Tokens criptografados</span>
            <Check class="w-3.5 h-3.5" />
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-surface-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-mint-50 text-mint-600 border border-mint-100 flex items-center justify-center mb-6">
              <CheckCircle2 class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-surface-800 mb-2">Fluxo de Aprovação Rigoroso</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Posts em revisão passam pela validação do cliente. Reprovações exigem justificativa obrigatória e criam histórico completo de auditoria.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs font-semibold text-mint-600">
            <span>Controle de versão otimista</span>
            <Check class="w-3.5 h-3.5" />
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-surface-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-6">
              <Image class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-surface-800 mb-2">Acervo Criativo dos Designers</h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              Designers enviam fotos e vídeos com definição de alias e posição nos posts, permitindo à agência montar carrosséis e banners em minutos.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs font-semibold text-purple-600">
            <span>Upload com validação de formato</span>
            <Check class="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="relative z-10 w-full px-6 py-20 bg-surface-100/70 border-y border-surface-200/60">
      <div class="max-w-5xl mx-auto">
        <div class="text-center max-w-xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">Transparência</span>
          <h2 class="text-3xl font-extrabold text-surface-900 tracking-tight">Planos simples para qualquer tamanho</h2>
          <p class="text-sm text-surface-500 mt-2">Escolha o plano ideal para a sua estrutura e escale conforme sua carteira de clientes cresce.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 items-stretch">
          <!-- Starter -->
          <div class="bg-white p-7 rounded-2xl border border-surface-200 flex flex-col justify-between shadow-card">
            <div>
              <h3 class="font-bold text-surface-700 text-base mb-1">Starter</h3>
              <p class="text-xs text-surface-400 mb-4">Para freelancers e agências iniciantes</p>
              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-3xl font-extrabold text-surface-900">Grátis</span>
              </div>
              <ul class="text-sm text-surface-600 space-y-3 mb-8">
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-mint-500 shrink-0" /> 1 Agência</li>
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-mint-500 shrink-0" /> Até 5 clientes vinculados</li>
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-mint-500 shrink-0" /> Biblioteca de mídias compartilhada</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-secondary text-center py-2.5 rounded-xl text-sm font-semibold block">
              Criar Conta Grátis
            </router-link>
          </div>

          <!-- Pro (Featured) -->
          <div class="bg-white p-8 rounded-2xl border-2 border-brand-500 relative flex flex-col justify-between shadow-xl shadow-brand-500/10 scale-102">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Mais Recomendado
            </span>
            <div>
              <h3 class="font-bold text-brand-600 text-base mb-1">Profissional</h3>
              <p class="text-xs text-surface-400 mb-4">Para agências em expansão contínua</p>
              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-4xl font-extrabold text-surface-900">R$ 89</span>
                <span class="text-xs text-surface-400 font-normal">/mês</span>
              </div>
              <ul class="text-sm text-surface-700 space-y-3 mb-8">
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-brand-600 shrink-0" /> Vínculos ilimitados de clientes</li>
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-brand-600 shrink-0" /> Redatores e Designers ilimitados</li>
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-brand-600 shrink-0" /> Histórico completo de auditoria</li>
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-brand-600 shrink-0" /> Publicação direta de posts</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-primary text-center py-3 rounded-xl text-sm font-semibold block shadow-brand">
              Assinar Plano Pro
            </router-link>
          </div>

          <!-- Enterprise -->
          <div class="bg-white p-7 rounded-2xl border border-surface-200 flex flex-col justify-between shadow-card">
            <div>
              <h3 class="font-bold text-surface-700 text-base mb-1">Enterprise</h3>
              <p class="text-xs text-surface-400 mb-4">Para grandes operações e redes</p>
              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-3xl font-extrabold text-surface-900">Sob consulta</span>
              </div>
              <ul class="text-sm text-surface-600 space-y-3 mb-8">
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-mint-500 shrink-0" /> Todas as funcionalidades Pro</li>
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-mint-500 shrink-0" /> SLA de resposta prioritário</li>
                <li class="flex items-center gap-2.5"><Check class="w-4 h-4 text-mint-500 shrink-0" /> Suporte dedicado de integração</li>
              </ul>
            </div>
            <router-link to="/register" class="w-full btn-secondary text-center py-2.5 rounded-xl text-sm font-semibold block">
              Falar com Consultor
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { ArrowRight, Check, CheckCircle2, Key, Image, FileText } from '@lucide/vue'
</script>
