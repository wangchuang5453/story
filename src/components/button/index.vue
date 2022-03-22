<template>
  <div class="confirm">
    <div class="btn" :class="{ 'loading': loading }" @click="confirm"><span class="text">{{content}}</span></div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: 'confirm'
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    }
  }
}
</script>
<style lang="less" scoped>
.confirm {
  .btn {
    width: 670px;
    height: 110px;
    background: #F96024;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.loading {
      background: #FDAD83;
    }
    .text {
      font-family: PingFangSC-Regular;
      font-size: 40px;
      color: #FFFFFF;
      text-align: center;
    }
  }
}
</style>