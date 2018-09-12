<template>
    <li v-show="!hidden" class="ellipsis fd-option-li" :class="{'pointer': !disabled, 'notAllowed': disabled, 'fd-option-li-selected': selected}" :disabled="disabled" @click.stop="listClick">{{label}}</li>
</template>
<script>
import Emitter from '../../mixins/emitter'
export default {
  name: "hy-option",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: false,
      hidden: false
    }
  },
  mounted() {
    this.$on('query', (val) => {
      this.query(val)
    })
  },
  methods: {
    listClick() {
      if (this.disabled) return
      this.dispatch('hy-select', 'selected', this.value)
    },
    query(val) {
      const parsedQuery = val.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      this.hidden = !new RegExp(parsedQuery, 'i').test(this.label)
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/common.styl';
fontMixin(fontSize= 14px, fontColor= #666)
  font-size: fontSize
  color: fontColor
  font-family: 'Microsoft YaHei'

.fd-option-li
  height: 30px
  padding: 5px 10px
  border-radius: 3px
  line-height: 20px
  margin-bottom: 5px
  fontMixin()

.fd-option-li:hover
  background-color: #4ba7fe
  color: #fff

.fd-option-li-selected
  background-color: #4ba7fe
  color: #fff
</style>
