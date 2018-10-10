<style lang="less">
  @import '../src/styles/index.less';
</style>
<template>
  <div class="container">
        <nav>
            <ul>
                <li><router-link to="/table">表格</router-link></li>
                <li><router-link to="/notice">提示</router-link></li>
                <li><router-link to="/select">下拉框</router-link></li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>