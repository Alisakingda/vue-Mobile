<template>
  <!-- 下拉刷新 上拉加载更多-->
  <div class="container-wrapper" @touchstart="startTouch" @touchmove="move" @touchend="endTouch" ref="container">
    <div class="content" ref="content">
      <!-- 下拉显示 -->
      <div class="status" :style="{'height': marginTop/50 + 'rem'}">
        <div class="msg" :style="{'line-height': height/50  + 'rem'}">
          <img src="@/assets/img/loading.png" class="icon" :class="loading !== 2 ? 'stop' : ''">
          {{msg}}
        </div>
      </div>
      <!-- 显示的数据 -->
      <slot name="main" />
      <!-- 上拉显示 -->
      <div class="status" v-show="gesture === 2" :style="{'height': height / 50 + 'rem'}">
        <div class="msg" :style="{'line-height': height / 50 + 'rem'}">
          <img src="@/assets/img/loading.png" class="icon">
          {{msg}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pull-refresh',
  data () {
    return {
      loading: 0, // 是否正在加载 0-提示下拉更新，1-提示松开更新，2-加载中，（3- 暂无更新内容 4 - 更新结束）
      touchStart: 0, // 触摸起始点
      distance: 0, // 手指滑动距离
      timer: 0,
      gesture: 0,
      marginTop: 104, // 下拉的最大长度
      height: 44, // 最小长度
      toRem: 50 // 转为rem
    }
  },
  props: {
    refreshNext: {
      type: Function
    },
    loadMoreNext: {
      type: Function
    }

  },
  computed: {
    msg () {
      if (this.loading === 0) {
        return '拉动更新'
      } else if (this.loading === 1) {
        return '松开更新'
      } else if (this.loading === 2) {
        return '加载中...'
      } else if (this.loading === 3) {
        return '暂无更新内容'
      } else if (this.loading === 4) {
        return '刷新成功'
      } else {
        return '更新失败'
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      const $content = this.$refs.content
      $content.style.marginTop = -1 * this.marginTop / 50 + 'rem'
      $content.style.transition = 'none'
      this.loading = 0
      this.touchStart = 0
      this.distance = 0
      this.gesture = 0
    },
    startTouch (e) {
      const clientY = e.targetTouches[0].clientY
      if (this.loading === 0) {
        this.touchStart = clientY
      }
    },
    move (e) {
      const $container = this.$refs.container
      const $content = this.$refs.content
      const distance = e.targetTouches[0].clientY - this.touchStart // 滑动距离
      const scrollTop = $container.scrollTop
      const clientHeight = $container.clientHeight
      const scrollHeight = $container.scrollHeight
      console.log()
      if (scrollTop === 0 && this.loading !== 2 && distance > 0) { // 页面没有下滑 并且数据没有更新 并且是下拉
        this.distance = distance
        this.gesture = 1
        if (this.distance < this.marginTop) {
          $content.style.marginTop = (this.distance - this.marginTop) / 50 + 'rem'
          if (this.distance >= this.height) {
            this.loading = 1
          }
        }
      } else if (scrollTop + clientHeight === scrollHeight && this.loading !== 2 && distance < 0) { // 上拉 // 除法有误差，设置误差范围0.4rem
        // 上拉加载
        this.gesture = 2
        this.loading = 1
      }
    },
    endTouch (e) {
      // 松开判断loading
      if (this.loading === 1) {
        this.loading = 2 // 加载中
        // 根据手势判断上拉还是下拉
        if (this.gesture === 1) {
          const $content = this.$refs.content
          $content.style.marginTop = (-1 * this.marginTop + this.height) / 50 + 'rem'
          this.refreshNext().then(res => {
            // 加载成功，判断是否有更新内容 to3 or 4
            const random = ~~(Math.random() * 100) % 2
            if (random) {
              this.loading = 3
            } else {
              this.loading = 4
            }
            this.backToTop(500)
          }).catch(_ => {
            this.loading = 5
            this.backToTop(500)
          })
        } else if (this.gesture === 2) {
          this.loadMoreNext().then(res => {
            // 加载成功，判断是否有更新内容 to3 or 4
            const random = ~~(Math.random() * 100) % 2
            if (random) {
              this.loading = 3
            } else {
              this.loading = 4
            }
            this.initData()
          }).catch(_ => {
            this.loading = 5
            this.initData()
          })
        }
      } else {
        if (this.gesture === 1) {
          this.backToTop(0)
        }
      }
    },
    backToTop (duration) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      const _this = this
      const $content = _this.$refs.content
      $content.style.marginTop = -1 * this.marginTop / 50 + 'rem'
      $content.style.transition = 'margin-top .2s .8s ease-in'
      this.timer = setTimeout(function () {
        _this.initData()
      }, 1000)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/less/func";
.container-wrapper {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // 解决h5苹果ios系统中overflow: auto滑动不流畅
  .content {
    .status {
      position: relative;
      background-color: #fff;
      .msg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        color: rgb(99, 99, 99);
        .icon {
          display: inline-block;
          vertical-align: text-bottom;
          margin-right: 5 * @unit;
          height: 20 * @unit;
          width: 20 * @unit;
          animation: rotate 0.75s linear infinite;
          &.stop {
            animation: none;
          }
        }
      }
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>