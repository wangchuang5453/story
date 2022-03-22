<template>
  <div class="page-wrapper">
    <Spacer :height="52"/>
    <div class="order-form">
      <div class="order-form__title">
        <p class="title">订单确认</p>
      </div>
      <Spacer :height="30"/>
      <div class="order-form__content card">
        <Spacer :height="40"/>
        <div class="form">
          <van-field
            label="手机号"
            v-model="form.phone"
            type='tel'
            placeholder="请输入手机号"
            maxlength="11"
            @input="(val)=>{return phoneChange(val)}"
          />
          <Spacer :height="10"/>
          <van-field
            v-model="form.code"
            label="验证码"
            type="digit"
            placeholder="请输入验证码"
            maxlength="6"
            use-button-slot
            @input="(val)=>{return codeChange(val)}"
          >
            <div slot="button" class="code">
              <p v-if="codeHighlight" class="highlight" @click="getCode">获取验证码</p>
              <p v-else-if="sendCodeSuccess">获取验证码(<span class="codeTimer">{{codeTime}}</span>)</p>
              <p v-else>获取验证码</p>
            </div>
          </van-field>
        </div>
        <div class="prompt">
          <p class="prompt-text">手机号是您的上课凭证，请输入11位手机号</p>
        </div>
      </div>
    </div>
    <Spacer :height="50"/>
    <div class="order-info">
      <div class="order-info__title">
        <p class="title">订单信息</p>
      </div>
      <Spacer :height="30"/>
      <div class="order-info__content card">
        <Spacer :height="73"/>
        <p class="row">
          <span class="row-title">课程名称：</span>
          <span class="row-content color-class">优优狗编程体验课</span>
        </p>
        <Spacer :height="30"/>
        <p class="row">
          <span class="row-title">上课时间：</span>
          <span class="row-content color-time">{{courseOpenDate}}</span>
        </p>
        <Spacer :height="30"/>
        <p class="row">
          <span class="row-title">订单金额：</span>
          <span class="row-content color-amount">¥ 0</span>
        </p>
        <Spacer :height="70"/>
      </div>
    </div>
    <Spacer :height="161"/>
    <van-divider />
    <Spacer :height="32"/>
    <Button @confirm="confirmPay" :loading="btnLoading" content="确认支付"></Button>
    <Spacer :height="32"/>
  </div>
</template>
<script>
import Spacer from '_c/spacer/index.vue';
import Button from '_c/button/index.vue';
import { getPhoneCode, confirmPay, getTeacherInfo } from '@/api/user.js';
export default {
  mounted() {
    this.getCourseInfo();
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  components: {
    Spacer,
    Button,
  },
  data() {
    return {
      form: {
        phone: '',
        code: '',
      },
      codeHighlight: false,
      sendCodeSuccess: false,
      codeTime: '',
      timer: null,
      courseOpenDate: '',
      btnLoading: false,
    }
  },
  methods: {
    phoneChange(value) {
      this.form.phone = value.replace(/\D/g,'');
      if (this.validateLength(this.form.phone.length) && this.timer == null) {
        this.codeHighlight = true;
      } else if (this.timer == null) {
        this.codeHighlight = false;
      }
    },
    codeChange(value) {
      this.form.code = value.replace(/\D/g,'');
    },
    async getCourseInfo() {
      try {
        const openId = localStorage.getItem('openId');
        const res = await getTeacherInfo({ teamId: 1, openId });
        const { openDate = '' } = res.data || {};
        if (openDate == 'null' || !openDate) {
          this.courseOpenDate = '暂无';
        } else {
          const date = new Date(openDate);
          this.courseOpenDate = (date.getMonth() + 1) + '月' + date.getDay() + '日';
        }
      } catch (error) {
        console.log(error, 'order confirm 教师信息获取失败');
      }
    },
    async getCode() {
      if (!this.validateIsPhone(this.form.phone)) {
        this.$toast({
          message: '请输入正确的手机号',
          position: 'top',
        });
      } else {
        this.codeHighlight = false;
        try {
          await getPhoneCode(this.form.phone);
          this.showCodeTimer();
        } catch (error) {
          this.codeHighlight = true;
          // 1、操作频繁 2、失败
          const { code } = error || {};
          if (code == '2021' || code == '2024' || code == '2025') {
            this.$toast({
              message: '验证码发送频繁',
              position: 'top',
            });
          } else {
            this.$toast({
              message: error.msg || '获取验证码失败',
              position: 'top',
            });
          }
        }
      }
    },
    validateLength(length) {
      return length == 11;
    },
    validateIsPhone(phone) {
      return /^1[3-9]\d{9}$/.test(phone);
    },
    showCodeTimer() {
      let timeLength = 60;
      this.codeTime = `${timeLength--}`;
      // 获取点击时间
      const second = Math.floor(new Date().getTime() / 1000);
      // end

      this.timer = setInterval(() => {
        // 获取当前时间
        const newSecond = Math.floor(new Date().getTime()/1000);
        const time = 60 - Math.round(newSecond - second);
        // end

        if (time < 1) {
          clearInterval(this.timer);
          this.timer = null;
          this.sendCodeSuccess = false;
          if (this.validateLength(this.form.phone.length)) {
            this.codeHighlight = true;
          } else {
            this.codeHighlight = false;
          }
        } else {
          this.codeTime = time;
        }
      }, 1000);
      this.sendCodeSuccess = true;
    },
    async confirmPay() {
      const phone = this.form.phone;
      const code = this.form.code;
      if (phone == '') {
        // this.$toast('请输入11位手机号');
        this.$toast({
          message: '请输入11位手机号',
          position: 'top',
        });
        return;
      } else if (!this.validateIsPhone(phone)) {
        // this.$toast('请输入正确的手机号');
        this.$toast({
          message: '请输入正确的手机号',
          position: 'top',
        });
        return;
      } else if (code == '') {
        // this.$toast('请输入验证码');
        this.$toast({
          message: '请输入验证码',
          position: 'top',
        });
        return;
      } else {
        try {
          const courseId = localStorage.getItem('courseId');
          const openId = localStorage.getItem('openId');
          const mobile = this.form.phone;
          const smsCode = this.form.code;
          this.btnLoading = true;
          await confirmPay({ courseId, mobile, openId, smsCode });
          this.btnLoading = false;
          this.$router.replace({ name: 'mailAddress' });
        } catch (error) {
          this.btnLoading = false;
          const { code } = error || {};
          if (code == '2001') {
            this.$toast({
              message: '该手机号已报名',
              position: 'top',
            });
          } else {
            this.$toast({
              message: error.msg || '支付失败',
              position: 'top',
            });
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.page-wrapper {
  height: 100vh;
  padding: 0 30px;
  background-color: #f1f5f7;
  .card {
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(7, 6, 6, 0.05);
    border-radius: 30px;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 38px;
    color: #333333;
    line-height: 1;
  }
  .order-form {
    .code {
      height: 32px;
      line-height: 32px;
      display: flex;
      align-items: center;
      p {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #A3B6BF;
        line-height: 1;
        &.highlight {
          color: #FEAE3A;
        }
      }
      .codeTimer {
        display: inline-block;
        width: 35px;
        text-align: center;
      }
    }
    .form {
      padding: 0 39px;
      /deep/.van-cell {
        align-items: center;
        &::after {
          width: 100%;
          left: 0;
        }
        padding: 21px 9px;
        line-height: 48px;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        font-family: PingFangSC-Regular;
        .van-cell__title {
          width: 136px;
          font-size: 32px;
          span {
            display: inline-block;
          }
        }
        .van-field__label {
          margin-right: 0;
          color: #333333;
        }
        .van-cell__value .van-field__body {
          font-size: 32px;
          .van-field__control {
            width: calc(100% - 186px);
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #333333;
          }
        }
      }
    }
    .prompt {
      padding: 40px 48px;
      .prompt-text {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #8FAEBE;
        line-height: 32px;
      }
    }
    .order-form__title {
      padding-left: 10px;
    }
    .order-form__content {
      width: 690px;
    }
  }
  .order-info {
    .order-info__title {
      padding-left: 10px;
    }
    .order-info__content {
      padding: 0 48px;
      .row {
        line-height: 1;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        .row-title {
          color: #9DA0A3;
        }
        .color-class {
          color: #333333;
        }
        .color-time {
          color: #9DA0A3;
        }
        .color-amount {
          color: #F96024;
        }
      }
    }
  }
  .van-divider {
    border-color: #E2E2E2;
  }
  .confirm {
    .btn {
      width: 670px;
      height: 110px;
      background: #F96024;
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-family: PingFangSC-Regular;
        font-size: 40px;
        color: #FFFFFF;
        text-align: center;
      }
    }
  }
}
</style>