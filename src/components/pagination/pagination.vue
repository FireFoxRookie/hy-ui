<template>
  <div class="fd-pagination-ele">
    <div class="fd-pagination-jump float-right" v-if="size > 5">
      <div class="fd-pagination-inputNum float-left relative">
        <label>跳转到:</label>
        <input type="text" v-model="inputPage"/>
        <div class="fd-pagination-errorTip absolute" :class="{'fd-pagination-showTip': ishowTip}" v-show="ishowTip">
          <div class="fd-pagination-arrow absolute"></div>
          <div class="fd-pagination-tipTxt relative">非数字</div>
        </div>
      </div>
      <div class="fd-pagination-jumpBtn float-left" @click="jump">GO</div>
    </div>
    <div class="fd-pagination-num float-right">
      <div class="fd-pagination-move pointer float-left fd-pagination-pre" :class="{'fd-pagination-notAllowed': curPage === 1}" @click="pre">上一页</div>
      <div class="fd-pagination-num-wrap float-left" id="fd-paginationNum">
        <div class="fd-pagination-num-list relative">
          <div class="float-left fd-pagination-num-item pointer" @click="numClick(index)" :class="{'fd-itemhover': curPage !== index, 'fd-itemActive': curPage === index}" v-for="index in size" v-text="index" :key="index"></div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="fd-pagination-move pointer float-left" :class="{'fd-pagination-notAllowed': curPage === size}" @click="next">下一页</div>
      <div class="fd-pagination-move pointer float-left" v-show="size > 5" :class="{'fd-pagination-notAllowed': curPage === size}" @click="toLast">末页</div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number
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
      var dom = document.getElementById("paginationNum")
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
<style lang="stylus">
@import '../../assets/css/common.styl';
.fd-pagination-ele {
  height: 30px;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-num-wrap .fd-pagination-num-list {
  width: 999999999999999px;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-num-wrap {
  max-width: 190px;
  overflow: hidden;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-num-wrap .fd-pagination-num-list .fd-pagination-num-item {
  width: 30px;
  height: 30px;
  border: 1px solid #e3ebee;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #333;
  border-radius: 3px;
  margin-left: 10px;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-num-wrap .fd-pagination-num-list .fd-itemhover:hover {
  color: #00b7f3;
  border-color: #00b7f3;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-num-wrap .fd-pagination-num-list .fd-itemActive {
  background-color: #00b7f3;
  color: #fff;
  border-color: #00b7f3;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-num-wrap .fd-pagination-num-list .fd-pagination-num-item:nth-child(1) {
  margin-left:0;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-move {
  border: 1px solid #e3ebee;
  border-radius: 3px;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  color: #333;
  font-size: 14px;
  margin-left: 10px; 
}
.fd-pagination-ele .fd-pagination-num .fd-pagination-notAllowed {
  cursor: not-allowed;
  background-color: #efefef;
  color: #666;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-move:hover {
  border-color: #ccc;
  color: #222;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-notAllowed:hover {
  background-color: #efefef;
  color: #666;
}

.fd-pagination-ele .fd-pagination-num .fd-pagination-pre {
  margin-right: 10px;
}

.fd-pagination-ele .fd-pagination-jump{
  height: 30px;
  margin-left: 50px;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-inputNum {
  height: 30px;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-inputNum>label{
  display: inline-block;
  height: 100%;
  line-height: 30px;
  color: #999999;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  vertical-align: text-top;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-inputNum>input {
  display: inline-block;
  height: 100%;
  line-height: 30px;
  text-indent: 5px;
  width: 40px;
  color: #333;
  fonr-size: 14px;
  border: 1px solid #e3ebee;
  border-radius: 3px;
  vertical-align: text-top;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-fdjumpBtn {
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  border: 1px solid #c8c8c8;
  border-radius: 3px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-fdjumpBtn:hover{
  border-color:#ccc;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-inputNum .fd-pagination-errorTip .fd-pagination-tipTxt {
  font-size: 14px;
  color: #333;
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  z-index: 10;
  white-space: nowrap;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-inputNum .fd-pagination-errorTip .fd-pagination-arrow {
  width: 10px;
  height: 10px;
  border: 1px solid #ccc;
  transform: rotate(-45deg);
  left: 24px;
  top: -4px;
  z-index: 20;
  border-left-color: transparent;
  border-bottom-color: transparent;
  background-color: #fff;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-inputNum .fd-pagination-errorTip {
  left: 46px;
  top: 40px;
}

.fd-pagination-ele .fd-pagination-jump .fd-pagination-inputNum .fd-pagination-showTip{
  animation: showtip 0.5s linear;
  -webkit-animation: showtip 0.5s linear;
  -ms-animation: showtip 0.5s linear;
  -moz-animation: showtip 0.5s linear;
}

@keyframes showtip {
  0% {
    opacity: 0;
    top: 50px;
  }
  50% {
    opacity: 0.5;
    top: 45px;
  }
  100% {
    opacity: 1;
    top: 40px;
  }
}

@-webkit-keyframes showtip {
  0% {
    opacity: 0;
    top: 50px;
  }
  50% {
    opacity: 0.5;
    top: 45px;
  }
  100% {
    opacity: 1;
    top: 40px;
  }
}

@-ms-keyframes showtip {
  0% {
    opacity: 0;
    top: 50px;
  }
  50% {
    opacity: 0.5;
    top: 45px;
  }
  100% {
    opacity: 1;
    top: 40px;
  }
}

@-moz-keyframes showtip {
  0% {
    opacity: 0;
    top: 50px;
  }
  50% {
    opacity: 0.5;
    top: 45px;
  }
  100% {
    opacity: 1;
    top: 40px;
  }
}
</style>
