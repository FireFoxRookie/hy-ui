export default {
  bind: function (el, binding, vnode) {
    function handler(e) {
      if(el.contains(e.target)) {
        return
      }
      if(binding.expression) {
        binding.value(e)
      }
    }
    el._vueClickOutSide_ = handler
    if (document.addEventListener) {
      document.addEventListener('click', handler)
    } else {
      document.attachEvent('click', handler)
    }
  },
  unbind: function(el, binding, vnode) {
    document.removeEventListener('click', el._vueClickOutSide_)
    delete el._vueClickOutSide_
  }
}