<template>
  <div class="container">
    <Header />
    <TagDock />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          v-if="$route.meta.cache"
          :key="$route.path"
        />
      </keep-alive>
    </router-view>
 
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="!$route.meta.cache" :key="$route.path" />
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
