<template>
  <el-form :inline="true" :model="form" v-if="columns.length" class="demo-form-inline card table-search">
    <el-form-item v-for="(item, index) in searchColumns" :key="index" :label="item.label" >
      <SearchFormItem :column="item" :form="form" />
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup name="SearchForm">
import SearchFormItem from './SearchFormItem.vue'


const props = defineProps(['columns','form'])
const searchColumns = props.columns.filter((item) => item.search?.tag)

</script>

<style scoped lang="scss">
.table-search {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>