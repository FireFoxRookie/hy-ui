<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <hy-select v-model="select" :searchable="isSerach">
      <hy-option v-for="(item, index) in list" :label="item.name" :value="item.code" :key="index"></hy-option>
    </hy-select>
    <hy-table :columns="columns" :tabledata="tabledata" :total="total" :page-size="pagesize" :pagination="isPagination"></hy-table>
  </div>
</template>

<script>
import hySelect from './components/select/select.vue'
import hyOption from './components/select/option.vue'
import hyTable from './components/table/table.vue'
export default {
  name: 'app',
  components: {
    'hy-select': hySelect,
    'hy-option': hyOption,
    'hy-table': hyTable
  },
  data () {
    return {
      select: '',
      isPagination: true,
      msg: 'Welcome to Your Vue.js App',
      isSerach: true,
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
      }],
      total: 45,
      pagesize: 10
    }
  },
  methods: {
    btnClick() {
      console.log(this.select)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /* display: inline-block; */
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
