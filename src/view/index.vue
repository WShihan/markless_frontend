<template>
  <div class="container">
    <Header />
    <linkAll />
  </div>
</template>

<script setup>
import Header from './compoents/header.vue';
import LinkAll from './compoents/link-all/index.vue';
function say(params) {
  alert(params);
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: $--base-width;
  min-height: 100vh;
  margin: 0px auto;
  font-size: $--font-size;
  color: $--font-color;
  padding: 0.5em;
  box-sizing: border-box;
  // background-color: $--base-color;
}
</style>
