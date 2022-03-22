<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <!-- <van-nav-bar title="填写收货地址" /> -->

      <van-cell-group>
        <van-cell title="完善收货人地址" icon="location" label="方便及时为您寄送课程相关礼品" />
        <van-field clearable label="联系人" icon="question-o" placeholder="请输入姓名" />
        <van-field label="联系电话" v-model="form.phone" type='tel' placeholder="请输入手机号码" maxlength="11" @input="(val)=>{return phoneChange(val)}"/>
        <van-field
          center
          clearable
          v-show="showSendCode"
          label="短信验证码"
          placeholder="请输入短信验证码"
          border="false"
          use-button-slot
        >
          <van-button slot="button"   size="small" type="primary"> 发送验证码 </van-button>
        </van-field>
        <van-cell title="选择地区" is-link @click="changeDialog" />
        <van-field
          v-model="message"
          label="详细地址"
          type="textarea"
          placeholder="请输入详细地址"
          autosize
          border="false"
        />
        <!--   <van-field clearable label="孩子姓名" placeholder="请输入孩子姓名" />
        <van-cell title="孩子年龄" is-link placeholder="请选择孩子年龄" @click="changeDialog" /> -->
      </van-cell-group>
      <div class="submit">
        <van-button
color="linear-gradient(to right, #4bb0ff, #6149f6)"
disabled
size="large"
round
type="info"
          >保存并使用</van-button
        >
      </div>
    </div>
    <van-popup v-model="show" round position="bottom" custom-style="height: 20%">
      <van-area :area-list="areaList" />
    </van-popup>
  </div>
</template>

<script>
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州']
}
export default {
  data() {
    return {
      active: 1,
      form: {
        name: '',
        phone: '',
        code: '',
        addr: '',
        addrDetail: ''
      },
      showSendCode: false,
      columns: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ],
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
          // ....
        }
      },
      show: false,
      message: ''
    }
  },

  computed: {},

  mounted() {
    // const url = 'http://10.10.31.54:9020/about'
    // const redirecurl = 'http://10.10.31.54:9020/#/about'
    // const encodeUrl = encodeURIComponent(url)
    // const encoderedirecurl = encodeURIComponent(redirecurl)
    // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa54798e303fc6c14&redirect_uri=${encoderedirecurl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa54798e303fc6c14&redirect_uri=${encodeUrl}/ydx-business/payWeiXin/getOpenId&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`
  },

  methods: {
    changeDialog() {
      this.show = !this.show
    },
    phoneChange(val) {
      this.form.phone = val.replace(/[^\d]/g, '')
      if (this.form.phone.length > 0) {
        this.showSendCode = true
      } else {
        this.showSendCode = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  height: 100vh;
  .img {
    height: 90px;
    width: 90px;
    border-radius: 45px;
  }
  .warpper {
    // padding: 12px;
    background: #fff;
    height: 100%;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 22px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }

    .submit {
      margin-top: 60px;
      // width: 100vw;
      text-align: center;
      padding: 0 50px;
    }
  }

  .desc {
    height: 65px;
    width: 750px;
    font-size: 32px;
    background: blueviolet;
  }
}
</style>
