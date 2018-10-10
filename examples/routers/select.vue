<template>
  <hy-select v-model="select" :searchable="isSerach">
    <hy-option v-for="(item, index) in list" :label="item.name" :value="item.code" :key="index"></hy-option>
  </hy-select>
</template>
<script>
export default {
  data() {
    return {
      select: '',
      isSerach: true,
      list: [{
        name: '张三',
        code: 'zs'
      }, {
        name: '李四',
        code: 'ls'
      },{
        name: '李四',
        code: 'ls'
      },{
        name: '李四',
        code: 'ls'
      }]
    }
  }
}
</script>