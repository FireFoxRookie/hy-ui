<template>
  <hy-table :columns="columns" :tabledata="tabledata" :total="total" :page-size="pagesize" :pagination="isPagination"></hy-table>
</template>
<script>
export default {
  data() {
    return {
      columns: [{
        text: '序号',
        width: '5%',
        render(data, index) {
          return '<div>' + index + '</div>'
        }
      }, {
        text: '姓名',
        width: '10%',
        key: 'name'
      }, {
        text: '性别',
        width: '10%',
        key: 'gender'
      }, {
        text: '公司',
        width: '15%',
        key: 'company'
      }, {
        text: '职位',
        width: '20%',
        key: 'position'
      }],
      tabledata: [
        {
          name: '张三',
          gender: '男',
          company: 'XXXXXXX有限公司',
          position: '前端开发工程师'
        },
        {
          name: '李四',
          gender: '男',
          company: 'XXXXXXX有限公司',
          position: '前端开发工程师'
        },
        {
          name: '李四',
          gender: '男',
          company: 'XXXXXXX有限公司',
          position: '前端开发工程师'
        }
      ],
      total: 45,
      pagesize: 10,
      isPagination: true
    }
  }
}
</script>