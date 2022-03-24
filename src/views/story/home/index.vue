<template>
  <div class="bg-wrapper">
    <img class="bg" src="@/assets/images/story/testNotes.jpg" alt="">
    <div class="bottom">
      <div class="read">
        <van-checkbox v-model="checked" shape="square">已完整阅读测试须知</van-checkbox>
      </div>
      <div class="start-button" @click="startTest">
        <span>马上开始</span>
      </div>
    </div>
    <div class="mask" v-if="showMask">
      <div class="circle-bg">
        <div>{{number}}</div>
      </div>
      <!-- <img  src="@/assets/images/story/yuanxing@1x.svg" alt=""> -->
    </div>
  </div>
</template>
<script>
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
      this.showMask = true;
      document.documentElement.style.overflow = 'hidden';
      this.countDown();
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
    }
  }
}
</style>