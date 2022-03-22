<template>
  <div></div>
</template>
<script>
export default {
  created() {
    // 兼容ios微信页面被缓存不执行代码问题
    window.addEventListener('pageshow', function(e) {
      // 通过persisted属性判断是否存在 BF Cache
      if (e.persisted) {
        location.reload()
      }
    })
    const { from = 'wechat' } = this.$route.query// 用于埋点 记录访问来源 from:poster 海报 wechat 微信公众号
    let redirecurl = `${process.env.VUE_APP_DOMAIN_NAME}/#/introduction?from=${from}`
    const appId = process.env.VUE_APP_WEIXIN_APPID
    if (process.env.VUE_APP_ENV == 'production') {
      redirecurl = `${process.env.VUE_APP_DOMAIN_NAME}${process.env.VUE_APP_PUBLIC_PATH}#/introduction?from=${from}`
    }
    const encoderedirecurl = encodeURIComponent(redirecurl)
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encoderedirecurl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  }
}
</script>
<style lang="less">

</style>
