import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Recovery from '@/pages/Recovery.vue'
import AgencyDashboard from '@/pages/AgencyDashboard.vue'
import ClientDashboard from '@/pages/ClientDashboard.vue'
import WriterDashboard from '@/pages/WriterDashboard.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/recovery', name: 'Recovery', component: Recovery },
  { path: '/dashboard-agency', name: 'AgencyDashboard', component: AgencyDashboard },
  { path: '/dashboard-client', name: 'ClientDashboard', component: ClientDashboard },
  { path: '/dashboard-writer', name: 'WriterDashboard', component: WriterDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
