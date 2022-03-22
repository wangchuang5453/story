<template>
  <div class="introduction-page">
    <img class="img-1" src="@/assets/images/H5_A@3x.png" alt="">
    <img class="img-style" src="@/assets/images/H5_B@3x.png" alt="">
    <Spacer :height="32"/>
    <img class="img-style" src="@/assets/images/H5_C@3x.png" alt="">
    <Spacer :height="32"/>
    <img class="img-style" src="@/assets/images/H5_D@3x.png" alt="">
    <Spacer :height="32"/>
    <img class="img-style" src="@/assets/images/H5_E@3x.png" alt="">
    <Spacer :height="32"/>
    <img class="img-style" src="@/assets/images/H5_F@3x.png" alt="">
    <Spacer :height="32"/>
    <img class="img-style" src="@/assets/images/H5_G@3x.png" alt="">
    <div class="btn-wrapper">
      <div class="btn" @click="submit">
        <span>立即报名</span>
      </div>
    </div>
    <Dialog :options="dialogOptions" ref="dialog"></Dialog>
  </div>
</template>
<script>
import Dialog from '_c/dialog/index.vue'
import Spacer from '_c/spacer/index.vue'
import { getJSON, getAccessToken } from '@/api/user.js'
import eventMixin from '@/mixin/eventMixin.js'
export default {
  mixins: [eventMixin],
  created() {
    // const code = this.getQueryVariable('code')
    // console.log(code, '===code')
    // this.init(code)
    let value = this.getCookie('safetyday__key');
    if (value) {
      // alert(value);
    } else {
      this.setCookie('safetyday__key', 'done');
    }
    this.init();
  },
  components: {
    Dialog,
    Spacer
  },
  data() {
    return {
      dialogOptions: {
        content: '',
        btnText: ''
      }
    }
  },
  mounted() {
    const { from = 'wechat' } = this.$route.query// 用于埋点 记录访问来源 from:poster 海报 wechat 微信公众号
    this.reportsEvent('promotionPage_view', {
      origin: from
    })
  },
  methods: {
    setCookie(name,value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days*24*60*60*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    },
    async init() {
      try {
        // const res = await getJSON()
        // console.log(res, '===== init')
       const token = await getAccessToken();
       console.log(token);
        this.toPage(currenStep)
      } catch (error) {
        const step = localStorage.getItem('step')
        console.log(step, '==== step')
        if (step != null && step != '') {
          this.step = step
          this.toPage(step)
        }
      }
    },
    toPage(num) {
      //  0：未报名 1：已报名，待支付 2：已支付，待完善信息 3：已经领取且已完善信息 4: 运营人员已经审核确认通过
      if (num != 0) {
        this.submit()
      }
    },
    getQueryVariable(variable) {
      const query = window.location.search.substring(1)
      const vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        if (pair[0] === variable) return pair[1]
      }
      return undefined
    },
    submit() {
      //  0：未报名 1：已报名，待支付 2：已支付，待完善信息 3：已经领取且已完善信息 4: 运营人员已经审核确认通过
      if (this.step == 0) {
        this.$router.replace({ name: 'orderConfirm' })
      }
      if (this.step == 2) {
        this.dialogOptions = {
          content: '亲爱的用户，您已经领取了0元体验课，快去完善信息吧。',
          btnText: '完善邮寄地址',
          ok: () => {
            this.$router.replace({ name: 'mailAddress' })
          }
        }
        this.$refs.dialog.openDialog()
      }
      if (this.step == 3) {
        this.dialogOptions = {
          content: '亲爱的用户，您已经领取了0元体验课，请点击查看您的专属老师吧。',
          btnText: '查看我的专属老师',
          ok: () => {
            this.$router.replace({ name: 'addTeacher' })
          }
        }
        this.$refs.dialog.openDialog()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.introduction-page {
  position: relative;
  // background-color: #FFE6DE;
  background-image: linear-gradient(180deg, #FF680A 0%, #FFB65E 9%);
  font-size: 0;
  text-align: center;
  .img-1 {
    width: 750px;
  }
  .img-style {
    width: 699px;
  }
  .btn-wrapper {
    width: 100%;
    height: 174px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    position: fixed;
    bottom: 0;
  }
  .btn {
    width: 670px;
    height: 110px;
    // background: #F96024;
    background-image: url('~@/assets/images/H5_buttn@3x.png');
    background-size: cover;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFangSC-Regular;
    font-size: 40px;
    color: #FFFFFF;
    text-align: center;
  }
}
</style>
