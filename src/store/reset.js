

import { useTokenStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'

export function RESEETSTORE() {
  const tokenStore = useTokenStore()
  const { token } = storeToRefs(tokenStore)
  token.value=''
  // 清除用户信息缓存
  localStorage.removeItem('loginStore')
}