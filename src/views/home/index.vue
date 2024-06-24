<template>
    <div class="home container">
      <el-card shadow="hover">
        <div class="page-header">
          <el-avatar :size="60" :src="avatar" />
          <div class="page-header-tip">
            <p class="page-header-tip-title">
              {{ timeFix() }}{{ name }}，{{ welcome() }}
            </p>
            <p class="page-header-tip-desc">
              {{ getEnvByName('VITE_APP_TITLE') }}
            </p>
          </div>
        </div>
      </el-card>
  
      <div class="welcome">
        <SvgIcon name="welcome" size="400px" />
      </div>
    </div>
  </template>
  
  <script setup >
  import { useUsertore } from '@/store/modules/user'
  import { timeFix, welcome } from '@/utils/index'
  import SvgIcon from '@/components/SvgIcon/index.vue'
  import { getEnvByName } from '@/utils/getEnv'
  const userStore = useUsertore()
  const {avatar,name} = userStore
  </script>
  
  <style scoped lang="scss">
  .home {
    height: 100%;
  
    .page-header {
      display: flex;
      align-items: center;
  
      .page-header-tip {
        flex: 1;
        margin-left: 20px;
      }
  
      .page-header-tip-title {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: 700;
        // color: #3c4a54;
      }
  
      .page-header-tip-desc {
        min-height: 20px;
        font-size: 14px;
        color: #808695;
      }
    }
  
    .welcome {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
  </style>
  