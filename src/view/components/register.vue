<template>
  <div class="panel">
    <div class="register-form" v-loading="state.loading">
      <div class="form">
        <div class="form-item">
          <label for="username">{{ $t('lang.page.register.label.username') }}</label>
          <input type="text" name="username" id="username" v-model="state.registerForm.username" />
        </div>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.register.label.password') }}</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="state.registerForm.password"
          />
        </div>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.register.label.password-confirm') }}</label>
          <input
            type="password"
            name="password"
            id="password"
            @keyup="onKeyup"
            v-model="state.registerForm['password-confirm']"
          />
        </div>
        <details>
          <summary>{{ $t('lang.page.setting.label.lang') }}</summary>
          <langSwitch v-model:lang="state.registerForm.lang" @change="onLangChange" />
        </details>
        <div class="form-item">
          <a class="icon" @click.prevent="$router.push('/login')">{{ $t('lang.page.register.label.to-login') }}</a>
        </div>

        <div class="form-item">
          <button class="submit" @click.prevent="handleRegister" >{{ $t('lang.submit.register') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userRegister } from '@/api';
import { PopTip } from '@/utils/tip';
import { reactive } from 'vue';
import langSwitch from '@/components/lang-switch.vue';
import { getCookie } from '@/utils/cookieJar';
import store from '@/store';
import { useI18n } from 'vue-i18n';


const { t, locale } = useI18n();
const state = reactive({
  registerForm: {
    username: '',
    password: '',
    lang:getCookie('markless-lang') || 'zh',
    'password-confirm': '',
  },
  loading: false,
});

function onLangChange(lang) {
  store.setLang(lang);
  locale.value = lang;
}

function validateUsername() {
  if ((state.registerForm.username.length <= 2) & (state.registerForm.username === '')) {
    PopTip.warning(t('lang.page.register.tip.username-invalid') );
    return false;
  } else return true;
}

function validatePassword() {
  if ((state.registerForm.password.length <= 3) & (state.registerForm.password === '')) {
    PopTip.warning(t('lang.page.register.tip.password-invalid') );
    return false;
  } else return true;
}
function clear() {
  state.registerForm.username = '';
  state.registerForm['password-confirm'] = '';
  state.registerForm.password = '';
}

function onKeyup(e) {
  if (e.key === 'Enter') {
    handleRegister();
  }
}

function handleRegister() {
  if (validatePassword() && validateUsername()) {
    if (state.registerForm.password !== state.registerForm['password-confirm']) {
    PopTip.warning(t('lang.page.register.tip.password-invalid') );
      return;
    }
    state.loading = true;
    userRegister(state.registerForm)
      .then(res => {
        const { status, data } = res.data;
        if (status) {
          PopTip.success(t('lang.message.success.register'));
          clear();
          $route.push('/login');
          return;
        } else {
          throw res.data.msg;
        }
      })
      .catch(err => {
        console.error(err);
        PopTip.error(t('lang.message.failed.register'));

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
