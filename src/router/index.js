import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/info', component: 'Info' },
  { path: '/listen/:index', component: 'Listen' },
  { path: '/evaluate', component: 'Evaluate' },
  { path: '/statsForBoss', component: 'Stats' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})
