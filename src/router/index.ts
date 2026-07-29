import { createRouter, createWebHistory } from 'vue-router'
import painel  from '../components/painel.vue'
import Login from '@/components/login.vue'
import { jwtDecode } from 'jwt-decode'
import Cadastro from '@/components/cadastro.vue'


const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/painel/:id',
    name: 'painel',
    component: painel,
    meta: {requiresAuth: true}
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
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
    const token = localStorage.getItem("token")

    if (!to.meta.requiresAuth) {
        return next()
    }

    if (!token) {
        return next('/')
    }

    try {
        const decoded = jwtDecode(token)
        const agora = Math.floor(Date.now() / 1000)

        if (!decoded.exp || decoded.exp < agora) {
            localStorage.removeItem('token')
            return next('/')
        }

        if (Number(to.params.id) !== Number(decoded.sub)) {
            localStorage.removeItem('token')
            return next('/')
        }

        return next()
    } catch {
        localStorage.removeItem('token')
        return next('/')
    }
})

export default router
