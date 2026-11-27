import { ref } from 'vue'

export interface ConfirmOptions {
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
}

export interface PromptOptions {
  title: string
  label: string
  defaultValue?: string
  placeholder?: string
  inputType?: 'text' | 'number'
  min?: number
  max?: number
  confirmLabel?: string
  cancelLabel?: string
}

interface DialogState {
  kind: 'confirm' | 'prompt'
  confirm?: ConfirmOptions
  prompt?: PromptOptions
  resolve: (value: boolean | string | null) => void
}

const current = ref<DialogState | null>(null)

function open(state: Omit<DialogState, 'resolve'>): Promise<boolean | string | null> {
  // Fecha um diálogo pendente (cancelando) antes de abrir outro
  current.value?.resolve(state.kind === 'confirm' ? false : null)
  return new Promise(resolve => {
    current.value = { ...state, resolve }
  })
}

export function useDialog() {
  function confirmDialog(options: ConfirmOptions): Promise<boolean> {
    return open({ kind: 'confirm', confirm: options }) as Promise<boolean>
  }

  function promptDialog(options: PromptOptions): Promise<string | null> {
    return open({ kind: 'prompt', prompt: options }) as Promise<string | null>
  }

  function settle(value: boolean | string | null) {
    const state = current.value
    current.value = null
    state?.resolve(value)
  }

  return {
    current,
    confirmDialog,
    promptDialog,
    settle
  }
}
