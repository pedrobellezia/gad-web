const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://api.gadagencia.com.br:8000'

export interface ApiRequestOptions extends RequestInit {
  params?: Record<string, any>
  bodyData?: any
}

export class ApiError extends Error {
  status: number
  data: any

  constructor(status: number, message: string, data?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export async function apiFetch<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const token = localStorage.getItem('gad_token')
  const headers = new Headers(options.headers || {})

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let url = `${BASE_URL}${endpoint}`
  if (options.params) {
    const searchParams = new URLSearchParams()
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, String(v)))
        } else {
          searchParams.set(key, String(value))
        }
      }
    })
    const qs = searchParams.toString()
    if (qs) {
      url += (url.includes('?') ? '&' : '?') + qs
    }
  }

  let body = options.body
  if (options.bodyData !== undefined) {
    if (options.bodyData instanceof FormData) {
      body = options.bodyData
      // Let browser set boundary automatically
    } else {
      headers.set('Content-Type', 'application/json')
      body = JSON.stringify(options.bodyData)
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body
  })

  const contentType = response.headers.get('content-type') || ''
  let responseData: any = null
  if (contentType.includes('application/json')) {
    responseData = await response.json().catch(() => null)
  } else if (contentType.startsWith('text/')) {
    responseData = await response.text().catch(() => null)
  } else if (response.status !== 204) {
    responseData = await response.blob().catch(() => null)
  }

  if (!response.ok) {
    let message = 'Ocorreu um erro na requisição'
    if (responseData) {
      if (typeof responseData === 'string') {
        message = responseData
      } else if (responseData.detail) {
        message = typeof responseData.detail === 'string' ? responseData.detail : JSON.stringify(responseData.detail)
      } else if (responseData.message) {
        message = responseData.message
      }
    }
    throw new ApiError(response.status, message, responseData)
  }

  return responseData as T
}

export function getMediaFileUrl(mediaId: string): string {
  return `${BASE_URL}/media/${mediaId}/file`
}
