import { useSettingStore } from '@/store/modules/setting'
import { DEFAULT_PRIMARY } from '../config/config'
import { ElMessage } from 'element-plus'
import { getLightColor, getDarkColor } from '@/utils/color'
import { storeToRefs } from 'pinia'

export const useTheme = () => {
  const settingsStore = useSettingStore()
  const {themeConfig}=storeToRefs(settingsStore)
  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement
    if (themeConfig.value.isDark) body.setAttribute('class', 'dark')
    else body.setAttribute('class', '')
    changePrimary(themeConfig.value.primary)
  }

  // 修改主题颜色
  const changePrimary = (val) => {
    if (!val) {
      val = DEFAULT_PRIMARY
      ElMessage({
        type: 'success',
        message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`,
      })
    }
    themeConfig.value=({ ...themeConfig.value, primary: val })
    document.documentElement.style.setProperty(
      '--el-color-primary',
      themeConfig.value.primary,
    )

    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        themeConfig.value.isDark
          ? `${getDarkColor(themeConfig.value.primary, i / 10)}`
          : `${getLightColor(themeConfig.value.primary, i / 10)}`,
      )
    }
  }

  // 初始化主题
  const initTheme = () => {
    switchDark()
    // changePrimary(themeConfig.value.primary)
  }
  return {
    initTheme,
    switchDark,
    changePrimary,
  }
}
