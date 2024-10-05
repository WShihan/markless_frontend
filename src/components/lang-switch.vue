<template>
  <div class="form-item">
    <label for="lang">{{ $t('lang.page.setting.label.lang') }}</label>
    <select v-model="state.langVal" @change="onChange">
      <option
        v-for="(item, i) in pros.langs"
        :label="$t(`lang.page.setting.label.lang-opt.${item}`)"
        :value="item"
        :key="i"
      ></option>
    </select>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
import { watch } from 'vue';

const pros = defineProps({
  langs: {
    type: Array,
    default: () => {
      return ['en', 'zh-CN', 'zh-TW'];
    },
  },
  lang: {
    type: String,
  },
});
const state = reactive({
  langVal: pros.lang,
});
const emit = defineEmits(['change', 'update:lang']);
watch(
  () => pros.lang,
  val => (state.langVal = val)
);
function onChange() {
  emit('update:lang', state.langVal);
  emit('change', state.langVal);
}
</script>

<style scoped lang="scss"></style>
