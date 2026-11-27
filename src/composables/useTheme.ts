import { ref, onMounted } from 'vue'

const isDark = ref(true) // Começa no Dark Mode por padrão para conforto visual

export function useTheme() {
  const applyTheme = (dark: boolean) => {
    isDark.value = dark
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      localStorage.setItem('gad_theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('gad_theme', 'light')
    }
  }

  const toggleTheme = () => {
    applyTheme(!isDark.value)
  }

  onMounted(() => {
    const saved = localStorage.getItem('gad_theme')
    if (saved === 'light') {
      applyTheme(false)
    } else {
      applyTheme(true)
    }
  })

  return {
    isDark,
    toggleTheme,
    applyTheme,
  }
}