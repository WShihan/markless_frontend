<template>
  <div class="panel">
    <div  class="login-form" v-loading="loading">
      <div class="form">
        <div class="form-item">
          <label for="username">用户名</label>
          <input type="text" name="username" id="username" v-model="loginForm.username" />
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <input type="password" name="password" id="password" v-model="loginForm.password" />
        </div>
        <div class="form-item">
          <a class="icon" @click.prevent="$router.push('/register')">去注册</a>
        </div>
        <div class="form-item">
          <button @click="handleLogin" class="submit">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api';
import { PopTip } from '@/utils/tip';
import {store} from '@/store'

let tokenStore = store;

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: process.env.VUE_APP_USER,
        password: process.env.VUE_APP_USERPASS,
      },
      registerForm: {
        username: '',
        password: '',
        'password-confirm': '',
      },
      loading: false,
    };
  },
  methods: {
    validateUsername() {
      if ((this.loginForm.username.length <= 2) & (this.loginForm.username === '')) {
        PopTip.warning('用户名不正确');
        return false;
      } else return true;
    },

    validatePassword() {
      if ((this.loginForm.password.length <= 3) & (this.loginForm.password === '')) {
        PopTip.warning('密码长度小于8位');
        return false;
      } else return true;
    },
    clear(){
      this.loginForm.username = ''
      this.loginForm.password = ''
    },

    handleLogin() {
      if (this.validatePassword() && this.validateUsername()) {
        this.loading = true;
        userLogin(this.loginForm)
          .then(res => {
            const {status, data} = res.data
            if (status) {
              PopTip.success("登陆成功");
              tokenStore.setToken(res.data.data['access_token'])
              this.$router.push({
                path: this.$route.query.redirect || '/',
              });
            } else {
              throw res.data.msg;
            }
          })
          .catch(err => {
            console.error(err);
            PopTip.error('登陆错误！');
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
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
    .form-item {
      display: flex;
      gap: 0.5em;
      margin: 1em 0em;
      label {
        min-width:4em;
      }
      button {
        flex: 1;
        margin: 1em 0em;
      }
    }
  }
}
</style>
