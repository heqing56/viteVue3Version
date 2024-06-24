/*
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useMockOnAny } from '@/mock/mock'
import { loginInfoRes,userInfoRes ,userListRes,goodsListRes} from '@/mock/api/user/resInfo'

const mockOnAny = useMockOnAny()
// 登陆
mockOnAny('/admin/system/login', loginInfoRes)
// 退出登陆
mockOnAny('/admin/system/logout', {})
// 获取用户信息
mockOnAny('/admin/system/info', userInfoRes)

mockOnAny('/admin/goods/list', goodsListRes)
mockOnAny('/admin/user/list', userListRes)
