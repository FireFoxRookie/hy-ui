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
    <hy-poptip placement="bottom-start" class="fd-poptip" v-model="poptipIsShow">
      <div class="inline-block">poptip</div>
      <div slot="content" class="fd-poptip-content">
        <div class="fd-poptip-list" v-for="(item, index) in popList" :key="index" v-text="item.name"></div>
        <div class="clear"></div>
      </div>
    </hy-poptip>
    <hy-poptip placement="right-start" class="fd-poptip" v-model="poptipRightIsShow">
      <div class="inline-block">poptip</div>
      <div slot="content" class="fd-poptip-content">
        <div class="fd-poptip-list" v-for="(item, index) in popList" :key="index" v-text="item.name"></div>
        <div class="clear"></div>
      </div>
    </hy-poptip>
    <hy-poptip placement="left-start" class="fd-poptip" v-model="poptipLeftIsShow">
      <div class="inline-block">poptip</div>
      <div slot="content" class="fd-poptip-content">
        <div class="fd-poptip-list" v-for="(item, index) in popList" :key="index" v-text="item.name"></div>
        <div class="clear"></div>
      </div>
    </hy-poptip>
    <hy-select v-model="select" :searchable="isSerach">
      <hy-option v-for="(item, index) in list" :label="item.name" :value="item.code" :key="index"></hy-option>
    </hy-select>
    <hy-table :columns="columns" :tabledata="tabledata" :total="total" :page-size="pagesize" :pagination="isPagination"></hy-table>
    <button @click="showNotice">notice</button>
  </div>
</template>

<script>
import hySelect from './components/select/select.vue'
import hyOption from './components/select/option.vue'
import hyTable from './components/table/table.vue'
import hyPoptip from './components/poptip/index.js'
export default {
  name: 'app',
  components: {
    'hy-select': hySelect,
    'hy-option': hyOption,
    'hy-table': hyTable,
    'hy-poptip': hyPoptip
  },
  data () {
    return {
      select: '',
      isPagination: true,
      msg: 'Welcome to Your Vue.js App',
      isSerach: true,
      poptipRightIsShow: false,
      poptipLeftIsShow: false,
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
      pagesize: 10,
      popList: [{
        name: 'poptip1',
        code: 'poptip1'
      }, {
        name: 'poptip2',
        code: 'poptip2'
      }, {
        name: 'poptip3',
        code: 'poptip3'
      }, {
        name: 'poptip4',
        code: 'poptip4'
      }],
      poptipIsShow: false
    }
  },
  mounted () {
    this.showNotice()
  },
  methods: {
    btnClick() {
      console.log(this.select)
    },
    showNotice() {
      this.$notice.success({
        title: '正确',
        desc: '演示正确',
        duration: 1.5
      })
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

.fd-poptip-list {
  float: left;
}

.fd-poptip {
  display: inline-block;
}
</style>
