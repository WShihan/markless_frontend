<template>
  <div class="link-all page">
    <div>
      <SearchOpt
        :keyword="state.search.keyword"
        v-model:keyword="state.search.keyword"
        @submit="loadLinks"
      >
        <template #other>
          <el-select v-model="state.search.read" placeholder="Select" style="width: 7em">
            <el-option label="所有" selected value="0" />
            <el-option label="已阅" value="1" />
            <el-option label="未阅" value="2" />
          </el-select>
        </template>
      </SearchOpt>
      <div class="link-btns">
        <a href="{{$.Env.BaseURL}}/link/mark/read?v=0" class="icon">全部标为未阅</a>
        <a href="{{$.Env.BaseURL}}/link/mark/unread?v=0" class="icon">全部标为已阅</a>
      </div>
    </div>

    <div class="links">
      <Link
        v-for="(item, i) in state.links"
        :key="i"
        :link="item"
        @delete="onlinkDeleted"
        @read="onRead"
        @unread="onUnread"
        @active-tag="(val)=> state.search.keyword = val"
      />
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
import { router } from '@/router';

const state = reactive({
  links: [],
  search: {
    page: 1,
    keyword: '',
    count: 0,
    size: 20,
    read: '0',
  },
});

watch(
  () => state.search,
  () => {
    loadLinks();
  },
  {
    deep: true,
  }
);

onBeforeMount(() => {
  loadLinks();
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

function onRead(link) {
  console.log(router.currentRoute.value.query.read);
  const tLink = state.links.find(item => item.id == link.id);
  tLink.read = true;
}
function onUnread(link) {
  const tLink = state.links.find(item => item.id == link.id);
  tLink.read = false;
}

function onlinkDeleted(link) {
  const removeIdx = state.links.findIndex(item => item.id == link.id);
  if (removeIdx >= 0) {
    debugger;
    state.links.splice(removeIdx, 1);
  }
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
