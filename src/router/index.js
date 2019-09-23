import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      name: 'Home',
      path: '/home',
      component: require('@/components/home.vue').default
    },
    {
      name: 'CrudTable',
      path: '/crudTable',
      component: require('@/components/crudTable.vue').default
    },
    {
      name: 'Lottery',
      path: '/lottery',
      component: require('@/components/lottery.vue').default
    }
  ]
})

export default router
