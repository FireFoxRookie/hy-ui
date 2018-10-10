<template>
  <div class="fd-table-ele fd-table__wrap">
    <table class="fd-table__table" cellpadding="0" cellspacing="0">
      <tr class="fd-table__header">
        <td v-for="item in columns" :key="'header' + item.key" v-text="item.text" :width="item.width"></td>
        <td v-if="showhandle">操作</td>
      </tr>
      <tbody v-if="tabledata.length > 0">
        <tr class="fd-table__body" v-for="(data, index) in tabledata" :key="index" :class="{'fd-table__trBgColor': stripe && index % 2 !== 0}">
          <td v-for="item in columns" :key="'body' + item.key" v-html="item.render ? item.render(data, index) : data[item.key]" :width="item.width" class="ellipsis" :title="item.render ? '' : data[item.key]">
          </td>
          <td v-if="showhandle">
            <slot name="opera" :row="data"></slot>
          </td>
        </tr>
      </tbody>
      <tr v-if="tabledata.length === 0">
        <td :colspan="showhandle ? columns.length + 1 : columns">暂无数据</td>
      </tr>
    </table>
    <pagination v-if="pagination && Math.ceil(total/pageSize)>=2" :total="total" :page-size="pageSize" class="fd-table__pagination" @pagechange="pagechange" :page-index="pageIndex"></pagination>
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
