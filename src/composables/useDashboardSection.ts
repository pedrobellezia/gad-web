import { ref, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Seção (aba) atual do painel, guardada na URL como `?aba=<seção>`.
 *
 * - Refresh volta na mesma aba; abrir a URL sem `aba` cai na aba padrão.
 * - Cada troca de aba entra no histórico, então o "voltar" do navegador funciona.
 * - Valor desconhecido na URL é ignorado (usa a aba padrão).
 */
export function useDashboardSection<T extends string>(sections: readonly T[], fallback: T): Ref<T> {
  const route = useRoute()
  const router = useRouter()

  function fromUrl(): T {
    const value = route.query.aba
    return typeof value === 'string' && (sections as readonly string[]).includes(value) ? (value as T) : fallback
  }

  const current = ref(fromUrl()) as Ref<T>

  watch(current, (section) => {
    if (fromUrl() === section) return
    // A aba padrão fica sem parâmetro, para a URL principal continuar limpa
    const query = { ...route.query, aba: section === fallback ? undefined : section }
    router.push({ query })
  })

  // Voltar/avançar do navegador
  watch(() => route.query.aba, () => {
    const section = fromUrl()
    if (current.value !== section) current.value = section
  })

  return current
}
