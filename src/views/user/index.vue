<template>
    <Table :columns="formColumn" :form="form" :requestApi="userList"></Table>
    <div v-html="markdownRendered"></div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { userList } from '@/api/user'
import Table from '@/components/Table/index.vue'


import {marked} from 'marked';
const dow= "### install \n```\n pnpm install \n```"
const markdownRendered = ref(marked(dow));
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
        label: '消费时间',
        search: {
            tag: 'date-picker',
            placeholder: '选择时间',
            type: 'datetime',
            format: 'YYYY-MM-DD hh:mm:ss',
            valueFormat: 'YYYY-MM-DD hh:mm:ss'
        },
        rules: [
            {
                type: 'date',
                required: true,
                message: '请选择消费时间',
                trigger: 'change',
            },
        ]
    },
]
</script>
