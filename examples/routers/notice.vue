<template>
<div>
  <button @click="sucClick">成功</button>
  <button @click="warnClick">警告</button>
  <button @click="errorClick">失败</button>
</div>
</template>
<script>
export default {
  methods: {
    sucClick() {
      this.$notice.success({
        title: 'success',
        desc: '成功'
      })
    },
    warnClick() {
      this.$notice.warning({
        title: 'warning',
        desc: '警告'
      })
    },
    errorClick() {
      this.$notice.error({
        title: 'error',
        desc: '失败'
      })
    }
  }
}
</script>