<template>
  <div class="flex-1 flex flex-col bg-surface-100/70 dark:bg-surface-900 text-surface-800 dark:text-surface-100 antialiased transition-colors duration-200">
    <Navbar />

    <main class="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16">
      <div class="bg-surface-50 dark:bg-surface-800/90 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark p-8 md:p-12 transition-colors">
        <div class="border-b border-surface-200 dark:border-surface-700/80 pb-6 mb-8">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-500/30 mb-4">
            Documento Jurídico
          </span>
          <h1 class="text-3xl md:text-4xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight mb-2">
            Termos de Uso e Serviço
          </h1>
          <p class="text-sm text-surface-500 dark:text-surface-400">
            Última atualização: 11 de novembro de 2026
          </p>
        </div>

        <div class="max-w-none text-surface-700 dark:text-surface-300 text-sm md:text-base leading-relaxed space-y-6">
          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar, cadastrar-se ou utilizar a plataforma <strong class="text-surface-900 dark:text-surface-100">GAD (Gestor de Agências Digitais)</strong> ("Plataforma"), acessível pelo domínio <code class="px-1.5 py-0.5 rounded bg-surface-200/70 dark:bg-surface-900 text-brand-700 dark:text-brand-300 text-xs">gadagencia.com.br</code>, você ("Usuário") declara que leu, compreendeu e concorda integralmente com estes Termos de Uso e Serviço e com a nossa Política de Privacidade. Caso não concorde com qualquer disposição aqui estabelecida, você não deverá utilizar a Plataforma.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">2. Descrição dos Serviços</h2>
            <p>
              O GAD é uma plataforma de software como serviço (SaaS) voltada à gestão operacional e colaborativa para agências de publicidade, marketing digital, seus clientes e profissionais prestadores de serviços (redatores e designers). A Plataforma disponibiliza ferramentas para:
            </p>
            <ul class="list-disc pl-6 space-y-1.5 mt-2">
              <li>Criação, redação, upload de mídias e diagramação de publicações para redes sociais;</li>
              <li>Fluxo de submissão para revisão e aprovação/reprovação de conteúdos por clientes finais;</li>
              <li>Emissão de relatórios operacionais e registros de histórico e auditoria de ações;</li>
              <li>Geração e gerenciamento de tokens de convite e vinculação entre agências e membros de equipe.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">3. Cadastro, Acesso e Segurança de Credenciais</h2>
            <p>
              Para utilizar as funcionalidades do GAD, o Usuário deve criar uma conta informando dados cadastrais verídicos, completos e atualizados. O Usuário é o único responsável pela guarda, confidencialidade e uso de sua senha de acesso e dos tokens de autenticação atribuídos.
            </p>
            <p class="mt-2">
              A Plataforma não se responsabiliza por acessos não autorizados decorrentes de negligência, compartilhamento de senhas ou perda de dispositivos por parte do Usuário. Havendo suspeita de comprometimento da conta, o Usuário deve alterar imediatamente sua senha pela interface da Plataforma.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">4. Responsabilidade sobre Conteúdo e Propriedade Intelectual</h2>
            <p>
              <strong class="text-surface-900 dark:text-surface-100">Propriedade da Plataforma:</strong> Toda a arquitetura do software, interfaces, designs, marcas, códigos-fonte e componentes pertencem exclusivamente aos desenvolvedores do GAD, sob proteção das leis brasileiras de direitos autorais e propriedade intelectual (Lei nº 9.609/1998 e Lei nº 9.610/1998).
            </p>
            <p class="mt-2">
              <strong class="text-surface-900 dark:text-surface-100">Conteúdo dos Usuários:</strong> Os textos, legendas, imagens, marcas comerciais e arquivos carregados pertencem aos respectivos autores, agências ou clientes.
            </p>
            <div class="p-4 bg-surface-100 dark:bg-surface-900/75 rounded-xl border border-surface-200 dark:border-surface-700/80 mt-2">
              <p class="font-medium text-surface-800 dark:text-surface-100">Isenção de Responsabilidade:</p>
              <p class="text-xs text-surface-600 dark:text-surface-300 mt-1">
                O GAD atua exclusivamente como provedor de aplicação e ferramenta tecnológica de gestão, não exercendo controle prévio, editorial ou de veracidade sobre o conteúdo publicado pelos usuários. A responsabilidade civil e criminal por plágio, infração de marcas de terceiros, difamação ou qualquer ilícito decorrente do conteúdo é integral e exclusiva do Usuário e da Agência que o submeteu.
              </p>
            </div>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">5. Tokens de Acesso e Vínculos B2B</h2>
            <p>
              A Plataforma permite a geração de tokens para vinculação de clientes e colaboradores à agência. A agência é responsável por gerenciar a concessão, renovação e revogação desses acessos, garantindo que apenas pessoas autorizadas tenham acesso a informações estratégicas de clientes.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">6. Condutas Proibidas</h2>
            <p>É expressamente proibido ao Usuário:</p>
            <ul class="list-disc pl-6 space-y-1.5 mt-2">
              <li>Tentar violar a segurança, autenticação ou integridade dos servidores, banco de dados ou redes do GAD;</li>
              <li>Fazer engenharia reversa, descompilação ou cópia não autorizada da Plataforma;</li>
              <li>Armazenar ou transmitir vírus, códigos maliciosos ou arquivos corrompidos;</li>
              <li>Utilizar a Plataforma para fins ilícitos, fraudulentos ou contrários à moral e aos bons costumes;</li>
              <li>Burlar permissões de acesso baseadas em perfil (RBAC) ou explorar vulnerabilidades de segurança.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">7. Níveis de Serviço e Disponibilidade</h2>
            <p>
              O GAD empenha seus melhores esforços técnicos para manter a disponibilidade ininterrupta da Plataforma. No entanto, por depender de serviços de infraestrutura em nuvem e provedores de telecomunicações, não garante funcionamento livre de instabilidades eventuais, manutenções programadas ou causas de força maior. O GAD não responde por prazos de postagens perdidos ou perdas operacionais decorrentes de indisponibilidade transitória.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">8. Suspensão e Encerramento de Contas</h2>
            <p>
              O GAD reserva-se o direito de suspender ou rescindir o acesso de qualquer Usuário que viole estes Termos de Uso, a legislação vigente ou que coloque em risco a segurança da infraestrutura compartilhada, sem prévio aviso e sem prejuízo das medidas judiciais cabíveis.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">9. Alterações destes Termos</h2>
            <p>
              Estes Termos podem ser modificados periodicamente para refletir aprimoramentos técnicos, novas funcionalidades ou atualizações legislativas. As alterações entrarão em vigor a partir da data de publicação na Plataforma. O uso continuado após alterações constitui aceitação plena dos novos termos.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">10. Legislação Aplicável e Foro</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil, em especial o Marco Civil da Internet (Lei nº 12.965/2014) e a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Fica eleito o Foro da Comarca de São Paulo/SP para dirimir eventuais controvérsias oriundas deste instrumento.
            </p>
          </section>
        </div>

        <div class="mt-10 pt-6 border-t border-surface-200 dark:border-surface-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <router-link to="/" class="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition">
            ← Voltar para a Página Inicial
          </router-link>
          <router-link to="/privacy" class="text-sm font-semibold text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 transition">
            Ver Política de Privacidade (LGPD) →
          </router-link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>