import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Executa `refresh` em segundo plano enquanto a página está visível:
 * - ao voltar para a aba / janela (foco ou visibilidade);
 * - a cada `intervalMs` (padrão 60s), só com a aba visível.
 * Chamadas muito próximas (foco + visibilidade juntos) são ignoradas.
 */
export function useAutoRefresh(refresh: () => Promise<unknown>, intervalMs = 60_000) {
  const MIN_GAP_MS = 10_000
  let lastRun = Date.now()
  let running = false
  let timer: ReturnType<typeof setInterval> | null = null

  async function run() {
    if (document.visibilityState !== 'visible' || running) return
    if (Date.now() - lastRun < MIN_GAP_MS) return
    running = true
    lastRun = Date.now()
    try {
      await refresh()
    } finally {
      running = false
    }
  }

  function onVisibility() {
    if (document.visibilityState === 'visible') run()
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', run)
    timer = setInterval(run, intervalMs)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('focus', run)
    if (timer) clearInterval(timer)
  })
}
