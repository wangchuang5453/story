import { getCookie, setCookie } from '@/utils/story.js';
import { CookieKey, LocalKey } from '../common/index.js';
export default {
  beforeRouteEnter(to, from, next) {
    try {
      const { name = '' } = from;
      const { meta: { previous = [] }, name: toName = '' } = to;
      if (previous.length == 0 || previous.includes(name)) {
        next();
      } else {
        next({ name: 'index' })
      }
    } catch (error) {
      next();
    }
  },
}