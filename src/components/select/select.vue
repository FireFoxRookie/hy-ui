<template>
  <div class="fd-select__content relative inline-block" v-clickoutside="hideDrop">
    <div class="fd-select__input pointer">
      <span v-show="showPlaceHolder&&!searchable" class="float-left block" @click.stop="dropClick">{{placeholder}}</span>
      <span v-show="!showPlaceHolder&&!searchable" class="float-left block" @click.stop="dropClick">{{selectedSingle}}</span>
      <input v-if="searchable" v-model="query" type="text" class="float-left block" @click.stop="dropClick" :class="{pointer: !isDrop||!searchable}" :placeholder="placeholder"/>
      <div class="fd-select__inputArrow float-left relative pointer" @click.stop="dropClick">
        <div class="absolute" :class="{'fd-select__isDrop': isDrop}"></div>
      </div>
    </div>
    <transition name="slide-up">
    <div class="fd-select__list absolute" v-show="isDrop">
      <div class="fd-select__arrow absolute"></div>
      <ul class="fd-select__ul" v-show="noFoundShow">
        <li class="fd-select__li--nofound">暂无数据</li>
      </ul>
      <ul class="fd-select__ul" v-show="!noFound">
        <slot></slot>
      </ul>
    </div>
    </transition>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter.js'
import clickoutside from '../../directives/clickoutside.js'
export default {
  name: 'hy-select',
  mixins: [Emitter],
  directives: {clickoutside},
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    searchable: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  data() {
    return {
      isDrop: false,
      noFound: false,
      options: [],
      optionInstances: [],
      query: '',
      model: this.value,
      selectedSingle: ''
    }
  },
  computed: {
    noFoundShow () {
      const options = this.$slots.default || []
      return this.noFound || options.length === 0
    },
    showPlaceHolder () {
      let status = false
      if (this.model === '' || this.model === null) {
        status = true
      }
      return status
    }
  },
  watch: {
    query (newVal) {
      this.broadcast('hy-option', 'query', newVal)
      this.$nextTick(() => {
        let is_hidden = true
        this.findOptions((child) => {
          if(!child.hidden) {
            is_hidden = false
          }
        })
        this.noFound = is_hidden
      })
    },
    model (newVal) {
      this.$emit('input', newVal)
      this.updateSingleSelect()
    },
    isDrop (newVal) {
      if(!newVal && this.searchable) {
        this.modelToQuery()
      }
      if(newVal) {
        this.findOptions((child) => {
          child.hidden = false
        })
      }
    }
  },
  mounted() {
    this.updatOptions()
    this.$on('selected', (value) => {
      if(this.model === value) {
        this.hideMenu()
      } else {
        this.model = value
        if(this.searchable) {
          debugger
          this.findOptions((child) => {
            if (child.value === this.model) {
              this.query = (child.label === undefined) ? child.$el.textContent : child.label
            }
          })
        }
      }
    })
  },
  methods: {
    dropClick() {
      this.isDrop = !this.isDrop
    },
    hideDrop() {
      this.isDrop = false
    },
    findOptions(cb) {
      const find = function(child) {
        var name = child.$options.name
        if(name === 'hy-option') {
          cb(child)
        }
      }
      if(this.optionInstances.length) {
        this.optionInstances.forEach((child) => {
          find(child)
        })
      } else {
        const options = this.$children || []
        options.forEach((child) => {
          find(child)
        })
      }
    },
    updatOptions() {
      let options = []
      this.findOptions((child) => {
        options.push({
          value: child.value,
          label: (child.label === undefined) ? child.$el.textContent : child.label
        })
        this.optionInstances.push(child)
      })
      this.options = options
    },
    updateSingleSelect() {
      this.findOptions((child) => {
        debugger
        if (child.value === this.model) {
          this.selectedSingle = (child.label === undefined) ? child.$el.textContent : child.label
          child.selected = true
        } else {
          child.selected = false
        }
      })
      this.hideMenu()
    },
    hideMenu() {
      this.isDrop = false
    },
    modelToQuery() {
      this.findOptions((child) => {
        if(this.model === child.value) {
          this.query = child.label
        }
      })
    }
  }
}
</script>
