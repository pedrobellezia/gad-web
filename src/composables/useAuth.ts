import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authApi, type LoginPayload, type RegisterPayload } from '@/api/auth'
import { meApi } from '@/api/me'
import type { User, ProfileResponse, UserType } from '@/types/api'
import { useToast } from './useToast'

const token = ref<string | null>(localStorage.getItem('gad_token'))
const currentUser = ref<User | null>(null)
const currentProfile = ref<ProfileResponse | null>(null)
const userAvatarUrl = ref<string>('')
const isLoading = ref<boolean>(false)

export function useAuth() {
  const router = useRouter()
  const { showToast } = useToast()

  const isAuthenticated = computed(() => !!token.value)
  const userType = computed<UserType | null>(() => currentUser.value?.type || null)

  async function fetchProfile() {
    if (!token.value) {
      currentUser.value = null
      currentProfile.value = null
      return null
    }

    try {
      isLoading.value = true
      const profile = await meApi.getMe()
      currentProfile.value = profile
      const usr = 'user' in profile ? profile.user : null
      currentUser.value = usr
      if (usr) {
        localStorage.setItem('gad_role', usr.type)
        if (usr.avatar) {
          try {
            const blob = await meApi.getAvatarBlob()
            if (userAvatarUrl.value) URL.revokeObjectURL(userAvatarUrl.value)
            userAvatarUrl.value = URL.createObjectURL(blob)
          } catch {
            userAvatarUrl.value = ''
          }
        } else {
          userAvatarUrl.value = ''
        }
      }
      return profile
    } catch (err: any) {
      if (err.status === 401) {
        logout(false)
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function login(payload: LoginPayload) {
    isLoading.value = true
    try {
      const res = await authApi.login(payload)
      token.value = res.token
      localStorage.setItem('gad_token', res.token)
      await fetchProfile()

      showToast('Login realizado com sucesso!', 'success')
      redirectToDashboard()
      return res
    } catch (err: any) {
      if (err.status === 409) {
        // Conta desativada
        throw err
      }
      showToast(err.message || 'Erro ao realizar login', 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(payload: RegisterPayload) {
    isLoading.value = true
    try {
      const res = await authApi.register(payload)
      showToast('Cadastro realizado com sucesso! Faça login para continuar.', 'success')
      return res
    } catch (err: any) {
      showToast(err.message || 'Erro ao realizar cadastro', 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function logout(showMessage = true) {
    token.value = null
    currentUser.value = null
    currentProfile.value = null
    if (userAvatarUrl.value) {
      URL.revokeObjectURL(userAvatarUrl.value)
      userAvatarUrl.value = ''
    }
    localStorage.removeItem('gad_token')
    localStorage.removeItem('gad_role')
    if (showMessage) {
      showToast('Você saiu da sua conta.', 'info')
    }
    router.push('/login')
  }

  function redirectToDashboard() {
    if (!currentUser.value) {
      router.push('/')
      return
    }

    switch (currentUser.value.type) {
      case 'agency':
        router.push('/dashboard-agency')
        break
      case 'client':
        router.push('/dashboard-client')
        break
      case 'writer':
        router.push('/dashboard-writer')
        break
      case 'designer':
        router.push('/dashboard-designer')
        break
      default:
        router.push('/')
    }
  }

  return {
    token,
    currentUser,
    user: currentUser,
    userAvatarUrl,
    currentProfile,
    isLoading,
    isAuthenticated,
    userType,
    fetchProfile,
    login,
    register,
    logout,
    redirectToDashboard
  }
}
