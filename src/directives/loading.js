
import { createApp } from 'vue';
import Loading from '@/components/loading.vue';

const loadDirective = {};
loadDirective.install = Vue => {
  // 挂载
  const append = el => {
    console.log('install loading directive')
    el.style.position = 'relative';
    el.appendChild(el.instance.$el); // el.instance.$el => Loading组件组件对应的dom对象  => 挂载到el(Loading组件作用的对应dom上)
  };

  // 移除
  const remove = el => {
    el.removeChild(el.instance.$el);
  };
  Vue.directive('loading', {
    mounted(el, binding) {
      // 新建vue实例
      const app = createApp(Loading); // app对象根组件就是Loading
      const instance = app.mount(document.createElement('div')); // app实例挂载的地方是动态创建的div   后面再挂载到el上
      el.instance = instance; // 先保存  el.instance => Loading组件实例   updated中拿不到instance
      if (binding.value) {
        append(el);
      }
    },

    updated(el, binding) {
      // 因为loading值会改变，所以会更新 就会触发updated
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    },
  });
};

export default loadDirective;
