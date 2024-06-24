/*
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { constructMockData } from '@/mock/mock'
import Mock from "mockjs";
import { dayjs } from "element-plus";
// 登陆信息
export const loginInfoRes = constructMockData({
  token: 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ',
})

// 用户信息
export const userInfoRes = constructMockData({
  name: '汤妹妹',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  userId:'12345',
  btns:['Add','Edit','View','Del']
})

export const userListRes = () => {
  const data = Array.from({ length: 10 }).map((item, index) => {
    return {
      id: index + 1,
      name: "肖麒麟" + String(index + 1).padStart(3, "0"),
      code: Mock.Random.string("number", 6),
      type: Mock.Random.integer(0, 1),
      date: dayjs().format("YYYY-MM-DD"),
    };
  });
  return constructMockData(data);
};

export const goodsListRes = () => {
  const data = Array.from({ length: 10 }).map((item, index) => {
    return {
      id: index + 1,
      name: "洗面奶" + String(index + 1).padStart(3, "0"),
      code: Mock.Random.string("number", 6),
      type: Mock.Random.integer(0, 1),
      date: dayjs().format("YYYY-MM-DD"),
    };
  });
  return constructMockData(data);
};