import notification from './notification.vue'
import Vue from 'vue'

notification.newInstance = properties => {
  const proty = properties || {}
  const instance = new Vue({
    render(h) {
      return h(notification, {
        props: proty
      })
    }
  })
  const component = instance.$mount()
  document.body.appendChild(component.$el)
  const notice = component.$children[0]
  return {
    notice(property) {
      notice.add(property)
    },
    remove(name) {
      notice.close(name)
    }
  }
}

export default notification