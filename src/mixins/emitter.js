export default {
  methods: {
    dispatch(componentName, eventName, param) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      while (parent && (!name || componentName !== name)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(param))
      }
    },
    broadcast(componentName, eventName, param) {
      let children = this.$children;
      children.forEach((child) => {
        let name = child.$options.name
        if (name === componentName) {
          child.$emit.apply(child, [eventName].concat(param))
        } else {
          broadcast.apply(child, [componentName, eventName].concat(param))
        }
      })
    }
  }
}