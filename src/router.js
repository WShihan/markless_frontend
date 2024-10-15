import { createRouter, createWebHashHistory } from 'vue-router';
import nprogress from 'nprogress';

import { store } from '@/store/index.js';

const tokenStore = store;

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
    meta: {
      title: 'Markless',
      cache: true,
    },
    redirect: 'link-all?read=2',
    children: [
      {
        path: '/link-all',
        name: 'link-all',
        query: {
          keyword: '',
          read: '2'
        },
        component: () => import('@/view/components/link-all/index.vue'),
        meta: { nav: true, title: '所有书签', cache: true, loged: false },
      },
      {
        path: '/link-add',
        name: 'link-add',
        component: () => import('@/view/components/link-add.vue'),
        meta: { nav: true, title: '添加书签', cache: true, loged: false },
      },
      {
        path: '/link-edit',
        name: 'link-edit',
        query: { id: '' },
        component: () => import('@/view/components/link-edit.vue'),
        meta: { nav: true, title: '编辑书签', cache: false, loged: false },
      },
      {
        path: '/link-archive',
        name: 'link-archive',
        query: { id: '' },
        component: () => import('@/view/components/link-archive.vue'),
        meta: { nav: true, title: '快照', cache: false, loged: false },
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import('@/view/components/tags.vue'),
        meta: { nav: true, title: '标签', cache: true, loged: false },
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/view/components/setting.vue'),
        meta: { nav: true, title: '设置', cache: true, loged: false },
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
  document.title = to.meta.title;
  if (to.meta.loged) {
    if (tokenStore.getToken()) next();
    else next(`/login?redirect=${to.path}`);
  } else next();
});

router.afterEach((to, from, next) => {
  nprogress.done();
});

export { router };
export default router;
