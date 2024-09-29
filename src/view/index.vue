<template>
  <div class="container">
    <Header />
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <Transition name="fade">
          <component :is="Component" :key="$route.name" />
        </Transition>
      </keep-alive>
      <Transition name="fade" v-else>
        <component :is="Component" :key="$route.name" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
import Header from './components/header.vue';
import LinkAll from './components/link-all/index.vue';
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
