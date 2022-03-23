<template>
  <div class="progress">
    <div class="progress-bar">
      <div class="el-progress-bar__outer">
        <div class="el-progress-bar__inner" :style="barStyle">
          <div class="dun" >
            <img class="dun-img" src="@/assets/images/story/dun@1x.svg" alt="">
            <div class="tooltip">
              <img src="@/assets/images/story/jindu@1x.svg" alt="">
              <div class="tooltip-text"><span>完成{{ceilPercentage}}%</span></div>
            </div>
          </div>
        </div>
        <img class="huo" :class="{fade: disappearFire}" src="@/assets/images/story/huo@1x.svg" alt="">
        <img class="shui" :class="{fade: disappearWater}" src="@/assets/images/story/shui@1x.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    }
  },
  computed: {
    barStyle() {
      const style = {};
      style.width = Math.ceil(this.percentage) + '%';
      if (this.percentage >= 100) {
        style.width = 100 + '%';
      }
      return style;
    },
    disappearFire() {
      if (Math.ceil(this.percentage) >= 70) {
        return true
      }
      return false;
    },
    disappearWater() {
      if (Math.ceil(this.percentage) >= 90) {
        return true
      }
      return false;
    },
    ceilPercentage() {
      if (this.percentage >= 100) {
        return 100;
      }
      return Math.ceil(this.percentage);
    }
  }
}
</script>

<style lang="less" scoped>
.progress {
  width: 560px;
  position: relative;
  .progress-bar {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    .el-progress-bar__outer {
      height: 30px;
      border-radius: 23px;
      background-image: url('~@/assets/images/story/malu@1x.svg');
      background-size: 100% 100%;
      position: relative;
      vertical-align: middle;
      .el-progress-bar__inner {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 18px;
        border: 4px solid #fff;
        background-color: #FF8839;
        border-radius: 23px;
        line-height: 1;
        white-space: nowrap;
        transition: width .6s ease;
      }
    }
  }
}
.dun {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%);
  width: 144px;
  height: 144px;
  .dun-img {
    width: 100%;
    height: 100%;
  }
  .tooltip {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 171px;
    height: 65px;
    img {
      width: 100%;
      height: 100%;
    }
    .tooltip-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 46px;
      font-family: PingFangSC-Medium;
      font-size: 33px;
      color: #FFFFFF;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.base {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 112px;
  height: 112px;
  opacity: 1;
  transition: opacity .6s ease;
  &.fade {
    opacity: 0;
  }
}
.huo {
  .base;
  left: 70%;
}
.shui {
  .base;
  left: 90%;
}
</style>