<template>
  <div class="link-add page">
    <div class="form">
      <div class="form-item">
        <details open>
          <summary>{{ $t('lang.page.link-edit.summary.info') }}</summary>
          <div class="form-item">
            <label for="desc">{{ $t('lang.page.link-edit.label.url') }}</label>
            <input name="desc" v-model="state.link.url" />
          </div>
          <div class="form-item">
            <label for="desc">{{ $t('lang.page.link-edit.label.title') }}</label>
            <input name="desc" v-model="state.link.title" />
          </div>
          <div class="form-item">
            <label for="desc">{{ $t('lang.page.link-edit.label.desc') }}</label>
            <textarea name="desc" v-model="state.link.desc" style="min-height: 7em"></textarea>
          </div>
          <div class="form-item">
            <label for="read">{{ $t('lang.page.link-edit.label.read') }}</label>
            <el-switch v-model="state.link.read"></el-switch>
          </div>
          <div class="form-item">
            <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onUpdateInfo">
              <template #reference>
                <button class="submit" :disabled="btnActive">{{ $t('lang.submit.update') }}</button>
              </template>
            </el-popconfirm>
          </div>
        </details>
      </div>
      <div class="form-item tags">
        <details>
          <summary>{{ $t('lang.page.link-edit.summary.tag') }}</summary>
          <div class="form-item">
            <label>{{ $t('lang.page.link-edit.label.tag') }}</label>
            <el-select
              v-model="state.selectedTags"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              :placeholder="$t('lang.page.link-edit.placeholder')"
              style="width: 100%; min-height: 4em"
            >
              <el-option v-for="(item, i) in state.tags" :key="i" :label="item" :value="item" />
            </el-select>
          </div>
          <div class="form-item">
            <el-popconfirm title="确定更新吗？" @confirm="onUpdateTags">
              <template #reference>
                <button class="submit">{{ $t('lang.submit.update') }}</button>
              </template>
            </el-popconfirm>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { computed } from 'vue';
import { attachLink, linkOne } from '@/api';
import { linkAttachTags } from '@/api';
import { tagAll } from '@/api';
import { linkUpdate } from '@/api';
import { PopTip } from '@/utils/tip';
import { onBeforeMount } from 'vue';
import router from '@/router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const state = reactive({
  link: {
    url: '',
    title: '',
    desc: '',
    tags: '',
    read: false,
  },
  tags: [],
  selectedTags: [],
});

const btnActive = computed(() => {
  return state.link.url == '';
});

onBeforeMount(() => {
  loadLink();
  tagAll().then(res => {
    const { status, data } = res.data;
    if (status) {
      if (data) {
        state.tags.push(...data.map(item => item.name));
      }
    }
  });
});

function loadLink() {
  const id = router.currentRoute.value.query.id;
  if (!id) return;
  linkOne(id)
    .then(res => {
      if (res.data) {
        const { status, data, msg } = res.data;
        if (status) {
          Object.assign(state.link, data);
          state.selectedTags.length = 0;
          state.selectedTags.push(...data.tags.map(item => item.name));
        } else {
          throw `${t('lang.message.error')}${msg}`;
        }
      } else {
        throw t('lang.page.link-edit.tip.link-info-get-failed');
      }
    })
    .catch(err => {
      PopTip.warning(err);
    });
}

function onUpdateInfo() {
  linkUpdate({
    id: state.link.id,
    url: state.link.url,
    title: state.link.title,
    desc: state.link.desc,
    read: state.link.read,
  })
    .then(res => {
      if (res.data) {
        const { status, msg } = res.data;
        if (status) {
          PopTip.success(t('lang.page.link-edit.tip.link-info-update-success'));
          loadLink();
        } else throw msg;
      } else throw t('lang.page.link-edit.tip.link-info-update-failed');
    })
    .catch(err => {
      PopTip.warning(err);
      console.error(err);
    });
}

function onUpdateTags() {
  linkAttachTags(state.link.id, state.selectedTags)
    .then(res => {
      if (res.data) {
        const { status, msg } = res.data;
        if (status) {
          PopTip.success(t('lang.page.link-edit.tip.link-tag-update-success'));
          loadLink();
        } else throw msg;
      } else throw t('lang.page.link-edit.tip.link-tag-update-failed');
    })
    .catch(err => {
      console.log(err);
      PopTip.warning(err);
    });
}
</script>

<style scoped lang="scss">

</style>
