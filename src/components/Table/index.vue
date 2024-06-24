<template>
    <!-- <SearchForm v-show="isShowSearch" :columns="columns" :form="form" :search="search" :reset="reset" /> -->
    <div class="table card">
        <div class="add">
            <el-button type="primary" @click="onAdd" v-if="btns.includes('Add')">新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;" v-loading="loading">
            <el-table-column fixed type="index" label="序号" width="80" />
            <template v-for="(item, index) in columns" :key="item">
                <el-table-column v-bind="item" :label="item.label" v-if="item.search?.tag == 'select'">
                        <template #default="scope">
                            <div>{{ getTypeLabel(item.option || [],scope.row.type) }}</div>
                        </template>
                </el-table-column>
                <el-table-column v-else :prop="item.prop" :label="item.label" :width="item.table?.width" />

            </template>
            <el-table-column fixed="right" label="操作" width="180"
                v-if="['View', 'Del', 'Edit'].some((value) => btns.includes(value))">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="viewClick(scope.row)"
                        v-if="btns.includes('View')">详情</el-button>
                    <el-button link type="primary" size="small" @click="editClick(scope.row, scope.$index)"
                        v-if="btns.includes('Edit')">编辑</el-button>
                    <el-popconfirm title="您确定要删除该数据吗?" @confirm='delClick(scope.$index)' v-if="btns.includes('Del')">
                        <template #reference>
                            <el-button link type="danger" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
            <!-- noData -->
            <template #empty>
                <div style="padding-top: 20px;">
                    <slot name="empty">
                        <img src="@/assets/images/notData.png" alt="noData" />
                        <div>暂无数据</div>
                    </slot>
                </div>
            </template>
        </el-table>
        <div class="page">
            <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 15, 20, 40]"
                :small="false" :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
    <el-dialog v-model="dialogVisible" :title="title" width="760px">
        <div v-if="dialogVisible">
            <el-form :disabled='disabled' ref="ruleFormRef" :inline="true" :model="formAdd"
                class="demo-form-inline card form">
                <el-form-item v-for="(item, index) in searchColumns" :prop="item.prop" :key="index" :label="item.label"
                    :rules='item.rules'>
                    <SearchFormItem :column="item" :form="formAdd" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addSave(ruleFormRef)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup name="ProTable">
import { ref, toRefs, reactive } from 'vue'
import { ElNotification } from 'element-plus'

import SearchForm from '../SearchForm/index.vue'
import SearchFormItem from '../SearchForm/SearchFormItem.vue'
import { useUsertore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
const userStore = useUsertore()
const { btns } = storeToRefs(userStore)
const props = defineProps(['columns','form','requestApi','callback'])

// ----------------------搜索-----------------------------
const isShowSearch = ref(true)
const reset = () => {
    const forms = toRefs(props.form)
    Object.keys(forms).forEach(key => forms[key].value = '')
    search()
}
const search = () => {
    if (loading.value) return
    current.value = 1
    init()
}

// ----------------------表格-----------------------------
const tableData = ref([])
const getTypeLabel = (arr,e)=> {
    if (e === null || e === undefined || e === '') return ''
    if (arr === null || arr === undefined || !arr.length) return ''
    return arr.find(item => item.value === e)?.label
}
const delClick = (e) => {
    tableData.value.splice(e, 1)
}
// ----------------------分页-----------------------------
const loading = ref(true)
const total = ref(100)
const current = ref(1)
const size = ref(10)
const handleSizeChange = (val) => {
    current.value = 1
    size.value = val
    init()
}
const handleCurrentChange = (val) => {
    current.value = val
    init()
}
// ----------------------弹框-----------------------------
const ruleFormRef = ref()
const searchColumns = props.columns.filter((item) => item.search?.tag)
const dialogVisible = ref(false)
const title = ref('新增出库')
const disabled = ref(false)
const formAdd = reactive({
    name: '',
    code: '',
    type: '',
    date: '',
})
const setForm = (e = {
    name: '',
    code: '',
    type: '',
    date: '',
}) => {
    formAdd.name = e.name
    formAdd.code = e.code
    formAdd.type = e.type
    formAdd.date = e.date
}
const onAdd = () => {
    title.value = '新增'
    disabled.value = false
    setForm()
    dialogVisible.value = true
}
const viewClick = (e) => {
    title.value = '详情'
    disabled.value = true
    setForm(e)
    dialogVisible.value = true
}
const editIndex = ref(null)
const editClick = (e, i) => {
    title.value = '编辑'
    disabled.value = false
    editIndex.value = i
    setForm(e)
    dialogVisible.value = true
}
const addSave = async (formEl) => {
    if (disabled.value) return dialogVisible.value = false
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            ElNotification({
                message: `${title.value}成功`,
                type: 'success',
            })
            if (editIndex.value === null) {
                tableData.value.unshift({ ...formAdd, id: '100' })
                tableData.value.pop()
            } else {
                tableData.value.splice(editIndex.value, 1, { ...formAdd, id: '100' })
            }
            dialogVisible.value = false
            editIndex.value = null
        }
    })
}
// ----------------------其它-----------------------------
const init = async () => {
    try {
        loading.value = true
        const res = await props.requestApi(props.form)
        tableData.value = res.data
        // total.value = res.data.length
        loading.value = false
    } catch {
        loading.value = false

    }
}

init()

defineExpose({
    search
})

</script>

<style lang="scss" scoped>
.table {
    background-color: #fff;
    padding: 20px;

    .add {
        text-align: right;
        margin-bottom: 10px;
    }

    .page {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>