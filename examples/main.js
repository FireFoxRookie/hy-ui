import Vue from 'vue'
import VueRouter from 'vue-router'
import hyUI from '../src/index.js'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(hyUI)

const router = new VueRouter({
  routes: [
    {
      path: '/table',
      component: (resolve) => require(['./routers/table.vue'], resolve)
    },
    {
      path: '/notice',
      component: (resolve) => require(['./routers/notice.vue'], resolve)
    },
    {
      path: '/select',
      component: (resolve) => require(['./routers/select.vue'], resolve)
    }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})


