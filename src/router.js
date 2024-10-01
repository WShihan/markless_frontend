import { createRouter, createWebHashHistory } from 'vue-router';
import nprogress from 'nprogress';


// import { store } from '@/store/index.js';

// const tokenStore = store;

export const routes = [
    {
      path: '/login',
      name: 'login',
      query: { redirect: '/' },
      component: () => import('@/view/components/login.vue'),
      meta: { title: '登录', loged: false },
    },
    {
      path: '/register/',
      name: 'register',
      component: () => import('@/view/components/register.vue'),
      meta: { title: '注册', loged: false },
    },
  {
    path: '/',
    name: 'index',
    component: () => import('@/view/index.vue'),
    query: {
      read: 0,
    },
    meta: {
      title: 'Markless',
      keepAlive: true,
      //   loged: process.env.NODE_ENV === 'development' ? true : false,
    },
    redirect: 'link-all',
    children: [
      {
        path: '/link-all',
        name: 'link-all',
        component: () => import('@/view/components/link-all/index.vue'),
        meta: { nav: true, title: '所有书签', keepAlive: true, loged: false },
      },
      {
        path: '/link-add',
        name: 'link-add',
        component: () => import('@/view/components/link-add.vue'),
        meta: { nav: true, title: '添加书签', keepAlive: true, loged: false },
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import('@/view/components/tags.vue'),
        meta: { nav: true, title: '标签', keepAlive: true, loged: false },
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/view/components/setting.vue'),
        meta: { nav: true, title: '设置', keepAlive: true, loged: false },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  nprogress.start();
  document.title = to.meta.title
  next();
  //   document.title = to.meta.title || 'Mylog';

  //   document.title = `Mylog-${to.meta.title}`;
  //   if (to.meta.loged) {
  //     if (tokenStore.getToken()) next();
  //     else next(`/login?redirect=${to.path}`);
  //   } else next();
});

router.afterEach((to, from, next) => {
  // next();
  //   const navs = to.matched.map(item => item.meta.title);
  //   store.setNav(navs.join(' >> ') || '');
  nprogress.done();
});

export { router };
export default router;
