import axios from 'axios';
import nprogress from 'nprogress';
import {store} from '@/store'
import {router} from '@/router'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
});
request.defaults.withCredentials = true;
request.defaults.crossDomain = true;
request.interceptors.request.use(function (config) {
  nprogress.start();
  if (config.method == 'post') {
    config.headers['content-type'] = 'application/json';
  }
  config.headers['Authorization'] = `Bearer ${store.getToken()}`
  return config;
});

request.interceptors.response.use(
  res => {
    nprogress.done();
    if (!res.data.status) {
      throw `请求失败:${res.data.msg}`;
    } else return res;
  },
  err => {
    nprogress.done();
    if (err.response) {
      const code = err.response.status;
      const route = router.currentRoute.value
      const curPath = route.path;
      switch (code) {
        case 401:
        case 403:
        case 422:
          console.log(curPath);
          console.log(route);
          if (curPath !== '/login') {
            router.push({ path: '/login', query: { redirect: curPath } });
          }
          break;
        default:
          break;
      }
      return;
    }
    return err;
  }
);

/**
 * @description 获取标准分页数据
 * @param {String} url
 * @param {{page, limit}} data
 * @ {*}
 */
export const getPaginationData = (url, data) => {
  request({
    url,
    method: 'post',
    data,
  });
};
export default request;
