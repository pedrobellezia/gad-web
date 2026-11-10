import { apiFetch } from './client'
import type { DetailsResponse } from '@/types/api'

export interface LoginPayload {
  email: string
  pswd: string
  restore?: boolean
}

export interface LoginResponse {
  token: string
}

export interface RegisterAgencyPayload {
  kind: 'agency'
  cnpj: string
  user: {
    name: string
    email: string
    pswd: string
  }
}

export interface RegisterMemberPayload {
  kind: 'writer' | 'designer' | 'client'
  user: {
    name: string
    email: string
    pswd: string
  }
}

export type RegisterPayload = RegisterAgencyPayload | RegisterMemberPayload

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
}

export const authApi = {
  login(payload: LoginPayload) {
    return apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      bodyData: payload
    })
  },

  register(payload: RegisterPayload) {
    return apiFetch<DetailsResponse>('/auth/register', {
      method: 'POST',
      bodyData: payload
    })
  },

  changePassword(payload: ChangePasswordPayload) {
    return apiFetch<DetailsResponse>('/auth/password', {
      method: 'PATCH',
      bodyData: payload
    })
  }
}
