import Vue from 'vue'
import App from './App.vue'
import notice from './components/notice'

Vue.prototype.$notice = notice

new Vue({
  el: '#app',
  render: h => h(App)
})
