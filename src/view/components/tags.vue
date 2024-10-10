<template>
  <div class="link-add page">
    <div class="form">
      <div class="form-item">
        <details open v-loading="state.loading.add">
          <summary>{{ $t('lang.page.tags.add.summary') }}</summary>
          <div class="form-item">
            <textarea
              name="url"
              v-model="state.createdTag"
              v-focus
              style="min-height: 3em"
              :placeholder="$t('lang.page.tags.add.placeholder')"
            ></textarea>
          </div>
          <div class="form-item">
            <button class="submit" :disabled="btnActive" @click.prevent="onAddTag">
              {{ $t('lang.submit.add') }}
            </button>
          </div>
        </details>
      </div>
      <div class="form-item">
        <details open v-loading="state.loading.tagAll">
          <summary>{{ $t('lang.page.tags.manage.summary') }}</summary>
          <div class="form-item">
            <span class="center">{{ $t('lang.page.tags.manage.placeholder.selectTag') }}</span>
          </div>
          <div class="form-item">
            <el-select
              v-model="state.activeTag"
              :placeholder="$t('lang.page.tags.manage.placeholder.selectTag')"
              @change="val => (state.activeTag = val)"
            >
              <el-option
                v-for="(item, i) in state.tags"
                :key="i"
                selected
                :label="`#${item}`"
                :value="item"
              />
            </el-select>
            <el-popconfirm :title="$t('lang.confirm.delete')" @confirm="onTagDelete">
              <template #reference>
                <button class="submit danger" style="width: 5em">
                  {{ $t('lang.submit.delete') }}
                </button>
              </template>
            </el-popconfirm>
          </div>
          <div class="form-item">
            <span class="center">{{ $t('lang.page.tags.manage.tip') }}</span>
          </div>
          <div class="form-item">
            <el-select
              v-model="state.appliedLinks"
              multiple
              collapse-tags
              :placeholder="$t('lang.page.tags.manage.placeholder.appliedTag')"
            >
              <el-option
                v-for="(item, i) in state.links"
                :label="item.title.slice(0, 40)"
                :value="item.id"
                style="max-width: var(--base-width)"
              />
            </el-select>
            <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onAttachLink">
              <template #reference>
                <button class="submit" style="width: 5em">{{ $t('lang.submit.update') }}</button>
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
import { tagDel } from '@/api';
import { tagAll } from '@/api';
import { tagAdd } from '@/api';
import { linkAll } from '@/api';
import { attachLink } from '@/api';
import { tagRelatedLinks } from '@/api';
import { PopTip } from '@/utils/tip';
import { onBeforeMount } from 'vue';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import bus from 'vue3-eventbus'

const { t } = useI18n();
const state = reactive({
  createdTag: '',
  tags: [],
  activeTag: [],
  appliedLinks: [],
  links: [],
  loading: {
    add: false,
    tagAll: false,
  },
});

watch(
  () => state.activeTag,
  () => {
    onLoadRelatedLinks();
  }
);
const btnActive = computed(() => {
  return state.createdTag == '';
});

onBeforeMount(() => {
  onLoadTags();
  linkAll().then(res => {
    const { status, data } = res.data;
    if (status) {
      if (data) {
        state.links.length = 0;
        state.links.push(
          ...data.map(item => {
            return { id: item.id, title: item.title };
          })
        );
      }
    }
  });
});

function onLoadTags() {
  tagAll()
    .then(res => {
      const { status, data } = res.data;
      if (status) {
        if (data) {
          state.tags.length = 0;
          state.tags.push(...data.map(item => item.name));
          state.activeTag = state.tags[0];
        }
      }
    })
    .catch(err => {
      PopTip.error(err);
      console.log(err);
    });
}

function onTagDelete() {
  tagDel({ name: state.activeTag }).then(res => {
    const { status, msg } = res.data;
    if (status) {
      const idx = state.tags.findIndex(item => item == state.activeTag);
      if (idx >= 0) {
        state.tags.splice(idx, 1);
        state.activeTag = '';
      }
      bus.emit('tags-update');
      PopTip.success(t('lang.message.success.delete'));
    } else {
      PopTip.info(msg);
    }
  });
}

function onAddTag() {
  if (state.createdTag == '') return;
  state.loading.add = true;
  tagAdd({ names: state.createdTag.split('&') })
    .then(res => {
      const { status, msg } = res.data;
      if (status) {
        PopTip.success(t('lang.message.success.add'));
        state.createdTag = '';
        bus.emit('tags-update');
        onLoadTags();
      } else {
        PopTip.info(msg);
      }
    })
    .catch(err => {
      PopTip.error(err);
      console.log(err);
    })
    .finally(() => (state.loading.add = false));
}

function onLoadRelatedLinks() {
  if (state.activeTag == '') return;
  state.loading.tagAll = true;
  tagRelatedLinks({ name: state.activeTag })
    .then(res => {
      const { status, msg, data } = res.data;
      if (status) {
        if (data) {
          state.appliedLinks.length = 0;
          state.appliedLinks.push(...data.map(item => item.id));
        }
      } else {
        PopTip.info(msg);
      }
    })
    .finally(() => (state.loading.tagAll = false));
}

function onAttachLink() {
  attachLink({ tag: state.activeTag, links: state.appliedLinks })
    .then(res => {
      const { status, msg } = res.data;
      if (status) {
        bus.emit('tags-update');
        PopTip.success(t('lang.message.success.update'));
      } else {
        throw msg;
      }
    })
    .catch(err => {
      PopTip.warning(err);
    });
}
</script>

<style scoped lang="scss">
:deep(.el-select) {
  .el-select__popper {
    width: var(--base-width) !important;
    overflow: hidden;
    background: transparent !important;
  }
}
</style>
