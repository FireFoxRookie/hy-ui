<template>
  <transition name="noticeTransition">
    <div class="fd-notice relative">
      <div class="fd-notice-content" v-html="content"></div>
      <img class="fd-notice-close pointer absolute block" @click="close" :src="closeImg" />
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
      closeTimer: '',
      closeImg: require('../../../assets/img/hy-close.png')
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
<style lang="stylus">
@import '../../../assets/css/common.styl'
fontMixin(fontSize=14px, fontColor=#666)
  font-size: fontSize
  color: fontColor
  font-family: "Microsoft YaHei"

.fd-notice
  width: 330px
  background-color: #fff
  border-radius: 3px
  padding: 15px
  box-shadow: 0 0 20px #e5e5e5
  right: 15px

.fd-notice .fd-notice-content .fd-notice-contents .fd-notice-icon
  width: 24px
  height: 24px

.fd-notice .fd-notice-content .fd-notice-txt
  margin-left: 15px

.fd-notice .fd-notice-content .fd-notice-txt .fd-notice-title
  fontMixin(16px, #333)
  font-weight: bold

.fd-notice .fd-notice-content .fd-notice-txt .fd-notice-ctxt
  fontMixin(14px)
  margin-top: 10px

.fd-notice .fd-notice-close
  width: 20px
  height: 20px
  right: 10px
  top: 10px

.noticeTransition-enter, .noticeTransition-enter-active
  opacity: 0
  right: -350px
  animation: noticeAppear 0.5s ease-in-out
  -webkit-animation: noticeAppear 0.5s ease-in-out
  -moz-animation: noticeAppear 0.5s ease-in-out
  -ms-animation: noticeAppear 0.5s ease-in-out

@keyframes noticeAppear
  0% {
    opacity: 0
    right: -350px
  }
  to {
    opacity: 1
    right: 10px
  }

@-webkit-keyframes noticeAppear
  0% {
    opacity: 0
    right: -350px
  }
  to {
    opacity: 1
    right: 10px
  }

@-moz-keyframes noticeAppear
  0% {
    opacity: 0
    right: -350px
  }
  to {
    opacity: 1
    right: 10px
  }

@-ms-keyframes noticeAppear
  0% {
    opacity: 0
    right: -350px
  }
  to {
    opacity: 1
    right: 10px
  }

.noticeTransition-leave, .noticeTransition-leave-active
  animation: noticeDisAppear 0.5s ease-in-out
  -webkit-animation: noticeDisAppear 0.5s ease-in-out
  -moz-animation: noticeDisAppear 0.5s ease-in-out
  -ms-animation: noticeDisAppear 0.5s ease-in-out

@keyframes noticeDisAppear
  0% {
    opacity: 1
    right: 10px
  }
  to {
    opacity: 0
    right: -350px
  }

@-webkit-keyframes noticeDisAppear
  0% {
    opacity: 1
    right: 10px
  }
  to {
    opacity: 0
    right: -350px
  }

@-moz-keyframes noticeDisAppear
  0% {
    opacity: 1
    right: 10px
  }
  to {
    opacity: 0
    right: -350px
  }

@-ms-keyframes noticeDisAppear
  0% {
    opacity: 1
    right: 10px
  }
  to {
    opacity: 0
    right: -350px
  }
</style>
