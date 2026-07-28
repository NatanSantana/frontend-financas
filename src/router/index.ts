import { createRouter, createWebHistory } from 'vue-router'
import painel  from '../components/painel.vue'
import Login from '@/components/login.vue'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/painel/:id',
    name: 'painel',
    component: painel
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }

],
})
function sessaoExpirada() {
    const token = localStorage.getItem('token')
    if (!token) return true

    const dados = jwtDecode(token)
    if (!dados || !dados.exp) return true

    const agora = Math.floor(Date.now() / 1000)
    return dados.exp < agora
}

router.beforeEach((to, from, next) => {
    if (to.name === 'painel' && sessaoExpirada()) {
        localStorage.removeItem('token')
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
