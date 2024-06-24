<template>
  <div class="tabs-bar-container">
    <div class="tabs-content">
      <el-tabs type="card" v-model="activeTabsValue" @tab-click="tabClick" @tab-remove="removeTab">
        <template v-for="item in visitedViews" :key="item.path">
          <el-tab-pane v-if="item.meta?.isHide !== true" type="card" :path="item.path" :label="item.meta?.title"
            :name="item.path" :closable="!(item.meta && item.meta?.affix)">
            <template #label>
              <div >
                <el-icon size="16" class="tabs-icon" v-if="item.meta && item.meta?.icon">
                  <component :is="item.meta?.icon"></component>
                </el-icon>
                {{ item.meta?.title }}
              </div>
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <div class="tabs-action">
      <el-dropdown trigger="hover">
        <el-icon color="rgba(0, 0, 0, 0.65)" :size="20">
          <Menu />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeCurrentTab">
              <el-icon :size="14">
                <FolderRemove />
              </el-icon>
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item @click="closeOtherTab">
              <el-icon :size="14">
                <Close />
              </el-icon>
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item @click="closeAllTab">
              <el-icon :size="14">
                <FolderDelete />
              </el-icon>
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import path from 'path-browserify'
import { storeToRefs } from "pinia";
import { useTabsBarStore } from '@/store/modules/tabsbar'

const tabsBarStore = useTabsBarStore()
const { visitedViews, authMenuList, cachedViews, activeTabsValue } = storeToRefs(tabsBarStore)
const routes = computed(() => authMenuList.value)
const route = useRoute()
const router = useRouter()
let affixTags = ref([])

// 添加当前路由
const addTags = () => {
  const { name } = route
  if (name === 'Login') {
    return
  }
  if (name) {
    addView(route)
  }
  return false
}

const addView = (view) => {
  activeTabsValue.value = view.path
  if (visitedViews.value.some((v) => v.path === view.path) || !view.meta) return
  visitedViews.value.push({...view})  //拷贝
  if (view.meta.keepAlive && view.name) {
    cachedViews.value.push(view.name)
  }
}


const filterAffixTags = (list, basePath = '/') => {
  let tags = []
  if (!list.length) return tags
  list.forEach((route) => {
    if (route.meta && route.meta.affix) {
      // 获取 path
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

/**
 * @description: 拿到需要固定的路由表，添加进 store
 * @author: codeBo
 */
const initTags = () => {
  let routesNew = routes.value
  let affixTag = (affixTags.value = filterAffixTags(routesNew))
  for (const tag of affixTag) {
    if (tag.name) {
      addView(tag)
    }
  }
}

onMounted(() => {
  initTags()
  addTags()
})
watch(route, () => {
      addTags()
    })

// 删除以后切换到下一个
const toLastView = (activeTabPath) => {
  let index = visitedViews.value.findIndex(
    (item) => item.path === activeTabPath,
  )
  const nextTab =
    visitedViews.value[index + 1] || visitedViews.value[index - 1]
  if (!nextTab) return
  router.push(nextTab.path)
  addView(nextTab)
}

// 点击事件
const tabClick = (tabItem) => {
  let path = tabItem.props.name
  router.push(path)
}
const isActive = (path) => {
  return path === route.path
}
const removeTab = async (activeTabPath)=> {
  if (isActive(activeTabPath)) {
    toLastView(activeTabPath)
  }
  await delView(activeTabPath)
}
const delView = (activeTabPath) => {
  return new Promise((resolve) => {
    delVisitedView(activeTabPath)
    delCachedView(activeTabPath)
    resolve({
      visitedViews: [...visitedViews.value],
      cachedViews: [...cachedViews.value],
    })
  })
}
const delVisitedView = (path) => {
  return new Promise((resolve) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      if (!v.meta) return
      return v.path !== path || v.meta.affix
    })
    cachedViews.value = cachedViews.value.filter((v) => {
      return v.path !== path || v.meta.affix
    })
    resolve([...visitedViews.value])
  })
}

const delCachedView = (view) => {
  return new Promise((resolve) => {
    const index = cachedViews.value.indexOf(view.name)
    index > -1 && cachedViews.value.splice(index, 1)
    resolve([...cachedViews.value])
  })
}

// 按钮事件
const closeCurrentTab = () => {
  toLastView(route.path)
  delView(route.path)
}
const closeOtherTab = () => {
  const path = route.path
  visitedViews.value = visitedViews.value.filter((item) => {
    return item.path === path || (item.meta && item.meta.affix)
  })
  cachedViews.value = visitedViews.value.filter((item) => {
    return item.path === path || (item.meta && item.meta.affix)
  })
}
const closeAllTab = () => {
  visitedViews.value = visitedViews.value.filter(
    (v) => v.meta && v.meta.affix,
  )
  cachedViews.value = visitedViews.value.filter((v) => v.meta && v.meta.affix)
  activeTabsValue.value = '/index'
  router.push({ path: '/index' })
}

</script>

<style scoped lang="scss">
.tabs-action {
  padding-bottom: 5px;
  cursor: pointer;

  :deep(.el-icon) {
    transition: all 0.3s;
  }

  :deep(.el-icon):hover {
    color: $base-color-default;
    transition: all 0.3s;
    transform: rotate(90deg);
  }
}

.tabs-bar-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: flex-end;
  justify-content: space-between;
  height: $base-tabs-bar-height;
  padding-right: $base-padding;
  // padding-left: $base-padding;
  user-select: none;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;

  .tabs-content {
    width: calc(100% - 0px);
 
  }

  :deep(.el-tabs--card) {
    height: $base-tag-item-height;

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
    }

    .el-tabs__header {
      margin: 0;
      border-bottom: 0;
    }

    .el-tabs__nav {
      border: 0;
    }

    .tabs-icon {
      top: 3px;
      font-size: 15px;
    }

    .el-tabs__item {
      box-sizing: border-box;
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
      border: none;
      border-radius: $base-border-radius;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    }

    .el-tabs__item.is-active {
      background-color: #e8f4ff;
      -webkit-mask: url('@/assets/images/tabbar-bg.png');
      mask: url('@/assets/images/tabbar-bg.png');
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }

    .el-tabs__item:not(.is_active):hover {
      background-color: #f6f8f9;
      -webkit-mask: url('@/assets/images/tabbar-bg.png');
      mask: url('@/assets/images/tabbar-bg.png');
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
  }
}
</style>