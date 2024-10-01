<template>
  <div class="link-add page">
    <div class="form">
      <div class="form-item">
        <details open>
          <summary>书签信息</summary>
          <div class="form-item">
            <label for="desc">链接</label>
            <input name="desc" v-model="state.link.url" />
          </div>
          <div class="form-item">
            <label for="desc">标题</label>
            <input name="desc" v-model="state.link.title" />
          </div>
          <div class="form-item">
            <label for="desc">描述</label>
            <textarea name="desc" v-model="state.link.desc" style="min-height: 7em"></textarea>
          </div>
          <div class="form-item">
            <label for="read">阅读</label>
            <el-switch v-model="state.link.read"></el-switch>
          </div>
          <div class="form-item">
            <el-popconfirm title="确定更新吗？" @confirm="onUpdateInfo">
              <template #reference>
                <button class="submit" :disabled="btnActive">更新信息</button>
              </template>
            </el-popconfirm>
          </div>
        </details>
      </div>
      <div class="form-item tags">
        <details>
          <summary>标签</summary>
          <div class="form-item">
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
          <div class="form-item">
            <el-popconfirm title="确定更新吗？" @confirm="onUpdateTags">
              <template #reference>
                <button class="submit">更新标签</button>
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
          throw `获取书签信息失败：${msg}`;
        }
      } else {
        throw '获取书签信息失败';
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
          PopTip.success('修改成功');
          loadLink();
        } else throw '修改失败：' + msg;
      } else throw '修改失败';
    })
    .catch(err => {
      PopTip.warning(err);
      console.error(err);
    });
}

function onUpdateTags(){
    linkAttachTags(state.link.id, state.selectedTags).then(res =>{
        if(res.data){
            const {status, msg} = res.data
            if(status){
                PopTip.success('更新成功')
                loadLink();
            } else throw('更新失败：' + msg)
        } else throw('更新失败')
    }).catch(err =>{
        console.log(err)
        PopTip.warning(err)
    })
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
