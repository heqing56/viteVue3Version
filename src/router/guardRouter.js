
import router from './index'
import NProgress from '@/config/nprogress'
import {useTokenStore} from '@/store/modules/user'
/**
 * 路由拦截
 */
console.log(router,)
router.beforeEach(async (to,from,next)=>{
    NProgress.start()

    const tokenStore=useTokenStore()
    const {token} =tokenStore
     // 1.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
    if (to.path === '/login') {
        if (token) return next(from.fullPath)
        return next()
      }
    // 2.判断是否有 Token，没有token跳转到登陆页面并且携带原目标路径
    if(!token){
        return next({ path: '/login',})
    }
    return next()
})
/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
    NProgress.done()
  })
  /**
 * @description 路由跳转错误
 * */
router.onError((error) => {
    NProgress.done()
    console.warn('路由错误', error.message)
  })