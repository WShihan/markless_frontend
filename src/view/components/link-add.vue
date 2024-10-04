<template>
  <div class="link-add page" >
    <div class="form" v-loading="state.loading">
      <div class="form-item">
        <label for="url">
          链接
          <span style="color: red">*</span>
        </label>
        <input type="text" name="url" v-model="state.link.url" v-focus />
      </div>
      <div class="form-item">
        <details>
          <summary>其他信息</summary>
          <div class="form-item">
            <label for="desc">描述</label>
            <textarea name="desc" v-model="state.link.desc"></textarea>
          </div>
          <div class="form-item">
            <label for="read">已阅</label>
            <el-switch v-model="state.link.read"></el-switch>
          </div>
          <div class="form-item tags">
            <label for="标签">标签</label>
            <el-select
              v-model="state.selectedTags"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="选择标签"
              style="width: 100%; min-height: 4em"
            >
              <el-option v-for="(item, i) in state.tags" :key="i" :label="item" :value="item" />
            </el-select>
          </div>
        </details>
      </div>
      <div class="form-item">
        <button class="submit" :disabled="btnActive" @click.prevent="submit">添加</button>
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
        console.log(data);
        PopTip.success('添加成功');
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
.form {
  .form-item {
    display: flex;
    margin: 1em 0em;
    label {
      min-width: 4em;
    }
    details {
      flex: 1;
    }
    summary {
      cursor: pointer;
    }
  }
}
</style>
