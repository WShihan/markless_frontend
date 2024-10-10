<template>
  <div class="container">
    <Header />
    <TagDock />
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
import Header from '@/view/components/header.vue';
import TagDock from '@/view/components/tag-dock.vue';
</script>

<style scoped lang="scss">

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: $--base-width;
  min-height: 100vh;
  margin: 0px auto;
  font-size: $--font-size;
  color: $--font-color;
  padding: 0.5em;
  box-sizing: border-box;
}
</style>
