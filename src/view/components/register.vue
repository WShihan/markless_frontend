<template>
  <div class="panel">
    <div class="register-form" v-loading="loading">
      <div class="form">
        <div class="form-item">
          <label for="username">用户名</label>
          <input type="text" name="username" id="username" v-model="registerForm.username" />
        </div>
        <div class="form-item">
          <label for="password">输入密码</label>
          <input type="password" name="password" id="password" v-model="registerForm.password" />
        </div>
        <div class="form-item">
          <label for="password">确认密码</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="registerForm['password-confirm']"
          />
        </div>
        <div class="form-item">
          <a class="icon" @click.prevent="$router.push('/login')">去登录</a>
        </div>
        <div class="form-item">
          <button  class="submit" @click.prevent="handleRegister">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userRegister } from '@/api';
import { PopTip } from '@/utils/tip';


export default {
  name: 'register',
  data() {
    return {
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
      if ((this.registerForm.username.length <= 2) & (this.registerForm.username === '')) {
        PopTip.warning('用户名不正确');
        return false;
      } else return true;
    },

    validatePassword() {
      if ((this.registerForm.password.length <= 3) & (this.registerForm.password === '')) {
        PopTip.warning('密码长度小于8位');
        return false;
      } else return true;
    },
    clear(){
      this.registerForm.username = ''
      this.registerForm['password-confirm'] = ''
      this.registerForm.password = ''
    },

    handleRegister() {
      if (this.validatePassword() && this.validateUsername()) {
        if(this.registerForm.password !==this.registerForm['password-confirm']){
          PopTip.info('密码不一致')
          return
        }
        this.loading = true;
        userRegister(this.registerForm)
          .then(res => {
            const {status, data} = res.data
            if (status) {
              PopTip.success("注册成功");
              this.clear()
              this.$route.push('/login')
              return
            } else {
              throw res.data.msg;
            }
          })
          .catch(err => {
            console.error(err);
            PopTip.error('注册错误！');
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
