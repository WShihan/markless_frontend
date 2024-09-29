<template>
  <div class="link-add page">
    <div class="form">
      <div class="form-item">
        <details open>
          <summary>添加标签</summary>
          <div class="form-item">
            <label for="url">
              链接
              <span style="color: red">*</span>
            </label>
            <textarea
              name="url"
              v-model="state.createdTag"
              v-focus
              style="min-height: 3em"
            ></textarea>
          </div>
          <div class="form-item">
            <button class="submit" :disabled="btnActive" @click.prevent="onAddTag">添加</button>
          </div>
        </details>
      </div>
      <div class="form-item">
        <details>
          <summary>标签管理</summary>
          <div class="form-item">
            <el-select
              v-model="state.activeTag"
              placeholder="选择标签"
              @change="val => (state.activeTag = val)"
            >
              <el-option
                v-for="(item, i) in state.tags"
                :key="i"
                selected
                :label="item"
                :value="item"
              />
            </el-select>
            <el-popconfirm title="确定删除吗" @confirm="onTagDelete">
              <template #reference>
                <button class="submit" style="width: 5em">删除</button>
              </template>
            </el-popconfirm>
          </div>
          <div class="form-item">
            <el-select
              v-model="state.appliedLinks"
              multiple
              collapse-tags
              placeholder="选择绑定的书签"
            >
              <el-option v-for="(item, i) in state.links" :label="item.title" :value="item.id" />
            </el-select>
            <el-popconfirm title="确定更新吗" @confirm="onAttachLink">
              <template #reference>
                <button class="submit" style="width: 5em" >
                  更新
                </button>
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

const state = reactive({
  createdTag: '',
  tags: [],
  activeTag: [],
  appliedLinks: [],
  links: [],
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
      PopTip.success('删除成功');
    } else {
      PopTip.info(msg);
    }
  });
}

function onAddTag() {
  if (state.createdTag == '') return;
  tagAdd({ names: state.createdTag.split('&') })
    .then(res => {
      const { status, msg } = res.data;
      if (status) {
        PopTip.success('添加成功');
        state.createdTag = '';
        onLoadTags();
      } else {
        PopTip.info(msg);
      }
    })
    .catch(err => {
      PopTip.error(err);
      console.log(err);
    });
}

function onLoadRelatedLinks() {
  if (state.activeTag == '') return;
  tagRelatedLinks({ name: state.activeTag }).then(res => {
    const { status, msg, data } = res.data;
    if (status) {
      if (data) {
        state.appliedLinks.length = 0;
        state.appliedLinks.push(...data.map(item => item.id));
      }
    } else {
      PopTip.info(msg);
    }
  });
}

function onAttachLink() {
  attachLink({ tag: state.activeTag, links: state.appliedLinks }).then(res => {
    const { status, msg } = res.data;
    if (status) {
      console.log(res.data.data);
    }
  });
}
</script>

<style scoped lang="scss">
.form {
  .form-item {
    display: flex;
    gap: 0.5em;
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
