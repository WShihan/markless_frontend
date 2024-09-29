<template>
  <div class="pager">
    <el-pagination
      @prev-click="$emit('prev')"
      @next-click="$emit('next')"
      @current-change="n => $emit('change', n)"
      size="small"
      background
      layout="prev, pager, next"
      :total="pageInfo.count"
      :page-size="pageInfo.size"

      class="mt-4"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  pageInfo: {
    type: Object,
    default: () => {
      return {
        count: 33,
        size: 20,
      };
    },
  },
});


defineEmits(['prev', 'next', 'change']);
</script>

<style scoped lang="scss">
.pager {
  display: flex;
  justify-content: center;
  margin: 3em 0em 1em 0em;
  :deep(.el-pagination) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
