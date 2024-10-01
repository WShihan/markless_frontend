<template>
  <div class="setting page">
    <div class="form">
      <details>
        <summary>用户信息</summary>
        <div class="form-item">
          <label for="username">用户名</label>
          <input class="disable" type="text" readonly v-model="state.info.user.username" />
        </div>
        <div class="form-item">
          <label for="username">管理员</label>
          <el-switch v-model="state.info.user.admin" readonly />
        </div>
        <div class="form-item">
          <label for="lang">语言</label>
          <select v-model="state.info.user.lang">
            <option value="en" label="英文"></option>
            <option value="zh-TW" label="中文繁体"></option>
            <option value="zh-CN" label="中文简体"></option>
          </select>
        </div>
        <div class="form-item">
          <label for="lang">主题</label>
          <select v-model="state.info.user.theme">
            <option value="normal" label="明亮"></option>
            <option value="dark" label="黑暗"></option>
          </select>
        </div>
        <div class="form-item">
          <button class="submit" @click.prevent="onUpdateUserInfo">更新</button>
        </div>
      </details>
    </div>
    <div class="form">
      <details>
        <summary>密码</summary>
        <div class="form-item">
          <label for="password">旧密码</label>
          <input type="password" name="password" v-model="state.info.password.origin" />
        </div>
        <div class="form-item">
          <label for="lang">新密码</label>
          <input type="password" name="password-new" v-model="state.info.password.current" />
        </div>
        <div class="form-item">
          <label for="lang">确认密码</label>
          <input type="password" name="password-confirm" v-model="state.info.password.confirm" />
        </div>
        <div class="form-item">
          <el-popconfirm title="确定删除吗？" @confirm="onUpdatePassword">
            <template #reference>
              <button class="submit">更新</button>
            </template>
          </el-popconfirm>
        </div>
      </details>
    </div>
    <div class="form">
      <details>
        <summary>密钥</summary>
        <div class="form-item">
          <input type="text" readonly name="token" v-model="state.info.user.token" />
        </div>
        <div class="form-item">
          <el-popconfirm title="确定更新吗？" @confirm="onTokenRefresh">
            <template #reference>
              <button class="submit">更新</button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确定删除吗？" @confirm="onTokenDel">
            <template #reference>
              <button class="submit danger">删除</button>
            </template>
          </el-popconfirm>
        </div>
      </details>
    </div>
    <div class="form">
      <details open>
        <summary>应用信息</summary>
        <div class="form-item">
          <label for="password">根路由</label>
          <input class="disable" type="text" readonly v-model="state.info.env.base_url" />
        </div>
        <div class="form-item">
          <label for="password">版本</label>
          <input class="disable" type="text" readonly v-model="state.info.env.version" />
        </div>
        <div class="form-item">
          <label for="password">GIT</label>
          <input class="disable" type="text" readonly v-model="state.info.env.commit" />
        </div>
        <div class="form-item">
          <label for="password">构建时间</label>
          <input class="disable" type="text" readonly v-model="state.info.env.build_time" />
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import { watch } from 'vue';
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
watch(
  () => state.info.user.theme,
  val => {
    setCookie('markless-theme', val);
    document.location.reload();
  }
);
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
  .form-item {
    display: flex;
    gap: 0.5em;
    margin: 1em 0em;
    label {
      min-width: 4em;
    }
    details {
      flex: 1;
    }
  }
}
</style>
