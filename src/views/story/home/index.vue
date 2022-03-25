<template>
  <div class="bg-wrapper">
    <img class="bg" src="@/assets/images/story/testNotes.jpg" alt="">
    <div class="bottom">
      <div class="read">
        <div class="check" @click="changeCheckedState">
          <img class="check-empty" v-if="!checked"  src="@/assets/images/story/r_01@1x.svg" alt="">
          <img class="checked" v-else src="@/assets/images/story/t_01@1x.svg" alt="">
        </div>
        <div class="read-text">已完整阅读测试须知</div>
      </div>
      <div class="start-button" @click="startTest">
        <span>马上开始</span>
      </div>
    </div>
    <div class="mask" v-if="showMask">
      <div class="circle-bg">
        <div class="circle-number">
          <img class="circle-img" v-if="number == 3" src="@/assets/images/story/3@1x.svg" alt="">
          <img class="circle-img" v-else-if="number == 2" src="@/assets/images/story/2@1x.svg" alt="">
          <img class="circle-img" v-else-if="number == 1" src="@/assets/images/story/1@1x.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCookie } from '@/utils/story.js';
import { CookieKey } from '../common/index.js';
export default {
  data() {
    return {
      checked: false,
      showMask: false,
      number: 3,
      timer: null,
    }
  },
  methods: {
    startTest() {
      if (!this.checked) {
        return;
      }
      const value = getCookie(CookieKey);
      if (value) {
        this.$router.replace({ name: 'complete' });
      } else {
        this.showMask = true;
        document.documentElement.style.overflow = 'hidden';
        this.countDown();
      }
    },
    countDown() {
      this.timer = setTimeout(() => {
        if (this.number == 1) {
          clearTimeout(this.timer);
          this.timer = null;
          document.documentElement.style.overflow = 'auto';
          this.$router.replace({ name: 'question' })
          return;
        }
        this.countDown();
        this.number--;
      }, 1000)
    },
    changeCheckedState() {
      this.checked = !this.checked;
    }
  }
}
</script>
<style lang="less" scoped>
.bg-wrapper {
  position: relative;
  .bg {
    width: 750px;
  }
  .bottom {
    position: absolute;
    bottom: 67px;
    left: 50%;
    transform: translateX(-50%);
    .read {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 22px;
      .check {
        width: 31px;
        height: 31px;
        font-size: 0;
        margin-right: 9px;
        .check-empty {
          width: 100%;
          height: 100%;
        }
        .checked {
          .check-empty;
        }
      }
      .read-text {
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #929292;
        text-align: center;
        font-weight: 500;
      }
    }
    .start-button {
      width: 570px;
      height: 104px;
      background: linear-gradient(244deg, #FF8C4F 1%, #FFB57E 83%);
      border-radius: 52px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 40px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 500;
      &.noSelect {
        background: #848484;
      }
    }
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.80);
    display: flex;
    align-items: center;
    justify-content: center;
    .circle-bg {
      width: 308px;
      height: 328px;
      background: url('~@/assets/images/story/yuanxing@1x.svg');
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .circle-number {
        .circle-img {
          width: 123px;
          height: 177px;
        }
      }
    }
  }
}
</style>