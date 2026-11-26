import { ref } from 'vue'
import { useToast } from './useToast'

export interface TokenItem {
  id: string
  code: string
  date: string
  type: string
}

const tokens = ref<TokenItem[]>([
  { id: '1', code: 'TKN-A7X9-2K4M', date: '20/05/2026', type: 'Cliente' },
  { id: '2', code: 'TKN-B3F1-8P2Q', date: '22/05/2026', type: 'Redator' }
])

export function useTokens() {
  const { showToast } = useToast()

  function generateToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let tokenStr = 'TKN-'
    for (let i = 0; i < 4; i++) tokenStr += chars[Math.floor(Math.random() * chars.length)]
    tokenStr += '-'
    for (let i = 0; i < 4; i++) tokenStr += chars[Math.floor(Math.random() * chars.length)]

    const newToken: TokenItem = {
      id: String(Date.now()),
      code: tokenStr,
      date: new Date().toLocaleDateString('pt-BR'),
      type: 'Novo Vínculo'
    }

    tokens.value.unshift(newToken)
    showToast(`Token gerado: ${tokenStr}`, 'success')
  }

  function deleteToken(id: string) {
    tokens.value = tokens.value.filter(t => t.id !== id)
    showToast('Token excluído!', 'info')
  }

  return {
    tokens,
    generateToken,
    deleteToken
  }
}
