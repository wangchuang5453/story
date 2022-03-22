<template>
  <van-popup v-model="show" :round="true" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="content-wrapper">
        <p class="content"><span class="text">{{dialogOptions.content}}</span></p>
        <div class="close" @click="closeDialog"><img class="close-img" src="@/assets/images/H5_guanbi@3x.png" alt=""></div>
      </div>
      <div class="line"></div>
      <!-- <Spacer :height="28"/> -->
      <div class="btn-wrapper">
        <div class="btn" @click="confirm">
          <span>{{dialogOptions.btnText}}</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import Spacer from '_c/spacer/index.vue';
export default {
  mounted() {
    this.dialogOptions = this.options;
  },
  components: {
    Spacer,
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      show: false,
      dialogOptions: {
        content: '',
        btnText: '',
      }
    }
  },
  watch: {
    options(newv) {
      this.dialogOptions = newv;
    }
  },
  methods: {
    confirm() {
      this.closeDialog();
      if (this.options.ok) {
        this.options.ok();
      }
    },
    openDialog() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    },
  }
}
</script>
<style lang="less" scoped>
.van-dialog {
  width: 612px;
  padding: 0 39px;
  background: #FFFFFF;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.05);
  border-radius: 30px;
  /deep/.van-dialog__header {
    display: none;
  }
}
.wrapper {
  .content-wrapper {
    padding: 102px 45px 62px 45px;
    .close {
      position: absolute;
      right: 25px;
      top: 25px;
      width: 39px;
      height: 39px;
      .close-img {
        width: 39px;
        height: 39px;
      }
    }
    .content {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #333333;
      min-height: 106px;
      line-height: 53px;
    }
  }
  .line {
    border-top: 1px solid #EBEBEB;
  }
  .btn-wrapper {
    padding: 28px 0;
    margin: 0 32px;
    .btn {
      width: 100%;
      height: 56px;
      background: #F96024;
      border-radius: 100px;
      padding: 27px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #FFFFFF;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="less">
.van-popup {
  width: 590px;
  padding: 0 30px;
}
</style>