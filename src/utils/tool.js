import { dayjs } from 'element-plus';
import DOMPurify from 'dompurify';


/**
 * @description 对比两个具有相同属于对象的差异
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @return {*}
 */
export function objDiff(obj1, obj2) {
  var diff = {};

  for (var key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        diff[key] = obj2[key];
      }
    }
  }

  return diff;
}
/**
 * @description
 * @export
 * @param {Array} routes
 */
export function routes2nav(routes) {
  const navs = [];
  function getNavs(route) {
    const navs = [];
    if (route.children) {
      route.children.forEach(item => {
        const rest = getNavs(item);
        if (rest instanceof Array) {
          navs.push(...rest);
        }
      });
    }
    if (route.meta.nav) {
      return [{
        name: route.name,
        title: route.meta.title,
        children: navs,
      }];
    } else {
      return navs;
    }
  }
  routes.forEach(item => {
    navs.push(getNavs(item));
  });
  return navs.reduce((a, b) => a.concat(b));
}

export function fmtNowDate(){
  return dayjs().format('YYYY-MM-DD');
}

export function parseDate(dt) {
  let date = new Date(dt);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}




export function cleanHtml(html) {
  return DOMPurify.sanitize('<b>hello there</b>');
}