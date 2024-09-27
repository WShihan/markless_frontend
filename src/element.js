// 按需引用element-plus
import {
  ElButton,
  ElInput,
  ElForm,
  ElFormItem,
  ElRadio,
  ElRadioGroup,
  ElOption,
  ElSelect,
  ElOptionGroup,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElLoading,
  ElSwitch,
  ElDatePicker,
  ElCollapse,
  ElCollapseItem,
  ElPopconfirm,
} from 'element-plus';

// import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/theme-chalk/index.css';

export function registerElement(app) {
  app.use(ElButton);
  app.use(ElInput);
  app.use(ElForm);
  app.use(ElFormItem);
  app.use(ElRadio);
  app.use(ElRadioGroup);
  app.use(ElOption);
  app.use(ElSelect);
  app.use(ElOptionGroup);
  app.use(ElTable);
  app.use(ElTableColumn);
  app.use(ElPagination);
  app.use(ElDialog);
  app.use(ElLoading);
  app.use(ElSwitch);
  app.use(ElDatePicker);
  app.use(ElCollapse);
  app.use(ElCollapseItem);
  app.use(ElPopconfirm);
}
