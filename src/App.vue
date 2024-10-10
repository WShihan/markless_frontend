<template>
  <el-config-provider :locale="activeLang">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import store from './store';

import zhCN from 'element-plus/es/locale/lang/zh-cn';
import zhTW from 'element-plus/es/locale/lang/zh-tw';
import en from 'element-plus/es/locale/lang/en';

let activeLang = computed(() => {
  const lang = store.getLang();
  switch (lang) {
    case 'en':
      return en;
    case 'zh-TW':
      return zhTW;
    default:
      return zhCN;
  }
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
