<template>
  <div class="mail-address">
    <div class="banner">
      <Spacer :height="78"/>
      <div class="banner-main">
        <img class="main-logo" src="@/assets/images/H5_right02@3x.png" alt="">
        <p class="main-text">报名成功！</p>
      </div>
      <Spacer :height="24"/>
      <div class="banner-bottom">
        <p>请完善收货地址（用于邮寄课程礼盒）</p>
      </div>
    </div>
    <div class="main">
      <Spacer :height="50"/>
      <div class="main-title">
        <p class="title">邮寄地址</p>
      </div>
      <Spacer :height="30"/>
      <div class="card main-content">
        <Spacer :height="40"/>
        <div class="form">
          <van-field
            label="收货人"
            v-model="form.name"
            placeholder="请输入"
            label-align="right"
            maxlength="20"
            @input="(val)=>{return personChange(val)}"
          />
          <Spacer :height="9"/>
          <van-field
            label="联系电话"
            v-model="form.phone"
            placeholder="请输入手机号"
            type='tel'
            maxlength="11"
            @input="(val)=>{return phoneChange(val)}"
          />
          <Spacer :height="9"/>
          <van-field
            readonly
            clickable
            name="area"
            :value="form.area"
            label="选择地区"
            placeholder="点击选择省市区"
            @click="showArea = true"
          />
          <van-popup v-model="showArea" position="bottom">
            <van-area
              :area-list="areaList"
              @confirm="onConfirm"
              @cancel="showArea = false"
            />
          </van-popup>
          <Spacer :height="9"/>
          <van-field
            class="address"
            type="textarea"
            label="详细地址"
            v-model="form.address"
            placeholder="如街道、门牌号、小区等"
            maxlength="50"
            @input="(val)=>{return addressChange(val)}"
          />
        </div>
      </div>
      <Spacer :height="32"/>
      <van-divider />
      <Spacer :height="32"/>
      <Button @confirm="confirm" :loading="btnLoading" content="提交"></Button>
      <Spacer :height="32"/>
    </div>
  </div>
</template>
<script>
import Spacer from '_c/spacer/index.vue';
import Button from '_c/button/index.vue';
import { areaList } from '@vant/area-data';
import { addAddress, getPhoneNumber } from '@/api/user.js';
export default {
  mounted() {
    this.getPhone();
  },
  components: {
    Spacer,
    Button,
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        area: '',
        address: '',
      },
      areaList: areaList,
      showArea: false,
      btnLoading: false,
    }
  },
  methods: {
    personChange(){},
    phoneChange(value) {
      this.form.phone = value.replace(/\D/g,'');
    },
    addressChange() {},
    async getPhone() {
      const openId = localStorage.getItem('openId');
      const res = await getPhoneNumber(openId);
      this.form.phone = res.data || '';
    },
    onConfirm(values) {
      console.log(values);
      this.form.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.showArea = false;
    },
    validateIsPhone(phone) {
      return /^1[3-9]\d{9}$/.test(phone);
    },
    validate() {
      const { name = '', phone = '', area = '', address = '' } = this.form;
      if (name.trim() == '') {
        this.$toast({
          message: '请输入收货人',
          position: 'top',
        });
        return;
      } else if (phone.trim() == '') {
        this.$toast({
          message: '请输入11位手机号',
          position: 'top',
        });
        return;
      } else if (!this.validateIsPhone(phone)) {
        this.$toast({
          message: '请输入正确的手机号',
          position: 'top',
        });
        return;
      } else if (area.trim() == '') {
        this.$toast({
          message: '请选择地区',
          position: 'top',
        });
        return;
      } else if (address.trim() == '') {
        this.$toast({
          message: '请输入详细地址',
          position: 'top',
        });
        return;
      }
      console.log(this.form, '==== submit');
      return true;
    },
    async confirm() {
      if (this.validate()) {
        try {
          const { name, phone, area, address } = this.form;
          const openId = localStorage.getItem('openId');
          this.btnLoading = true;
          await addAddress({
            contactAddr: address,
            contactName: name,
            contactRegion: area,
            contactTel: phone,
            openId,
            packageId: 1,
          });
          this.btnLoading = false;
          this.$router.replace({ name: 'addTeacher' });
        } catch (error) {
          this.btnLoading = false;
          this.$toast({
            message: error.msg || '提交失败',
            position: 'top',
          });
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mail-address {
  height: 100vh;
  background-color: #f1f5f7;
  .van-divider {
    margin: 0;
  }
  .van-popup {
    // 有时候计算不准，直接给宽度避免问题
    // width: 750px;
    width: calc(100vw - 60px);
  }
  .banner {
    width: 100%;
    height: 288px;
    background-image: url('~@/assets/images/H5_bg02@3x.png');
    background-size: cover;
    .banner-main {
      display: flex;
      align-items: center;
      .main-logo {
        width: 75px;
        height: 75px;
        margin-right: 20px;
        margin-left: 214px;
      }
      .main-text {
        font-family: PingFangSC-Regular;
        font-size: 46px;
        color: #FFFFFF;
      }
    }
    .banner-bottom {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .main {
    padding: 0 30px;
    .main-title {
      padding-left: 10px;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 38px;
        color: #333333;
        line-height: 1;
      }
    }
    .main-content {
      height: 599px;
    }
    .card {
      background: #FFFFFF;
      box-shadow: 0 0 4px 0 rgba(7, 6, 6, 0.05);
      border-radius: 30px;
      .form {
        padding: 0 39px;
        /deep/.van-cell {
          align-items: center;
          &::after {
            width: 100%;
            left: 0;
          }
          padding: 23px 9px;
          line-height: 45px;
          border-top: 1px solid transparent;
          border-bottom: 1px solid transparent;
          &:last-child {
            align-items: initial;
            border-bottom: 1px solid transparent;
          }
          font-family: PingFangSC-Regular;
          .van-cell__title {
            width: 132px;
            font-size: 32px;
            span {
              display: inline-block;
            }
          }
          .van-field__label {
            margin-right: 0;
            color: #333333;
          }
          .van-cell__value {
            margin-left: 40px;
          }
          .van-cell__value .van-field__body {
            font-size: 32px;
            .van-field__control {
              font-family: PingFangSC-Regular;
              font-size: 32px;
              color: #333333;
            }
          }
        }
        /deep/.address {
          .van-field__control {
            height: 180px;
          }
        }
      }
    }
  }
}
</style>