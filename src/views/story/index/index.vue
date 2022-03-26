<template>
  <div></div>
</template>
<script>
import { getCookie, setCookie } from '@/utils/story.js';
import { CookieKey } from '../common/index.js';
export default {
  created() {
    // TODO: 上线前修改
    // const value = getCookie(CookieKey);
    // if (value) {
    //   this.$router.replace({ name: 'complete' });
    // } else {
    //   this.$router.replace({ name: 'home' });
    // }
    this.$router.replace({ name: 'home' });
  }
}
</script>
<style lang="less" scoped>

</style>