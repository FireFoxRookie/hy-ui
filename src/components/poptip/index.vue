<template>
  <div class="fd-poptip relative" v-clickoutside="hidePoptip">
    <div 
      class="fd-poptip-tag"
      ref="reference"
      @click="clickHandler">
      <slot>
        <div class="pointer fd-poptip-default-txt">弹出框</div>
      </slot>
    </div>
    <div class="fd-poptip-popper" v-show="visible" ref="popper">
      <div class="fd-poptip-popper-content relative">
        <div class="fd-poptip-inner">
          <slot name="content"></slot>
        </div>
        <div class="fd-poptip-popper-arrow absolute"></div>
      </div>
    </div>
  </div>
</template>
<script>
import popper from '../base/popper/index'
import clickoutside from '../../directives/clickoutside'

export default {
  name: 'poptip',
  mixins: [popper],
  directives: {clickoutside},
  methods: {
    clickHandler () {
      this.visible = !this.visible
    },
    hidePoptip () {
      this.visible = false
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/css/common.styl';
@import '../../assets/css/poptips.styl';
</style>
