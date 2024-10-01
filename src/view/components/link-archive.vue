<template>
  <div class="link-add page">
    <div class="form">
      <div class="form-item">
        <details open>
          <summary>快照信息</summary>
          <div class="form-item">
            <label for="desc">链接</label>
            <input class="disable" readonly name="desc" v-model="state.link.url" />
          </div>
          <div class="form-item">
            <label for="desc">标题</label>
            <input class="disable" readonly name="desc" v-model="state.link.title" />
          </div>
          <div class="form-item">
            <label for="desc">描述</label>
            <textarea
              class="disable"
              readonly
              name="desc"
              v-model="state.link.desc"
              style="min-height: 7em"
            ></textarea>
          </div>
          <div class="form-item">
            <el-popconfirm title="确定更新吗？" @confirm="onUpdateInfo">
              <template #reference>
                <button class="submit" :disabled="btnActive">
                  {{ state.link.archive ? '更新' : '生成' }}
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
import { linkOne } from '@/api';
import { linkUpdateArchive } from '@/api';
import { PopTip } from '@/utils/tip';
import { onBeforeMount } from 'vue';
import router from '@/router';

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
  const id = router.currentRoute.value.query.id;
  if (!id) return;
  linkOne(id)
    .then(res => {
      if (res.data) {
        const { status, data, msg } = res.data;
        if (status) {
          Object.assign(state.link, data);
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
  linkUpdateArchive(state.link.id)
    .then(res => {
      if (res.data) {
        const { status, msg } = res.data;
        if (status) {
          PopTip.success('更新成功');
          loadLink();
        } else throw '更新失败：' + msg;
      } else throw '更新失败';
    })
    .catch(err => {
      PopTip.warning(err);
      console.error(err);
    });
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
