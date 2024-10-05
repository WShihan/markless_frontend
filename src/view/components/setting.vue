<template>
  <div class="setting page">
    <div class="form">
      <details>
        <summary>{{ $t('lang.page.setting.summary.user') }}</summary>
        <div class="form-item">
          <label for="username">{{ $t('lang.page.setting.label.username') }}</label>
          <input class="disable" type="text" readonly v-model="state.info.user.username" />
        </div>
        <div class="form-item">
          <label for="username">{{ $t('lang.page.setting.label.admin') }}</label>
          <el-switch v-model="state.info.user.admin" readonly />
        </div>
        <langSwitch v-model:lang="state.info.user.lang" />
        <div class="form-item">
          <label for="lang">{{ $t('lang.page.setting.label.theme') }}</label>
          <select v-model="state.info.user.theme">
            <option value="normal" :label="$t('lang.page.setting.label.theme-opt.normal')"></option>
            <option value="dark" :label="$t('lang.page.setting.label.theme-opt.dark')"></option>
          </select>
        </div>
        <div class="form-item">
          <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onUpdateUserInfo">
            <template #reference>
              <button class="submit">
                {{ $t('lang.submit.update') }}
              </button>
            </template>
          </el-popconfirm>
        </div>
      </details>
    </div>
    <div class="form">
      <details>
        <summary>{{ $t('lang.page.setting.summary.password') }}</summary>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.setting.label.password-now') }}</label>
          <input type="password" name="password" v-model="state.info.password.origin" />
        </div>
        <div class="form-item">
          <label for="lang">{{ $t('lang.page.setting.label.password-new') }}</label>
          <input type="password" name="password-new" v-model="state.info.password.current" />
        </div>
        <div class="form-item">
          <label for="lang">{{ $t('lang.page.setting.label.password-confirm') }}</label>
          <input type="password" name="password-confirm" v-model="state.info.password.confirm" />
        </div>
        <div class="form-item">
          <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onUpdatePassword">
            <template #reference>
              <button class="submit">{{ $t('lang.submit.update') }}</button>
            </template>
          </el-popconfirm>
        </div>
      </details>
    </div>
    <div class="form">
      <details>
        <summary>{{ $t('lang.page.setting.summary.token') }}</summary>
        <div class="form-item">
          <input type="text" readonly name="token" v-model="state.info.user.token" />
        </div>
        <div class="form-item">
          <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onTokenRefresh">
            <template #reference>
              <button class="submit">{{ $t('lang.submit.update') }}</button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确定删除吗？" @confirm="onTokenDel">
            <template #reference>
              <button class="submit danger">{{ $t('lang.submit.delete') }}</button>
            </template>
          </el-popconfirm>
        </div>
      </details>
    </div>
    <div class="form">
      <details open>
        <summary>{{ $t('lang.page.setting.summary.env') }}</summary>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.setting.label.base-url') }}</label>
          <input class="disable" type="text" readonly v-model="state.info.env.base_url" />
        </div>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.setting.label.version') }}</label>
          <input class="disable" type="text" readonly v-model="state.info.env.version" />
        </div>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.setting.label.git-id') }}</label>
          <input class="disable" type="text" readonly v-model="state.info.env.commit" />
        </div>
        <div class="form-item">
          <label for="password">{{ $t('lang.page.setting.label.build-time') }}</label>
          <input class="disable" type="text" readonly v-model="state.info.env.build_time" />
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import { userInfo } from '@/api';
import { userEnv } from '@/api';
import { userinfoUpdate } from '@/api';
import { userTokenDel } from '@/api';
import { userTokenRefresh } from '@/api';
import { userPasswordUpdate } from '@/api';
import { PopTip } from '@/utils/tip';
import store from '@/store';
import router from '@/router';
import { getCookie, setCookie } from '@/utils/cookieJar';
import langSwitch from '@/components/lang-switch.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const state = reactive({
  info: {
    user: {
      username: '',
      lang: '',
      theme: '',
      admin: false,
      token: '',
      theme: getCookie('markless-theme') || 'normal',
    },
    env: {
      base_url: '',
      version: '',
      commit: '',
      build_time: '',
    },
    password: {
      origin: '',
      current: '',
      confirm: '',
    },
  },
});

onBeforeMount(() => {
  initialInfo();
});
function initialInfo() {
  userInfo().then(res => {
    const { status, data } = res.data ? res.data : {};
    if (status) {
      Object.assign(state.info.user, data);
    }
  });
  userEnv().then(res => {
    const { status, data } = res.data ? res.data : {};
    if (status) {
      Object.assign(state.info.env, data);
    }
  });
}

function onUpdateUserInfo() {
  userinfoUpdate(state.info.user).then(res => {
    const { status, data } = res.data;
    if (status) {
      store.setLang(state.info.user.lang);
      store.setTheme(state.info.user.theme);
      locale.value = state.info.user.lang;
      PopTip.success('更新成功');
    } else {
      PopTip.warning('更新失败');
    }
  });
}

function onTokenDel() {
  userTokenDel().then(res => {
    if (res.data) {
      const { status, data } = res.data;
      if (status) {
        initialInfo();
      }
    }
  });
}
function onTokenRefresh() {
  userTokenRefresh().then(res => {
    if (res.data) {
      const { status, data } = res.data;
      if (status) {
        initialInfo();
      }
    }
  });
}
function onUpdatePassword() {
  if (state.info.password.origin.length == 0 || state.info.password.current.length == 0) {
    return;
  }
  if (state.info.password.current.length <= 6) {
    PopTip.info('密码长度大于6位');
    return;
  }
  if (state.info.password.confirm !== state.info.password.current) {
    PopTip.info('新密码不一致');
    return;
  }
  userPasswordUpdate(state.info.password.origin, state.info.password.current).then(res => {
    if (res.data) {
      const { status, msg } = res.data;
      if (status) {
        PopTip.success('修改成功，将重新登录');
        setTimeout(() => {
          store.removeToken();
          router.push('/login');
        }, 3000);
      }
    }
  });
}
</script>

<style scoped lang="scss">
.form {
  margin: 1em auto;
  summary {
    cursor: pointer;
  }
}
</style>
