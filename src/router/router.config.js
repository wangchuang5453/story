const home = () => import('@/views/story/home/index.vue');
const question = () => import('@/views/story/question/index.vue');
const complete = () => import('@/views/story/complete/index.vue');
const index = () => import('@/views/story/index/index.vue');

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    name: 'root',
    meta: {
      title: '根页',
      keepAlive: false,
      previous: [],
    }
  },
  {
    path: '/index',
    name:'index',
    component: index,
    meta: {
      title: '分发页',
      keepAlive: false,
      previous: [],
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '首页',
      keepAlive: false,
      previous: [],
    }
  },
  {
    path: '/question',
    name: 'question',
    component: question,
    meta: {
      title: '测试题',
      keepAlive: false,
      previous: ['home'],
    }
  },
  {
    path: '/complete',
    name: 'complete',
    component: complete,
    meta: {
      title: '完成',
      keepAlive: false,
      previous: ['question', 'home', 'index']
    }
  }
]
