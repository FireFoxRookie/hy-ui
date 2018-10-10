<template>
    <li v-show="!hidden" style="display: block" class="ellipsis fd-option__li" :class="{'pointer': !disabled, 'notAllowed': disabled, 'fd-option__li--selected': selected}" :disabled="disabled" @click.stop="listClick">{{label}}</li>
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