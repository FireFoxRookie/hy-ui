<template>
  <transition name="noticeTransition">
    <div class="fd-notice relative">
      <div class="fd-notice__content" v-html="content"></div>
      <span class="fd-notice__close pointer absolute block fa fa-times" @click="close"></span>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 1.5
    },
    content: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      closeTimer: ''
    }
  },
  methods: {
    clearCloserTimer() {
      if(this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },
    close() {
      this.clearCloserTimer()
      this.$parent.close(this.name)
    }
  },
  mounted() {
    this.clearCloserTimer()
    if(this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close()
      }, this.duration * 1000)
    }
  }
}
</script>
