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
      const url = encodeURIComponent(window.location.href.split('#')[0]);
      console.log(url, '======url');
      const res = await getWinxinConfig(url);
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
          'checkJsApi',
          'updateAppMessageShareData',
          'updateTimelineShareData',
        ] // 必填，需要使用的JS接口列表
      });
      
      window.wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.checkJsApi({
          jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            window.wx.updateAppMessageShareData({
              title: '测试村长', // 分享标题
              desc: 'had黄金卡恢复金阿奎', // 分享描述
              link: 'http://192.168.3.10:1024', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function () {
                console.log("11");
              }
            })
          }
        });
        
      }); 


    }
  }
}
</script>
<style lang="scss">

</style>
