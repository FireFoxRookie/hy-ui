<template>
  <div>
    <table class="fa-table" cellpadding="0" cellspacing="0">
      <tr class="table-header">
        <td v-for="item in columns" :key="'header' + item.key" v-text="item.text" :width="item.width"></td>
        <td v-if="showhandle">操作</td>
      </tr>
      <tbody v-if="tabledata.length > 0">
        <tr class="table-body" v-for="(data, index) in tabledata" :key="index" :class="{trBgColor: index % 2 !== 0}">
          <td v-for="item in columns" :key="'body' + item.key" v-html="item.render ? item.render(data) : data[item.key]" :width="item.width" class="ellipsis" :title="item.render ? '' : data[item.key]">
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
    <pagination2 v-if="pagination && Math.ceil(total/pageSize)>=2" :total="total" :page-size="pageSize" class="pagination" @pagechange="pagechange" :page-index="pageIndex"></pagination2>
  </div>
</template>