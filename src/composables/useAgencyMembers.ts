import { ref } from 'vue'
import { agencyApi } from '@/api/agency'
import type {
  InviteTokenItem,
  AgencyMember,
  AgencyPublic
} from '@/types/api'
import { useToast } from './useToast'

const tokens = ref<InviteTokenItem[]>([])
const clients = ref<AgencyMember[]>([])
const writers = ref<AgencyMember[]>([])
const designers = ref<AgencyMember[]>([])
const linkedAgency = ref<AgencyPublic | null>(null)
const isLoading = ref<boolean>(false)

export function useAgencyMembers() {
  const { showToast } = useToast()

  async function fetchTokens() {
    try {
      const data = await agencyApi.getInviteTokens()
      tokens.value = data
      return data
    } catch (err: any) {
      showToast(err.message || 'Erro ao carregar tokens de convite', 'error')
      throw err
    }
  }

  async function createTokens(quantity: number) {
    try {
      const res = await agencyApi.createInviteTokens(quantity)
      showToast(res.details || `${quantity} token(s) gerado(s)!`, 'success')
      await fetchTokens()
      return res
    } catch (err: any) {
      showToast(err.message || 'Erro ao gerar tokens', 'error')
      throw err
    }
  }

  async function deleteToken(tokenStr: string) {
    try {
      await agencyApi.deleteInviteToken(tokenStr)
      tokens.value = tokens.value.filter(t => t.token !== tokenStr)
      showToast('Token removido com sucesso!', 'info')
    } catch (err: any) {
      showToast(err.message || 'Erro ao remover token', 'error')
      throw err
    }
  }

  async function fetchAllMembers() {
    isLoading.value = true
    try {
      const [c, w, d] = await Promise.all([
        agencyApi.getClients().catch(() => []),
        agencyApi.getWriters().catch(() => []),
        agencyApi.getDesigners().catch(() => [])
      ])
      clients.value = c
      writers.value = w
      designers.value = d
    } catch (err: any) {
      showToast(err.message || 'Erro ao listar membros', 'error')
    } finally {
      isLoading.value = false
    }
  }

  async function unlinkMember(userId: string) {
    try {
      await agencyApi.unlinkMember(userId)
      clients.value = clients.value.filter(c => c.user.id !== userId)
      writers.value = writers.value.filter(w => w.user.id !== userId)
      designers.value = designers.value.filter(d => d.user.id !== userId)
      showToast('Membro desvinculado com sucesso!', 'info')
    } catch (err: any) {
      showToast(err.message || 'Erro ao desvincular membro', 'error')
      throw err
    }
  }

  async function linkWithToken(tokenStr: string) {
    try {
      const res = await agencyApi.linkByToken(tokenStr)
      showToast(res.details || 'Vinculado com sucesso à agência!', 'success')
      await fetchMyAgency()
      return res
    } catch (err: any) {
      showToast(err.message || 'Erro ao vincular token', 'error')
      throw err
    }
  }

  async function selfUnlink() {
    try {
      const res = await agencyApi.selfUnlink()
      linkedAgency.value = null
      showToast('Desvinculado da agência com sucesso!', 'info')
      return res
    } catch (err: any) {
      showToast(err.message || 'Erro ao se desvincular', 'error')
      throw err
    }
  }

  async function fetchMyAgency() {
    try {
      const data = await agencyApi.getMyAgency()
      linkedAgency.value = data
      return data
    } catch (err: any) {
      linkedAgency.value = null
      return null
    }
  }

  return {
    tokens,
    clients,
    writers,
    designers,
    linkedAgency,
    isLoading,
    fetchTokens,
    createTokens,
    deleteToken,
    fetchAllMembers,
    unlinkMember,
    linkWithToken,
    selfUnlink,
    fetchMyAgency
  }
}
