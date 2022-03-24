<template>
  <div id="app">
    <transition name="slide-fade"  class="layout-content">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getWinxinConfig } from '@/api/user.js'
export default {
  name: 'App',
  created() {
    this.initWinxin();
  },
  methods: {
    async initWinxin() {
      const res = await getWinxinConfig();
      const { result } = res || {};
      // console.log(result);
      const { appId, nonceStr, signature, timestamp } = result || {};
      window.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature,// 必填，签名
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
        ] // 必填，需要使用的JS接口列表
      });
      // console.log('222222');
      window.wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        console.log('111111');
        // window.wx.updateAppMessageShareData({
        //   title: '测试村长', // 分享标题
        //   desc: 'had黄金卡恢复金阿奎', // 分享描述
        //   link: 'http://10.10.18.175:1024', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: '', // 分享图标
        //   success: function () {
        //     // 设置成功
        //   }
        // })
      }); 


    }
  }
}
</script>
<style lang="scss">

</style>
