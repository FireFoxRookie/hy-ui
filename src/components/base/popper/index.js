/**
 * @author  xiawx
 * @description  初始化Popper, 绑定弹出框的位置
 */
import Popper from 'popper.js'
export default {
  props: {
    // 弹出框是否显示
    value: {
      type: Boolean,
      default: false
    },
    // 弹出框出现的位置
    // 可取的值只有：left, right, top, bottom, top-start, bottom-start
    placement: {
      type: String,
      default: 'bottom'
    },
    // popper库的配置
    options: Object
  },
  data () {
    return {
      // 控制弹出框是否显示
      visible: this.value,
      // popper实例
      popperJS: null
    }
  },
  watch: {
    value (newVal) {
      this.visible = newVal
    },
    visible (newVal) {
      if (newVal) {
        this.updatePopper()
      }
      this.$emit('input', newVal)
    }
  },
  methods: {
    createPoper () {
      if (!/^(top|bottom|right|left)(-start|-bottom)/g.test(this.placement)) {
        return false
      }
      const reference = this.$refs.reference
      const popper = this.$refs.popper
      const options = this.options || {}
      if (!reference || !popper) {
        return false
      }
      options.placement = this.placement
      options.onCreate = () => {
        this.$nextTick(this.updatePopper)
      }
      this.popperJS = new Popper(reference, popper, options)
    },
    // 更新对应的popper
    updatePopper () {
      this.popperJS ? this.popperJS.update() : this.createPoper()
    }
  },
  beforeDestroy () {
    if (this.popperJS) {
      this.popperJS.destroy()
      this.popperJS = null
    }
  }
}