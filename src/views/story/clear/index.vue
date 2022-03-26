<template>
  <div></div>
</template>
<script>
import { setCookie } from '@/utils/story.js';
import { CookieKey } from '../common/index.js';
export default {
  created() {
    setCookie(CookieKey, '');
  }
}
</script>