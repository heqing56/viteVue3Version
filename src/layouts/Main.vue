<template>
   <!-- <section class="app-mian-height"> -->
    <!-- <router-view v-slot="{ Component, route }" >
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
    <div class="app-mian-height">
      <router-view></router-view>

    </div>
  <!-- </section> -->
</template>

<style scoped lang="scss">
.app-mian-height {
  min-height:calc($base-app-main-height - 40px);
  position: relative;
  background-color: inherit;
}
</style>