import store from '@/store';
import { createI18n } from 'vue-i18n';

// 组合语言包对象
const messages = {
  'zh-CN': require('./lang/zh-CN'),
  'zh-TW': require('./lang/zh-TW'),
  en: require('./lang/en'),
};

const i18n = new createI18n({
  legacy: false,
  locale: store.getLang(), // 语言标识
  messages,
  fallbackLocale: 'zh-CN',
});

export function initI18n(app) {
  app.use(i18n);
}
