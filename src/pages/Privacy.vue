<template>
  <div class="min-h-full flex flex-col bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 antialiased transition-colors duration-200">
    <Navbar />

    <main class="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16">
      <div class="bg-white dark:bg-surface-800/90 rounded-2xl border border-surface-200 dark:border-surface-700/80 shadow-card dark:shadow-card-dark p-8 md:p-12 transition-colors">
        <div class="border-b border-surface-200 dark:border-surface-700/80 pb-6 mb-8">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-mint-500/15 text-emerald-700 dark:text-mint-300 border border-emerald-200 dark:border-mint-500/30 mb-4">
            Em Conformidade com a Lei 13.709/2018 (LGPD)
          </span>
          <h1 class="text-3xl md:text-4xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight mb-2">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p class="text-sm text-surface-500 dark:text-surface-400">
            Última atualização: 11 de novembro de 2026
          </p>
        </div>

        <div class="max-w-none text-surface-700 dark:text-surface-300 text-sm md:text-base leading-relaxed space-y-6">
          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">1. Compromisso com a Privacidade</h2>
            <p>
              A plataforma <strong class="text-surface-900 dark:text-surface-100">GAD (Gestor de Agências Digitais)</strong> ("GAD", "nós" ou "nosso"), acessível através do endereço <code class="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-900 text-brand-700 dark:text-brand-300 text-xs">gadagencia.com.br</code>, está firmemente comprometida com a proteção da privacidade e dos dados pessoais de seus usuários ("Usuário" ou "Você").
            </p>
            <p class="mt-2">
              Esta Política de Privacidade descreve de forma clara e transparente como coletamos, usamos, armazenamos, tratamos e protegemos seus dados pessoais, em estrita conformidade com a <strong class="text-surface-900 dark:text-surface-100">Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD)</strong> e com o <strong class="text-surface-900 dark:text-surface-100">Marco Civil da Internet (Lei nº 12.965/2014)</strong>.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">2. Dados Pessoais Coletados e Finalidades</h2>
            <p>Tratamos as seguintes categorias de dados pessoais para finalidades legítimas:</p>

            <div class="space-y-3 mt-3">
              <div class="p-4 bg-surface-50 dark:bg-surface-900/75 rounded-xl border border-surface-200 dark:border-surface-700/80">
                <h3 class="font-semibold text-surface-800 dark:text-surface-100 text-sm">a) Dados Cadastrais e de Identificação</h3>
                <p class="text-xs text-surface-600 dark:text-surface-300 mt-1">
                  <strong class="text-surface-800 dark:text-surface-200">Dados:</strong> Nome completo, endereço de e-mail, senha criptografada e papel operacional (agência, cliente, redator ou designer).
                </p>
                <p class="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
                  <strong class="text-surface-800 dark:text-surface-200">Finalidade:</strong> Autenticação no sistema, criação de perfil, controle de permissões de acesso (RBAC) e comunicação operacional da conta.
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                  <strong class="text-surface-700 dark:text-surface-300">Base Legal (LGPD):</strong> Execução de contrato ou de procedimentos preliminares (Art. 7º, inciso V).
                </p>
              </div>

              <div class="p-4 bg-surface-50 dark:bg-surface-900/75 rounded-xl border border-surface-200 dark:border-surface-700/80">
                <h3 class="font-semibold text-surface-800 dark:text-surface-100 text-sm">b) Registros Técnicos de Acesso e Auditoria</h3>
                <p class="text-xs text-surface-600 dark:text-surface-300 mt-1">
                  <strong class="text-surface-800 dark:text-surface-200">Dados:</strong> Endereço IP de conexão, data e hora de acessos (login/logout), identificador do navegador (<em>User-Agent</em>) e histórico de auditoria de ações críticas (criação, edição e exclusão de posts).
                </p>
                <p class="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
                  <strong class="text-surface-800 dark:text-surface-200">Finalidade:</strong> Detecção e prevenção a acessos não autorizados, cumprimento de dever legal de guarda de registros e segurança da informação.
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                  <strong class="text-surface-700 dark:text-surface-300">Base Legal (LGPD):</strong> Cumprimento de obrigação legal ou regulatória pelo controlador (Art. 7º, inciso II c/c Art. 15 da Lei nº 12.965/2014) e Legítimo Interesse (Art. 7º, inciso IX).
                </p>
              </div>

              <div class="p-4 bg-surface-50 dark:bg-surface-900/75 rounded-xl border border-surface-200 dark:border-surface-700/80">
                <h3 class="font-semibold text-surface-800 dark:text-surface-100 text-sm">c) Dados de Conteúdo e Mídias</h3>
                <p class="text-xs text-surface-600 dark:text-surface-300 mt-1">
                  <strong class="text-surface-800 dark:text-surface-200">Dados:</strong> Textos, arquivos de mídia, imagens e comentários inseridos nos fluxos de publicações.
                </p>
                <p class="text-xs text-surface-600 dark:text-surface-300 mt-0.5">
                  <strong class="text-surface-800 dark:text-surface-200">Finalidade:</strong> Prestação do serviço de gestão, revisão e aprovação de peças publicitárias.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">3. Segurança e Armazenamento dos Dados</h2>
            <p>
              Adotamos medidas técnicas, administrativas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, perda, destruição, alteração ou divulgação indevida:
            </p>
            <ul class="list-disc pl-6 space-y-1.5 mt-2">
              <li><strong class="text-surface-900 dark:text-surface-100">Criptografia em Trânsito:</strong> Toda comunicação entre seu navegador e a Plataforma é criptografada utilizando o protocolo HTTPS com TLS 1.3;</li>
              <li><strong class="text-surface-900 dark:text-surface-100">Criptografia de Senhas:</strong> As senhas são armazenadas utilizando algoritmos modernos de dispersão criptográfica (hashing salgado), sendo inacessíveis mesmo aos administradores;</li>
              <li><strong class="text-surface-900 dark:text-surface-100">Segregação de Perfis (RBAC):</strong> Mecanismos de controle estrito onde cada usuário acessa exclusivamente os recursos autorizados para seu perfil;</li>
              <li><strong class="text-surface-900 dark:text-surface-100">Servidores em Nuvem Segura:</strong> Infraestrutura hospedada em data centers certificados, com monitoramento ativo e backups regulares.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">4. Compartilhamento de Dados com Terceiros</h2>
            <p>
              O GAD <strong class="text-surface-900 dark:text-surface-100">não comercializa, aluga ou cede</strong> dados pessoais de seus usuários para terceiros sob nenhuma hipótese.
            </p>
            <p class="mt-2">
              O compartilhamento de dados ocorre estritamente na medida do necessário para:
            </p>
            <ul class="list-disc pl-6 space-y-1.5 mt-2">
              <li>Provedores de infraestrutura de nuvem, banco de dados e servidores de aplicação que viabilizam o funcionamento da ferramenta;</li>
              <li>Membros vinculados à mesma agência (por exemplo, compartilhamento de nome e e-mail com a agência que emitiu o token de vínculo);</li>
              <li>Cumprimento de ordem judicial ou requisição fundamentada de autoridades policiais ou governamentais competentes.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">5. Seus Direitos como Titular de Dados (Art. 18 da LGPD)</h2>
            <p>
              Você, como titular de dados pessoais, tem o direito de solicitar a qualquer momento, mediante requisição direta e simplificada:
            </p>
            <ul class="list-disc pl-6 space-y-1.5 mt-2">
              <li><strong class="text-surface-900 dark:text-surface-100">Confirmação e Acesso:</strong> Confirmar a existência de tratamento e acessar seus dados pessoais mantidos na Plataforma;</li>
              <li><strong class="text-surface-900 dark:text-surface-100">Correção:</strong> Solicitar a retificação de dados pessoais incompletos, inexatos ou desatualizados através do seu painel de usuário;</li>
              <li><strong class="text-surface-900 dark:text-surface-100">Anonimização ou Eliminação:</strong> Requerer a exclusão de dados pessoais tratados com base em consentimento, salvo os necessários para cumprimento de dever legal;</li>
              <li><strong class="text-surface-900 dark:text-surface-100">Revogação de Consentimento:</strong> Revogar a qualquer momento autorizações previamente concedidas.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">6. Retenção e Exclusão de Dados</h2>
            <p>
              Os dados cadastrais são conservados enquanto a conta do Usuário permanecer ativa. Mediante solicitação de encerramento da conta, os dados cadastrais serão removidos ou anonimizados, respeitado o prazo legal de retenção obrigatória de 6 (seis) meses para os registros de acesso a aplicações de internet, em estrito cumprimento ao artigo 15 do Marco Civil da Internet.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">7. Cookies e Armazenamento Local</h2>
            <p>
              A Plataforma utiliza armazenamento local seguro (<code class="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-900 text-brand-700 dark:text-brand-300 text-xs">localStorage</code>) exclusivamente para guardar tokens de sessão JWT necessários para mantê-lo autenticado. Não utilizamos cookies invasivos de rastreamento publicitário ou de terceiros.
            </p>
          </section>

          <section>
            <h2 class="text-lg md:text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">8. Canal de Contato do Encarregado de Dados (DPO)</h2>
            <p>
              Para exercer seus direitos de titular, solicitar esclarecimentos sobre esta Política de Privacidade ou reportar qualquer dúvida sobre o tratamento de seus dados, entre em contato diretamente com o nosso Encarregado pelo Tratamento de Dados Pessoais (DPO):
            </p>
            <div class="p-4 bg-brand-50 dark:bg-brand-500/15 rounded-xl border border-brand-200 dark:border-brand-500/30 mt-2">
              <p class="font-semibold text-brand-900 dark:text-brand-200">Encarregado de Proteção de Dados (DPO) — GAD</p>
              <p class="text-xs text-brand-700 dark:text-brand-300 mt-1">
                E-mail para solicitações LGPD:
                <a href="mailto:privacidade@gadagencia.com.br" class="underline font-medium">privacidade@gadagencia.com.br</a>
              </p>
              <p class="text-xs text-brand-600 dark:text-brand-300/80 mt-0.5">Prazo regulamentar de resposta: até 15 (quinze) dias úteis.</p>
            </div>
          </section>
        </div>

        <div class="mt-10 pt-6 border-t border-surface-200 dark:border-surface-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <router-link to="/" class="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition">
            ← Voltar para a Página Inicial
          </router-link>
          <router-link to="/terms" class="text-sm font-semibold text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 transition">
            Ver Termos de Uso →
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