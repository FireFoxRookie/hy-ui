<template>
  <div class="fd-select-content relative inline-block" v-clickoutside="hideDrop">
    <div class="fd-select-input pointer">
      <span v-show="showPlaceHolder&&!searchable" class="float-left block" @click.stop="dropClick">{{placeholder}}</span>
      <span v-show="!showPlaceHolder&&!searchable" class="float-left block" @click.stop="dropClick">{{selectedSingle}}</span>
      <input v-if="searchable" v-model="query" type="text" class="float-left block" @click.stop="dropClick" :class="{pointer: !isDrop||!searchable}" :placeholder="placeholder"/>
      <div class="fd-select-input-arrow float-left relative pointer" @click.stop="dropClick">
        <div class="absolute" :class="{isDrop: isDrop}"></div>
      </div>
    </div>
    <transition name="slide-up">
    <div class="fd-select-list absolute" v-show="isDrop">
      <div class="fd-select-arrow absolute"></div>
      <ul class="fd-select-ul" v-show="noFoundShow">
        <li class="fd-select-li-nofound">暂无数据</li>
      </ul>
      <ul class="fd-select-ul" v-show="!noFound">
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
<style lang="stylus" scoped>
@import '../../assets/css/common.styl';
fontMixin(fontSize=14px, fontColor=#666)
  font-size: fontSize
  color: fontColor
  font-family: "Microsoft YaHei"

.fd-select-content .fd-select-input
  height: 30px

.fd-select-content .fd-select-input>input, .fd-select-content .fd-select-input>span
  height: 100%
  width: 150px
  border: 1px solid #ccc
  border-radius: 3px 0 0 3px
  line-height: 30px
  text-indent: 10px
  outline: none
  fontMixin()

.fd-select-content .fd-select-input>span
  line-height: 28px

.fd-select-content .fd-select-input-arrow
  height: 100%
  width: 30px
  border: 1px solid #ccc
  border-left: 0
  border-radius: 0 3px 3px 0

.fd-select-content .fd-select-input-arrow>div
  width: 8px
  height: 8px
  border: 1px solid #ccc
  border-top: 0
  border-left: 0
  left: 50%
  top: 50%
  margin-left: -6px
  margin-top: -6px
  transform: rotate(45deg)
  transform-origin: 75% 75%
  -webkit-transform: rotate(45deg)
  -ms-transform: rotate(45deg)
  -moz-transform: rotate(45deg)
  transition: transform 0.3s linear

.fd-select-content .fd-select-input-arrow .isDrop
  transform: rotate(225deg)

.fd-select-content .fd-select-list
  background-color: #fff
  padding: 10px
  top: 40px
  left: 0
  width: 100%
  z-index: 10
  border: 1px solid #eee
  box-shadow: 0 0 10px 1px #efefef
  border-radius: 6px

.fd-select-content .fd-select-arrow
  width: 10px
  height: 10px
  border: 1px solid #eee
  background-color: #fff
  border-right: 0
  border-bottom: 0
  transform: rotae(45deg)
  -webkit-transform: rotate(45deg)
  -ms-transform: rotate(45deg)
  -moz-transform: rotate(45deg)
  z-index: 20
  left: 50%
  margin-left: -5px
  top: -4px

.fd-select-content .fd-select-list .fd-select-ul>li
  font-family: 'Microsoft YaHei'
  border-radius: 3px
  max-height: 200px
  overflow-y: auto
  display: block

.fd-select-content .fd-select-list .fd-select-ul>li:last-child 
  margin-bottom: 0

.fd-select-content .fd-select-list .fd-select-li-nofound
  height: 30px
  padding: 5px 10px
  border-radius: 3px
  line-height: 20px
  fontMixin(14px, #999)

.fd-select-content .fd-select-list .fd-select-li-nofound:hover
  background-color: #4ba7fe
  color: #fff

@keyframes selectSlideUpIn {
    0% {
        opacity: 0
        transform-origin: 0 0
        transform: scaleY(.8)
    }

    to {
        opacity: 1
        transform-origin: 0 0
        transform: scaleY(1)
    }
}

@-webkit-keyframes selectSlideUpIn {
    0% {
        opacity: 0
        transform-origin: 0 0
        transform: scaleY(.8)
    }

    to {
        opacity: 1
        transform-origin: 0 0
        transform: scaleY(1)
    }
}

@-moz-keyframes selectSlideUpIn {
    0% {
        opacity: 0
        transform-origin: 0 0
        transform: scaleY(.8)
    }

    to {
        opacity: 1
        transform-origin: 0 0
        transform: scaleY(1)
    }
}

@keyframes selectSlideUpOut {
    0% {
        opacity: 1
        transform-origin: 0 0
        transform: scaleY(1)
    }

    to {
        opacity: 0
        transform-origin: 0 0
        transform: scaleY(.8)
    }
}

@-webkit-keyframes selectSlideUpOut {
    0% {
        opacity: 1
        transform-origin: 0 0
        transform: scaleY(1)
    }

    to {
        opacity: 0
        transform-origin: 0 0
        transform: scaleY(.8)
    }
}

@-moz-keyframes selectSlideUpOut {
    0% {
        opacity: 1
        transform-origin: 0 0
        transform: scaleY(1)
    }

    to {
        opacity: 0
        transform-origin: 0 0
        transform: scaleY(.8)
    }
}

.slide-up-appear,.slide-up-enter-active,.slide-up-leave-active {
    animation-duration: .3s
}

.slide-up-appear,.slide-up-enter-active {
    animation-name: selectSlideUpIn
}

.slide-up-leave-active {
    animation-name: selectSlideUpOut
}

.slide-up-appear,.slide-up-enter-active {
    opacity: 0
    animation-timing-function: ease-in-out
}

.slide-up-leave-active {
    animation-timing-function: ease-in-out
}
</style>
