<template>
    <div class="layout-footer-container">
      Copyright <SvgIcon name="copyright" size="16px" color="rgba(0, 0, 0, 0.45)" /> 2024
    </div>
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue'

</script>

<style scoped lang="scss">
.layout-footer-container{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: $base-app-footer-height;
  padding: 0 20px;
  color: rgb(0 0 0 / 45%);
  background: var(--el-color-white);
  border-top: 1px dashed #dcdfe6;
  position:relative;
  z-index:2;
}
</style>