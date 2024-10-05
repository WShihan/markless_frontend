<template>
  <div class="link-all page" v-loading="state.loading">
    <div>
      <SearchOpt
        :keyword="state.search.keyword"
        v-model:keyword="state.search.keyword"
        @submit="loadLinks"
      >
        <template #other>
          <el-select v-model="state.search.read" placeholder="Select" style="width: 7em">
            <el-option :label="$t('lang.page.link-all.search.select.all')" selected value="0" />
            <el-option :label="$t('lang.page.link-all.search.select.read')" selected value="1" />
            <el-option :label="$t('lang.page.link-all.search.select.unread')" selected value="2" />
          </el-select>
        </template>
      </SearchOpt>
      <div class="link-btns">
        <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onMarkLink(true)">
          <template #reference>
            <a class="icon">{{ $t('lang.page.link-all.mark.read') }}</a>
          </template>
        </el-popconfirm>
        <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onMarkLink(false)">
          <template #reference>
            <a class="icon">{{ $t('lang.page.link-all.mark.unread') }}</a>
          </template>
        </el-popconfirm>
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
        @active-tag="val => (state.search.keyword = val)"
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
import { linkPagination } from '@/api/index';
import { markReadState } from '@/api/index';
import Pager from './components/pager.vue';
import Link from './components/link.vue';
import SearchOpt from './components/search.vue';
import { router } from '@/router';
import { PopTip } from '@/utils/tip';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const state = reactive({
  links: [],
  search: {
    page: 1,
    keyword: '',
    count: 0,
    size: 20,
    read: '0',
  },
  loading: false,
});

watch(
  () => router.currentRoute.value.query.keyword,
  val => {
    state.search.keyword = val;
  }
);
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
  state.loading = true;
  linkPagination({ ...state.search })
    .then(res => {
      const {
        status,
        data: { links, search },
      } = res.data;
      if (!status) {
        throw new Error(t('lang.message.faield.get'));
      }
      state.links.length = 0;
      state.links.push(...links);
      state.search.count = search.count;
      state.search.page = search.page;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => (state.loading = false));
}

function onRead(link) {
  const tLink = state.links.find(item => item.id == link.id);
  tLink.read = true;
  if (state.search.read == '2') {
    loadLinks();
  }
}
function onUnread(link) {
  const tLink = state.links.find(item => item.id == link.id);
  tLink.read = false;
  if (state.search.read == '1') {
    loadLinks();
  }
}

function onlinkDeleted(link) {
  const removeIdx = state.links.findIndex(item => item.id == link.id);
  if (removeIdx >= 0) {
    debugger;
    state.links.splice(removeIdx, 1);
  }
}

function onMarkLink(read) {
  markReadState(
    state.links.map(item => item.id),
    read
  )
    .then(res => {
      const { status, msg } = res.data;
      if (status) {
        loadLinks();
        PopTip.success(t('lang.message.success.update'));
      } else {
        PopTip.success(t('lang.message.failed.update'));
      }
    })
    .catch(err => {
      console.error(err);
    });
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
