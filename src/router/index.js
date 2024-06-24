import { createRouter, createWebHistory } from "vue-router";
import { staticRoutes } from "./constRoutes";
const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
