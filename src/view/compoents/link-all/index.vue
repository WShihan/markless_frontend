<template>
  <div class="link-all page">
    <div>
      <SearchOpt
        :keyword="state.search.keyword"
        v-model:keyword="state.search.keyword"
        @submit="loadLinks"
      />
      <div class="link-btns">
        <a href="{{$.Env.BaseURL}}/link/mark/read?v=0" class="icon">全部标为未阅</a>
        <a href="{{$.Env.BaseURL}}/link/mark/unread?v=0" class="icon">全部标为已阅</a>
      </div>
    </div>

    <div class="links">
      <Link v-for="(item, i) in state.links" :key="i" :link="item" />
    </div>
    <Pager
      @next="
        () => {
          state.search.page++;
        }
      "
      @prev="
        () => {
          state.search.page <= 0 ? 0 : state.search.page--;
        }
      "
      @change="n => (state.search.page = n)"
      :page-info="state.search"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import { watch } from 'vue';
import { linkAll } from '@/api/index';
import Pager from '../pager.vue';
import Link from '../link.vue';
import SearchOpt from '../SearchOptions.vue';

const state = reactive({
  links: [],
  search: {
    page: 1,
    keyword: '',
    count: 0,
    size: 20,
  },
});

function loadLinks() {
  linkAll({ ...state.search })
    .then(res => {
      const {
        status,
        data: { links, search },
      } = res.data;
      if (!status) {
        throw new Error('获取链接失败');
      }
      state.links.length = 0;
      state.links.push(...links);
      state.search.count = search.count;
      state.search.page = search.page;
    })
    .catch(err => {
      console.log(err);
    });
}
onBeforeMount(() => {
  loadLinks();
});

watch(
  () => state.search.page,
  () => {
    loadLinks();
  }
);

function onChange(val) {
  console.log(val);
}
</script>

<style scoped lang="scss">
.link-all {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .links {
    flex: 1;
  }
  .link-btns {
    display: flex;
    justify-content: space-around;
  }
}
</style>
