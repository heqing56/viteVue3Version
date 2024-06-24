
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useLoginStore = defineStore(
  "loginStore",
  () => {
    const state = reactive({
      userName: '',
      password: '',
    });
    return {
      ...toRefs(state),
    };
  },
  {
    persist: true, //持久化
  }
);

export const useTokenStore = defineStore(
  "tokenStore",
  () => {
    const state = reactive({
      token: '',
    });
    return {
      ...toRefs(state),
    };
  },
  {
    persist: true, //持久化
  }
);

export const useUsertore = defineStore(
  "userStore",
  () => {
    const state = reactive({
      userId: "",
      name: "",
      avatar: "",
      btns:[]
    });
    return {
      ...toRefs(state),
    };
  },
  {
    persist: true, //持久化
  }
);
