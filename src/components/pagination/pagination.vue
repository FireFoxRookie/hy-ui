<template>
  <div class="fd-pagination__wrap">
    <div class="fd-pagination__jump float-right" v-if="size > 5">
      <div class="fd-pagination__inputNum float-left relative">
        <label>跳转到:</label>
        <input type="text" v-model="inputPage"/>
        <div class="fd-pagination__errorTip absolute" :class="{'fd-pagination__showTip': ishowTip}" v-show="ishowTip">
          <div class="fd-pagination__arrow absolute"></div>
          <div class="fd-pagination__tipTxt relative">非数字</div>
        </div>
      </div>
      <div class="fd-pagination__jumpBtn float-left" @click="jump">GO</div>
    </div>
    <div class="fd-pagination__num float-right">
      <div class="fd-pagination__move pointer float-left fd-pagination__pre" :class="{'fd-pagination__notAllowed': curPage === 1}" @click="pre">上一页</div>
      <div class="fd-pagination__numWrap float-left" id="fd-paginationNum">
        <div class="fd-pagination__numList relative">
          <div class="float-left fd-pagination__numItem pointer" @click="numClick(index)" :class="{'fd-pagination__itemhover': curPage !== index, 'fd-pagination__itemActive': curPage === index}" v-for="index in size" v-text="index" :key="index"></div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="fd-pagination__move pointer float-left" :class="{'fd-pagination__notAllowed': curPage === size}" @click="next">下一页</div>
      <div class="fd-pagination__move pointer float-left" v-show="size > 5" :class="{'fd-pagination__notAllowed': curPage === size}" @click="toLast">末页</div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hy-pagination',
  props: {
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
  data() {
    return {
      curPage: this.pageIndex,
      size: 0,
      inputPage: "",
      ishowTip: false
    }
  },
  created: function() {
    this.getSize(this.total)
  },
  mounted: function() {
    this.setWidth()
  },
  watch: {
    pageIndex: function(newVal) {
      this.curPage = newVal
    },
    total: function(newVal) {
      this.getSize(newVal)
      this.setWidth()
    }
  },
  methods: {
    // 页码点击事件
    numClick: function(index) {
      this.curPage = index
      this.moveList()
    },
    // 获取当前页数
    getSize: function(val) {
      this.size = Math.ceil(val / this.pageSize)
    },
    // 设置页码包含内容的宽度
    setWidth: function() {
      var dom = document.getElementById("fd-paginationNum")
      if (this.size <= 5) {
        dom.style.width = this.size * 30 + (this.size - 1) * 10 + "px"
      } else {
        dom.style.width = "190px"
      }
    },
    // 页面条移动事件
    moveList: function() {
      if (this.curPage <= this.size - 2 && this.curPage >= 3) {
        $(".pagination-num-list").css("left", -(this.curPage - 3) * 40 + "px")
      } else if (this.curPage > this.size - 2 && this.size > 5) {
        $(".pagination-num-list").css("left", -(this.size - 5) * 40 + "px")
      } else if (this.curPage < 3) {
        $(".pagination-num-list").css("left", "0px")
      }
      this.$emit("pagechange", this.curPage)
    },
    // 上一页的点击事件
    pre: function() {
      if (this.curPage === 1) return
      this.curPage -= 1
      this.moveList()
    },
    // 下一页的点击事件
    next: function() {
      if (this.curPage === this.size) return
      this.curPage += 1
      this.moveList()
    },
    // 跳转到最后一页的事件
    toLast: function() {
      if (this.curPage === this.size) return
      this.curPage = this.size
      this.moveList()
    },
    //跳转到指定页的事件 
    jump: function() {
      var pageNum = Number(this.inputPage)
      var _this = this
      if (isNaN(pageNum)) {
        this.ishowTip = true
        setTimeout(function() {
          _this.ishowTip = false
          _this.inputPage = ""
        }, 1000)
        return
      }
      if (parseInt(pageNum) > this.size) {
        this.curPage = this.size
      } else if (parseInt(pageNum) <= 1) {
        this.curPage = 1
      } else {
        this.curPage = parseInt(pageNum)
      }
      this.moveList()
    }
  }
}
</script>
