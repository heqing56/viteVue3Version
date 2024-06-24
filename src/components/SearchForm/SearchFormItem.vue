<template>
        <el-input v-if="column.search?.tag === 'input'" v-model="form[column.prop]" :placeholder="column.search?.placeholder" clearable />
        <el-select v-else-if="column.search?.tag === 'select'" v-model="form[column.prop]" :placeholder="column.search?.placeholder" clearable>
            <el-option v-for="(item, index) in column.option" :key="index" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker v-else-if="column.search?.tag === 'date-picker'" v-model="form[column.prop]" :format="column.search?.format" :value-format="column.search?.valueFormat" 
            :type="column.search?.type" :placeholder="column.search?.placeholder" clearable />
        <slot v-else></slot>
</template>
<script setup name="SearchFormItem">

const props = defineProps(['columns','form'])
// defineProps(['column','form'])
</script>
