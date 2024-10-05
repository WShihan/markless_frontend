<template>
  <div class="link-add page" >
    <div class="form" v-loading="state.loading">
      <div class="form-item">
        <label for="url">
          {{ $t('lang.page.link-add.label.url') }}
          <span style="color: red">*</span>
        </label>
        <input type="text" name="url" v-model="state.link.url" v-focus />
      </div>
      <div class="form-item">
        <details>
          <summary>{{ $t('lang.page.link-add.summary') }}</summary>
          <div class="form-item">
            <label for="desc"> {{ $t('lang.page.link-add.label.desc') }}</label>
            <textarea name="desc" v-model="state.link.desc"></textarea>
          </div>
          <div class="form-item">
            <label for="read"> {{ $t('lang.page.link-add.label.read') }}</label>
            <el-switch v-model="state.link.read"></el-switch>
          </div>
          <div class="form-item tags">
            <label > {{ $t('lang.page.link-add.label.tag') }}</label>
            <el-select
              v-model="state.selectedTags"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              :placeholder="$t('lang.page.link-add.placeholder')"
              style="width: 100%; min-height: 4em"
            >
              <el-option v-for="(item, i) in state.tags" :key="i" :label="item" :value="item" />
            </el-select>
          </div>
        </details>
      </div>
      <div class="form-item">
        <button class="submit" :disabled="btnActive" @click.prevent="submit">{{ $t('lang.submit.add') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { computed } from 'vue';
import { linkAdd } from '@/api';
import { tagAll } from '@/api';
import { PopTip } from '@/utils/tip';
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const state = reactive({
  link: {
    url: '',
    desc: '',
    tags: '',
    read: false,
  },
  tags: [],
  selectedTags: [],
  loading: false
});

const btnActive = computed(() => {
  return state.link.url == '';
});

onBeforeMount(() => {
  tagAll().then(res => {
    const { status, data } = res.data;
    if (status) {
      if (data) {
        state.tags.push(...data.map(item => item.name));
      }
    }
  });
});

function submit() {
  if (state.link.url == '') return;
  state.loading = true
  state.link.tags = state.selectedTags.join('&');
  linkAdd(state.link)
    .then(res => {
      const { status, data, msg } = res.data;
      if (status) {
        state.link.url = '';
        state.link.desc = '';
        state.link.read = false;
        state.selectedTags.length = 0;
        PopTip.success(t('lang.message.success.add'));
      } else {
        PopTip.info(msg);
      }
    })
    .catch(err => {
      PopTip.error(err);
    }).finally(() => state.loading = false);
}
</script>

<style scoped lang="scss">

</style>
