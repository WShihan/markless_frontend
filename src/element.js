// 按需引用element-plus
import {
  ElConfigProvider,
  ElInput,
  ElOption,
  ElSelect,
  ElPagination,
  ElSwitch,
  ElPopconfirm,
} from 'element-plus';

import 'element-plus/theme-chalk/index.css';

export function registerElement(app) {
  app.use(ElConfigProvider);
  app.use(ElInput);
  app.use(ElOption);
  app.use(ElSelect);
  app.use(ElPagination);
  app.use(ElSwitch);
  app.use(ElPopconfirm);
}
