import { defineStore } from 'pinia';
import { getCookie, setCookie, removeCookie } from '@/utils/cookieJar';
import { pinia } from './pinia';

const TOKENKEY = 'access-token'

export const createStore = defineStore('publicStore', {
  state: () => ({ token: null, nav: 'Markless' }),
  getters: {
    navigation() {
      return this.nav;
    },
  },
  actions: {
    setToken(token) {
      setCookie(TOKENKEY, token);
      this.token = token;
    },
    getToken() {
      const tk = getCookie(TOKENKEY);
      if (!this.token) {
        this.token = tk;
      }
      return this.token;
    },
    removeToken() {
      this.token = null;
      removeCookie(TOKENKEY);
    },
    setNav(text){
      this.nav = text
    }
  },
});
export const store = createStore(pinia);
export default store;
