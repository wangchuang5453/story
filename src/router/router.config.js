// const orderConfirm = () => import('@/views/orderConfirm/index');
// const mailAddress = () => import('@/views/mailAddress/index');
// const addTeacher = () => import('@/views/addTeacher/index');
// const introduction = () => import('@/views/introduction/index');
// const auth = () => import('@/views/auth/index');
const home = () => import('@/views/story/home/index.vue');
const question = () => import('@/views/story/question/index.vue');
const complete = () => import('@/views/story/complete/index.vue');
const index = () => import('@/views/story/index/index.vue');

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/index',
    name:'index',
    component: index,
    meta: {
      title: '主页',
      keepAlive: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { title: '首页-测试须知', keepAlive: false}
  },
  {
    path: '/question',
    name: 'question',
    component: question,
    meta: { title: '测试题', keepAlive: false}
  },
  {
    path: '/complete',
    name: 'complete',
    component: complete,
    meta: { title: '完成', keepAlive: false }
  },
  // {
  //   path: '/orderConfirm',
  //   name: 'orderConfirm',
  //   component: orderConfirm,
  //   meta: { title: '订单确认', keepAlive: false}
  // },
  // {
  //   path: '/mailAddress',
  //   name: 'mailAddress',
  //   component: mailAddress,
  //   meta: { title: '邮寄地址', keepAlive: false}
  // },
  // {
  //   path: '/addTeacher',
  //   name: 'addTeacher',
  //   component: addTeacher,
  //   meta: { title: '添加老师', keepAlive: false}
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/views/home/about'),
  //   meta: { title: '关于我', keepAlive: false }
  // },
  // {
  //   path: '/study',
  //   name: 'study',
  //   component: () => import('@/views/home/studyReports'),
  //   meta: { title: '学习报告', keepAlive: false }
  // }
]
