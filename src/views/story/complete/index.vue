<template>
  <div class="bg-wrapper">
    <img class="bg" src="@/assets/images/story/result@1x.jpg" alt="">
    <div class="code-wrapper">
      <div class="code-item" v-for="(item, index) in codeArray" :key="index">
        <span class="code-item__text">{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { CookieKey } from '../common/index.js';
import { getCookie } from '@/utils/story.js';
import mixin from '../common/mixin.js';
export default {
  mixins: [mixin],
  created() {
    this.code = this.getCode();
    this.codeArray = this.code.split('');
  },
  data() {
    return {
      code: '',
      codeArray: [],
    }
  },
  methods: {
    getCode() {
      let value = getCookie(CookieKey);
      if (value) {
        return value;
      } else {
        this.$router.replace({ name: 'home' });
      }
    },
  }
}
</script>
<style lang="less" scoped>
.bg-wrapper {
  position: relative;
  .bg {
    width: 750px;
  }
  .code-wrapper {
    height: 103px;
    position: absolute;
    top: 870px;
    left: 50%;
    transform: translateX(-50%);
    margin-right: -21px;
    display: flex;
    .code-item {
      width: 95px;
      height: 103px;
      background: #FFDEC5;
      border-radius: 17px;
      margin-right: 21px;
      display: flex;
      justify-content: center;
      align-items: center;
      .code-item__text {
        font-family: PingFangSC-Medium;
        font-size: 80px;
        color: #363636;
        font-weight: 500;
      }
    }
  }
}
</style>