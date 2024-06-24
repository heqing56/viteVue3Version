<template>
    <div class="nav-bar-container">
        <!-- <div @click="change">切换</div> -->
        <el-row :gutter="15">
            <el-col :sm="12" :md="12" :lg="12" :xl="12">
                <div class="left-panel">
                    <el-icon class="fold-unfold" @click="change">
                        <component :is="collapse ? 'Expand' : 'Fold'"></component>
                    </el-icon>
                    <Breadcrumb />
                </div>
            </el-col>

            <el-col :sm="12" :md="12" :lg="12" :xl="12">
                <div class="right-panel">
                    <!-- <div class="btn btns">
                        <el-tooltip content="刷新">
                        <el-button circle @click="">
                            <el-icon :size="16"><Refresh /></el-icon>
                        </el-button>
                        </el-tooltip>
                    </div> -->
                    <div class="m-screenful btns">
                        <el-tooltip
                        effect="dark"
                        :content="!isFullscreen ? '全屏' : '收起'"
                        placement="bottom"
                        >
                        <el-button circle @click="toggle">
                            <el-icon v-if="!isFullscreen"><FullScreen /></el-icon>
                            <el-icon v-else><CopyDocument /></el-icon>
                        </el-button>
                        </el-tooltip>
                    </div>
                    <div class="btn btns">
                        <el-tooltip effect="dark" content="系统设置">
                        <el-button circle @click="onSetting">
                            <el-icon><Setting /></el-icon>
                        </el-button>
                        </el-tooltip>
                    </div>
                    <el-dropdown @visible-change="onChange" @command="handleCommand">
                        <div class="avatar-dropdown">
                            <img class="user-avatar" :src="avatar" alt="" />
                            <div class="user-name">{{ name }}</div>
                            <el-icon class="up-down">
                                <component :is="visible ? 'ArrowUp' : 'ArrowDown'" />
                            </el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="logout">
                                    <SvgIcon name="logout" size="16px" />
                                    <span>退出登陆</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <el-drawer title="主题设置" v-model="drawerVisible" size="300px">
            <el-divider class="divider" content-position="center">全局主题</el-divider>
            <div class="theme-item">
            <span>主题颜色</span>
            <el-color-picker
                v-model="themeConfig.primary"
                :predefine="colorList"
                @change="changePrimary"
            />
            </div>
            <div class="theme-item">
            <span>暗黑模式</span>
            <el-switch
                v-model="themeConfig.isDark"
                @change="switchDark"
                inline-prompt
                :active-icon="Sunny"
                :inactive-icon="Moon"
            />
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from "../store/modules/setting";
import Breadcrumb from './components/Breadcrumb.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUsertore } from '@/store/modules/user'
import {RESEETSTORE} from '@/store/reset'
import { useTheme } from '../hooks/useTheme'
import { Sunny, Moon } from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
const { changePrimary,switchDark } = useTheme()
const userStore = useUsertore()

const { avatar,name,userId } = storeToRefs(userStore)

import { logout } from '@/api/system'
import { LOGIN_URL } from '@/config/config'
import { useRouter, useRoute } from 'vue-router'
const settingStore = useSettingStore()
const { collapse,themeConfig } = storeToRefs(settingStore)
const change = () => {
    collapse.value = !collapse.value

}

import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()

const visible = ref(false)
const onChange=(e)=>{
    visible.value = e
}
import { DEFAULT_PRIMARY } from '@/config/config'
// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  '#DAA96E',
  '#0C819F',
  '#722ed1',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6',
]
const drawerVisible = ref(false)
const onSetting=()=>{
    drawerVisible.value = true
}
const handleCommand=(e)=>{
    if (e === 'logout') {
        logoutFn()
      }
}
const router = useRouter()
const route = useRoute()
const logoutFn=()=>{
    ElMessageBox.confirm('您确定要退出吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await logout({roleId:userId.value})
        RESEETSTORE()
        router.push({ path: LOGIN_URL, query: { redirect: route.fullPath } })
        ElMessage.success('退出登录成功！')
      })
}
</script>

<style scoped lang="scss">
.nav-bar-container {
    position: relative;
    height: $base-nav-bar-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;
    
  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 60px;

    .fold-unfold {
      font-size: 18px;
      color: $base-color-gray;
      cursor: pointer;
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;
  }
}
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;
  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin: 0 6px;
    cursor: pointer;
  }
}
.btns{
    margin-right:12px;
}
.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0;
}
</style>