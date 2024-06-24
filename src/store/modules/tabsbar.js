import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useTabsBarStore = defineStore(
  "tabsBarStore",
  () => {
    const state = reactive({
        activeTabsValue:'/index',
        cachedViews:[],
        visitedViews: [],
        // 处理之后侧边栏菜单列表
      authMenuList:[],
    });
    return {
      ...toRefs(state),
    };
  },
  {
    persist: true, //持久化
  }
);


