<template>
    <div class='content'>
        <Table ref="tableRef" :columns="formColumn" :form="form" :requestApi="userList"></Table>
    </div>
    <div class="tree card " :class="{ 'is-collapse': collapse }">
        <el-tree highlight-current style="max-width: 600px" :data="data" :props="defaultProps"
            @node-click="handleNodeClick" />
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { userList } from '@/api/user'
import { useSettingStore } from "@/store/modules/setting";
import { storeToRefs } from 'pinia'
import Table from '@/components/Table/index.vue'

const settingStore = useSettingStore()
const { collapse } = storeToRefs(settingStore)


// ----------------------组织机构-----------------------------


const data = [
    {
        label: '成都总公司',
        children: [
            {
                label: '研发部',
            },
            {
                label: '市场部',
            },
            {
                label: '财务部',
            },
        ],
    },
    {
        label: '深圳分公司',
        children: [
            {
                label: '研发部',
            },
            {
                label: '市场部',
            },
            {
                label: '财务部',
            },
        ],
    },
]
const defaultProps = {
    children: 'children',
    label: 'label',
}
const handleNodeClick = (data) => {
    tableRef.value.search()
}

// ----------------------表格-----------------------------
const tableRef = ref()
const goodsType = ref([
    {
        label: '普通用户',
        value: 0
    },
    {
        label: '管理员',
        value: 1
    },
])
const form = reactive({
    name: '',
    code: '',
    type: '',
    date: '',
})
const formColumn = [
    {
        prop: 'name',
        label: '用户名称',
        search: {
            tag: 'input',
            placeholder: '输入用户名称'
        },
        isShow: false,
        rules: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        table: {
            width: '150'
        }
    },
    {
        prop: 'code',
        label: '联系方式',
        search: {
            tag: 'input',
            placeholder: '输入联系方式'
        },
        rules: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { pattern: /^[1-9]\d*$/, message: '联系方式必须是正整数', trigger: 'blur' },
            { min: 11, max: 11, message: '联系方式长度为11位', trigger: 'blur' },
        ]
    },
    {
        prop: 'type',
        label: '用户类型',
        search: {
            tag: 'select',
            placeholder: '选择用户类型'
        },
        option: goodsType.value,
        rules: [
            {
                required: true,
                message: '请选择用户类型',
                trigger: 'change',
            },
        ],
    },
    {
        prop: 'date',
        label: '注册时间',
        search: {
            tag: 'date-picker',
            placeholder: '选择注册时间',
            type: 'datetime',
            format: 'YYYY-MM-DD hh:mm:ss',
            valueFormat: 'YYYY-MM-DD hh:mm:ss'
        },
        rules: [
            {
                type: 'date',
                required: true,
                message: '请选择注册时间',
                trigger: 'change',
            },
        ]
    },
]

</script>
<style lang="scss" scoped>
.content {
    margin-left: 220px;
}

.tree {
    padding: 20px;
    position: fixed;
    z-index: 1;
    width: 200px;
    top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height} + 20px);
    left: calc($base-left-menu-width + 20px);
    box-sizing: border-box;
    height:calc(#{$base-app-footer-height} + #{$base-app-main-height} - 20px);
    background-color: #fff;
    transition: left $base-transition-time;

    &.is-collapse {
        left: calc($base-left-menu-width-min + 20px);
    }
}
</style>