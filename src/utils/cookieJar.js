import Cookies from "js-cookie";

export function getCookie(key) {
  return Cookies.get(key);
}

export function setCookie(key, value, expires) {
  Cookies.set(key, value, { expires: expires || 5 }); //5天失效
}

export function removeCookie(key) {
  Cookies.remove(key);
}

