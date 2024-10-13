<template>
  <div class="link-add page">
    <div class="form">
      <div class="form-item">
        <details open>
          <summary>{{ $t('lang.page.link-archive.summary') }}</summary>
          <div class="form-item">
            <label for="desc">{{ $t('lang.page.link-archive.label.url') }}</label>
            <input class="disable" readonly name="desc" v-model="state.link.url" />
          </div>
          <div class="form-item">
            <label for="desc">{{ $t('lang.page.link-archive.label.title') }}</label>
            <input class="disable" readonly name="desc" v-model="state.link.title" />
          </div>
          <div class="form-item">
            <label for="desc">{{ $t('lang.page.link-archive.label.desc') }}</label>
            <textarea
              class="disable"
              readonly
              name="desc"
              v-model="state.link.desc"
              style="min-height: 7em"
            ></textarea>
          </div>
          <div class="form-item">
            <label for="tag">{{ $t('lang.page.link-archive.label.tag') }}</label>
            <span class="tag-v" v-for="(tag, i) in state.link.tags" :key="i">#{{ tag.name }}</span>
          </div>
          <div class="form-item">
            <el-popconfirm :title="$t('lang.confirm.update')" @confirm="onUpdateInfo">
              <template #reference>
                <button class="submit" :disabled="btnActive">
                  {{ state.link.archive ? $t('lang.submit.update') : $t('lang.submit.create') }}
                </button>
              </template>
            </el-popconfirm>
          </div>
        </details>
      </div>
    </div>
    <div
      v-if="state.link.archive"
      class="archive-content"
      v-html="state.link.archive.content"
    ></div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { computed } from 'vue';
import { linkOne } from '@/api';
import { linkUpdateArchive } from '@/api';
import { PopTip } from '@/utils/tip';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const state = reactive({
  link: {
    url: '',
    title: '',
    desc: '',
    tags: [],
    read: false,
  },
});

const btnActive = computed(() => {
  return state.link.url == '';
});

onBeforeMount(() => {
  loadLink();
});

function loadLink() {
  const id = route.query.id;
  if (!id) return;
  linkOne(id)
    .then(res => {
      if (res.data) {
        const { status, data, msg } = res.data;
        if (status) {
          Object.assign(state.link, data);
        } else {
          throw `${msg}`;
        }
      } else {
        throw t('lang.page.link-archive.tip.info-get-failed');
      }
    })
    .catch(err => {
      PopTip.warning(err);
    });
}

function onUpdateInfo() {
  linkUpdateArchive(state.link.id)
    .then(res => {
      if (res.data) {
        const { status, msg } = res.data;
        if (status) {
          PopTip.success(t('lang.message.success.update'));
          loadLink();
        } else throw msg;
      } else throw t('lang.message.failed.update');
    })
    .catch(err => {
      PopTip.warning(err);
      console.error(err);
    });
}
</script>

<style scoped lang="scss"></style>
