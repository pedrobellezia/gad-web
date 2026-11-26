import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Recovery from '@/pages/Recovery.vue'
import Terms from '@/pages/Terms.vue'
import Privacy from '@/pages/Privacy.vue'
import AgencyDashboard from '@/pages/AgencyDashboard.vue'
import ClientDashboard from '@/pages/ClientDashboard.vue'
import WriterDashboard from '@/pages/WriterDashboard.vue'
import DesignerDashboard from '@/pages/DesignerDashboard.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/recovery', name: 'Recovery', component: Recovery },
  { path: '/terms', name: 'Terms', component: Terms },
  { path: '/privacy', name: 'Privacy', component: Privacy },
  {
    path: '/dashboard-agency',
    name: 'AgencyDashboard',
    component: AgencyDashboard,
    meta: { requiresAuth: true, role: 'agency' }
  },
  {
    path: '/dashboard-client',
    name: 'ClientDashboard',
    component: ClientDashboard,
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/dashboard-writer',
    name: 'WriterDashboard',
    component: WriterDashboard,
    meta: { requiresAuth: true, role: 'writer' }
  },
  {
    path: '/dashboard-designer',
    name: 'DesignerDashboard',
    component: DesignerDashboard,
    meta: { requiresAuth: true, role: 'designer' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('gad_token')
  const role = localStorage.getItem('gad_role')

  if (to.meta.requiresAuth) {
    if (!token) {
      return next({ path: '/login', query: { redirect: to.fullPath } })
    }

    if (to.meta.role && to.meta.role !== role) {
      if (role === 'agency') return next('/dashboard-agency')
      if (role === 'client') return next('/dashboard-client')
      if (role === 'writer') return next('/dashboard-writer')
      if (role === 'designer') return next('/dashboard-designer')
    }

    return next()
  }

  // Se já autenticado e tentando acessar login ou register, redireciona ao dashboard
  if ((to.path === '/login' || to.path === '/register') && token && role) {
    if (role === 'agency') return next('/dashboard-agency')
    if (role === 'client') return next('/dashboard-client')
    if (role === 'writer') return next('/dashboard-writer')
    if (role === 'designer') return next('/dashboard-designer')
  }

  next()
})

export default router