<template>
  <div class="panel">
    <div class="login-form" v-loading="state.loading">
      <div class="form">
        <div class="form-item">
          <label for="username">{{ $t('lang.page.login.label.username') }}</label>
          <input type="text" name="username" id="username" v-model="state.loginForm.username" />
        </div>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.login.label.password') }}</label>
          <input type="password" name="password" id="password" v-model="state.loginForm.password" @keyup="onKeyup" />
        </div>
        <details>
          <summary>{{ $t('lang.page.setting.label.lang') }}</summary>
          <langSwitch v-model:lang="state.loginForm.lang" @change="onLangChange" />
        </details>
        <div class="form-item">
          <a class="icon" @click.prevent="$router.push('/register')">
            {{ $t('lang.page.login.label.to-register') }}
          </a>
        </div>
        <div class="form-item">
          <button @click="handleLogin"  class="submit">{{ $t('lang.submit.login') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import langSwitch from '@/components/lang-switch.vue';
import { userLogin } from '@/api';
import { PopTip } from '@/utils/tip';
import { store } from '@/store';
import { getCookie, setCookie } from '@/utils/cookieJar';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';
import {  useRouter,useRoute } from 'vue-router';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
let tokenStore = store;
const state = reactive({
  loginForm: {
    username: process.env.VUE_APP_USER,
    password: process.env.VUE_APP_USERPASS,
    lang: getCookie('markless-lang') || 'zh-CN',
  },
  loading: false,
});

function onLangChange(lang) {
  store.setLang(lang);
  locale.value = lang;
}
function validateUsername() {
  if ((state.loginForm.username.length <= 2) & (state.loginForm.username === '')) {
    PopTip.warning(t('lang.page.login.tip.username-invalid'));
    return false;
  } else return true;
}
function validatePassword() {
  if ((state.loginForm.password.length <= 8) & (state.loginForm.password === '')) {
    PopTip.warning(t('lang.page.login.tip.password-invalid'));
    return false;
  } else return true;
}

function onKeyup(e) {
  if (e.key === 'Enter') {
    handleLogin();
  }
}

function handleLogin() {
  if (validatePassword() && validateUsername()) {
    state.loading = true;
    userLogin(state.loginForm)
      .then(res => {
        const { status, data } = res.data;
        if (status) {
          tokenStore.setToken(data['access_token']);
          setCookie('markless-lang', data.lang);
          setCookie('markless-theme', data.theme);
          setCookie('markless-username', data.username);
          router.push({
            path: route.query.redirect || '/',
          });
        } else {
          throw res.data.msg;
        }
      })
      .catch(err => {
        console.error(err);
        PopTip.error(err);
      })
      .finally(() => {
        state.loading = false;
      });
  }
}
</script>
<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}

.panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  .login-form,
  .register-form {
    width: $--base-width;
    padding: 1em 0.7813rem;
    margin: 1em auto;
    border-radius: 0.1563rem;
  }
}
</style>
