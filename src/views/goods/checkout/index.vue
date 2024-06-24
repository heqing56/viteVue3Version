<template>
        <Table :columns="formColumn" :form="form" :requestApi="goodsList" ></Table>
</template>

<script setup >
import { reactive, ref  } from 'vue'
import { goodsList } from '@/api/goods'
import Table from '@/components/Table/index.vue'


const goodsType = ref([
    {
        label: '食用类',
        value: 0
    },
    {
        label: '消耗类',
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
        label: '商品名称',
        search: {
            tag: 'input',
            placeholder: '输入名称'
        },
        isShow: false,
        rules: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        table:{
            width:'150'
        }
    },
    {
        prop: 'code',
        label: '商品编号',
        search: {
            tag: 'input',
            placeholder: '输入编号'
        },
        rules: [
            { required: true, message: '请输入编号', trigger: 'blur' },
            { pattern: /^[1-9]\d*$/, message: '编号必须是正整数', trigger: 'blur' },
            { min: 5, max: 8, message: '编号长度为5-8位', trigger: 'blur' },
        ]
    },
    {
        prop: 'type',
        label: '商品类型',
        search: {
            tag: 'select',
            placeholder: '选择类型'
        },
        option: goodsType.value,
        rules: [
            {
                required: true,
                message: '请选择商品类型',
                trigger: 'change',
            },
        ],
    },
    {
        prop: 'date',
        label: '出库日期',
        search: {
            tag: 'date-picker',
            placeholder: '选择日期',
            type: 'date',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD'
        },
        rules: [
            {
                type: 'date',
                required: true,
                message: '请选择出库日期',
                trigger: 'change',
            },
        ]
    },
]

</script>
