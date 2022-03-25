<template>
  <div></div>
</template>
<script>
import { getCookie } from '@/utils/story.js';
import { CookieKey } from '../common/index.js';
export default {
  created() {
    const value = getCookie(CookieKey);
    if (value) {
      this.$router.replace({ name: 'complete' });
    } else {
      this.$router.replace({ name: 'home' });
    }
  }
}
</script>
<style lang="less" scoped>

</style>