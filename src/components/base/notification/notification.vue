<template>
  <div class="fd-notification" :style="styles">
    <notice
      v-for="item in noticeList"
      :key="item.name"
      :duration="item.duration"
      :content="item.content"
      :name="item.name">
    </notice>
  </div>
</template>
<script>
import notice from "./notice.vue";
export default {
  components: {notice},
  props: {
    styles: {
      type: Object,
      default: function() {
        return {
          top: "65px",
          right: 0
        };
      }
    }
  },
  data() {
    return {
      noticeList: []
    }
  },
  methods: {
    add(notice) {
      this.noticeList.push(notice)
    },
    close(name) {
      const notices = this.noticeList
      for(let i = 0; i < notices.length; i++) {
        if(notices[i].name === name) {
          notices.splice(i, 1)
        }
      }
    }
  }
};
</script>
<style scope lang="stylus">
.fd-notification
  position: fixed
  z-index: 999
</style>