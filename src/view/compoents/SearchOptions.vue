<template>
  <div class="search">
    <input
      id="keyword"
      type="text"
      value=""
      placeholder="搜索"
      v-model="state.keywordValue"
      @input="onInput"
      @keyup="keyUp"
    />
    <button id="link-filter-btn" class="submit" type="submit" @click="$emit('submit')">
      <svg
        t="1726445320394"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="980"
        width="200"
        height="200"
      >
        <path
          d="M426.666667 853.333333C191.146667 853.333333 0 662.442667 0 426.666667S191.146667 0 426.666667 0s426.666667 190.890667 426.666666 426.666667-191.146667 426.666667-426.666666 426.666666z m-4.053334-89.386666a341.333333 341.333333 0 1 0 0-682.666667 341.333333 341.333333 0 0 0 0 682.666667z"
          fill="#e6e6e6"
          p-id="981"
        ></path>
        <path
          d="M695.168 755.498667a42.666667 42.666667 0 0 1 60.330667-60.330667l256 256a42.666667 42.666667 0 0 1-60.330667 60.330667l-256-256z"
          fill="#e6e6e6"
          p-id="982"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
import { reactive } from 'vue';

const props = defineProps({
  keyword: {
    default: () => '',
    type: String,
  },
});
const state = reactive({
  keywordValue: props.keyword,
});
const emit = defineEmits(['update:keyword', 'change', 'submit']);

function onInput() {
  emit('update:keyword', state.keywordValue);
  emit('change', state.keywordValue);
}
function keyUp(evt) {
  if (evt.keyCode === 13) {
    emit('submit');
  }
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  gap: 1em;
  margin: 1em 0em;
  input {
    flex: 1;
  }
  button {
    width: 4em;
  }

  svg {
    width: 1em;
    height: 1em;
    margin: 0px auto;
    path {
      fill: #fff !important;
    }
  }
}
</style>
