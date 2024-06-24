<template>
  <div class="layout-sidebar-container" :class="{ 'is-collapse': collapse }">
    <div class="loggBox">
      <a href="/">
        <img class="logo" alt="logo" src="/logo.png" />
        <h1 class="title" v-if="!collapse">
          {{ '指爱美' }}
        </h1>
      </a>
    </div>
    <el-scrollbar>
      <el-menu background-color="#001529" text-color="hsla(0,0%,100%,.65)" active-text-color="#fff"
        :defaultActive="activeMenu" :collapse="collapse" :unique-opened="true">
        <sub-menu :menuList="menuList"></sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSettingStore } from "@/store/modules/setting";
import {useTabsBarStore} from '@/store/modules/tabsbar'
import SubMenu from './SubMenu.vue'
const tabsBarStore=useTabsBarStore()
const settingStore = useSettingStore()
const { authMenuList } = storeToRefs(tabsBarStore)
const { collapse } = storeToRefs(settingStore)
const route = useRoute()
const activeMenu = computed(() => route.meta.activeMenu ? route.meta.activeMenu  : route.path,)
const menuList = ref([
  {
    name: "LAYOUT",
    path: "/",
    meta: {
      icon: "HomeFilled",
      title: "首页"
    },
    redirect: "/index",
    children: [
      {
        name: "Index",
        path: "/index",
        meta: {
          affix: true,
          icon: "HomeFilled",
          title: "首页",
        },
      }
    ]
  },
  {
    name: "Goods",
    path: "/goods",
    meta: {
      icon: "GoodsFilled",
      title: "商品管理",
    },
    redirect: "/putin",
    children: [
      {
        name: "Putin",
        path: "/putin",
        meta: {
          icon: "CirclePlusFilled",
          title: "入库",
       

        },
      },
      {
        name: "Checkout",
        path: "/checkout",
        meta: {
          icon: "RemoveFilled",
          title: "出库",
       
        },
      },
    ]
  },
  {
    name: "User",
    path: "/user",
    meta: {
      icon: "UserFilled",
      title: "客户管理",
      
    },
    children: [
      {
        name: "User",
        path: "/user",
        meta: {
          icon: "UserFilled",
          title: "客户列表",
       
        },
      },
      
    ]
  },
  {
    name: "Customer",
    path: "/customer",
    meta: {
      icon: "Avatar",
      title: "用户管理"
    },
    children: [
      {
        name: "Customer",
        path: "/customer",
        meta: {
          icon: "Avatar",
          title: "用户列表",
       
        },
      },
      
    ]
  },
])
authMenuList.value=menuList.value
</script>

<style scoped lang="scss">
@mixin active {
  &:hover {
    color: $base-color-white;
  }

  &.is-active {
    color: $base-color-white;
    background-color: var(--el-color-primary) !important;
  }
}

.layout-sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: $base-z-index;
  width: $base-left-menu-width;
  height: 100vh;
  background: $base-menu-background;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  transition: width $base-transition-time;

  &.is-collapse {
    width: $base-left-menu-width-min;
    border-right: 0;
  }

  .loggBox {
    position: relative;
    display: flex;
    justify-content: flex-start;

    // padding-left: 24px;
    height: 60px;
    overflow: hidden;
    line-height: 60px;
    background: transparent;

    .title {
      display: inline-block;
      margin-left: 12px;
      font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      vertical-align: middle;
    }

    .logo {
      display: inline-block;
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-left: 16px;
    }
  }

}

:deep(.el-scrollbar__wrap) {
    overflow-x: hidden;

    .el-menu {
      border: 0;
    }

    .el-menu-item,
    .el-submenu__title {
      height: $base-menu-item-height;
      overflow: hidden;
      line-height: $base-menu-item-height;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    .el-menu-item {
      @include active;
    }
  }
</style>