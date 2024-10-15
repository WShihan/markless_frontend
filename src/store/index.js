import { defineStore } from 'pinia';
import { getCookie, setCookie, removeCookie } from '@/utils/cookieJar';
import { pinia } from './pinia';

const TOKENKEY = 'access-token';

export const createStore = defineStore('publicStore', {
  state: () => ({
    token: getCookie(TOKENKEY),
    lang: getCookie('markless-lang'),
    theme: getCookie('markless-theme'),
    username: getCookie('markless-username'),
  }),
  actions: {
    setToken(token) {
      setCookie(TOKENKEY, token);
      this.token = token;
    },
    getToken() {
      return this.token;
    },
    removeToken() {
      this.token = null;
      removeCookie(TOKENKEY);
    },
    setLang(lang) {
      setCookie('markless-lang', lang);
      this.lang = lang;
    },
    getLang() {
      return this.lang;
    },
    setTheme(theme) {
      const body = document.body;
      const ttheme = getCookie('markless-theme') || 'normal';
      body.classList.remove(ttheme);
      body.classList.add(theme);
      setCookie('markless-theme', theme);
      this.theme = theme;
    },
    getTheme() {
      return this.theme;
    },
    setSearchOpt(opt){
      Object.assign(state.searchOpt, opt);
    },
    setUsername(username){
      setCookie('markless-username', username);
      this.username = username;
    }
  },
});
export const store = createStore(pinia);
export default store;
