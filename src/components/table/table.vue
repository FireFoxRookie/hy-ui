<template>
  <div class="fd-table-ele">
    <table class="fd-table" cellpadding="0" cellspacing="0">
      <tr class="fd-table-header">
        <td v-for="item in columns" :key="'header' + item.key" v-text="item.text" :width="item.width"></td>
        <td v-if="showhandle">操作</td>
      </tr>
      <tbody v-if="tabledata.length > 0">
        <tr class="fd-table-body" v-for="(data, index) in tabledata" :key="index" :class="{'fd-trBgColor': stripe && index % 2 !== 0}">
          <td v-for="item in columns" :key="'body' + item.key" v-html="item.render ? item.render(data, index) : data[item.key]" :width="item.width" class="ellipsis" :title="item.render ? '' : data[item.key]">
          </td>
          <td v-if="showhandle">
            <slot name="opera" :row="data"></slot>
          </td>
        </tr>
      </tbody>
      <tr class="table-null" v-if="tabledata.length === 0">
        <td :colspan="showhandle ? columns.length + 1 : columns">暂无数据</td>
      </tr>
    </table>
    <pagination v-if="pagination && Math.ceil(total/pageSize)>=2" :total="total" :page-size="pageSize" class="fd-pagination" @pagechange="pagechange" :page-index="pageIndex"></pagination>
  </div>
</template>
<script>
import pagination from "../pagination/pagination.vue";
export default {
  name: "hy-table",
  components: {pagination},
  props: {
    columns: {
      type: Array,
      default: []
    },
    stripe: {
      type: Boolean,
      default: false
    },
    tabledata: {
      type: Array,
      default: []
    },
    showhandle: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  methods: {
    pagechange: function(page) {
      this.$emit("pagechange", page)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/css/common.styl';
fontMixin(fontSize=14px, fontColor=#666) 
  font-size: fontSize
  color: fontColor
  font-family: 'Microsoft YaHei' 
  
.fd-table-ele .fd-table
  width: 100%
  table-layout: fixed
  border: 1px solid #e3ebee
  border-left: 0
  text-align: center
  fontMixin(14px, #596887)

.fd-table-ele .fd-table .fd-table-header 
  background-color: #e3ebee

.fd-table-ele .fd-table td
  padding: 10px 5px
  border-left: 1px solid #e3ebee

.fd-table-ele .fd-table .fd-table-header td:not(:first-child)
  border-color: #fff

.fd-table-ele .fd-table .fd-trBgColor
  background-color: #f3f9fa

.fd-table-ele .fd-pagination
  margin-top: 20px
</style>
