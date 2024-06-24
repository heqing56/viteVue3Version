
const LAYOUT = () => import("@/layouts/index.vue");

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
export const staticRoutes = [
  {
    path: "/login",
    name: "login",
    meta: {
      isHide: true,
      title:'登录'
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: {
      isHide: true,
      title:'404'
    },
    component: () => import("@/views/error/index.vue"),
  },
  {
    path: "/",
    name: "LAYOUT",
    component: LAYOUT,
    redirect: "/index",
    meta: {
      title: "首页",
      icon: "HomeFilled",
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          affix: true,
        },
      },
      
    ],
  },
  {
    path: "/goods",
    name: "Goods",
    component: LAYOUT,
    redirect: "/putin",
    meta: {
      title: "商品管理",
      icon: "GoodsFilled",
    },
    children: [
      {
        path: "/putin",
        name: "Putin",
        component: () => import("@/views/goods/putin/index.vue"),
        meta: {
          title: "入库",
          icon: "CirclePlusFilled",
         
        },
      },
      {
        path: "/checkout",
        name: "Checkout",
        component: () => import("@/views/goods/checkout/index.vue"),
        meta: {
          title: "出库",
          icon: "RemoveFilled",
         
        },
      },
    ],
  },
  {
    path: "/customer",
    name: "Customer",
    component: LAYOUT,
    redirect: "/customer",
    meta: {
      title: "用户管理",
      icon: "Avatar ",
    },
    children: [
      {
        path: "/customer",
        name: "Customer",
        component: () => import("@/views/customer/index.vue"),
        meta: {
          title: "用户",
          icon: "Avatar",
         
        },
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    component: LAYOUT,
    redirect: "/user",
    meta: {
      title: "客户管理",
      icon: "UserFilled",
    },
    children: [
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/user/index.vue"),
        meta: {
          title: "客户",
          icon: "UserFilled",
         
        },
      },
    ],
  },
  // {
  //   path: "/:catchAll(.*)",
  //   meta: {
  //     isHide: true,
  //     title:'其它'
  //   },
  //   component: () => import("@/views/error/index.vue"), //这个是我自己的路径
  // },
];
