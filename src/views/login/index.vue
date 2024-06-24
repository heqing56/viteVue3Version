<template>
    <div class="login-container">
        <el-alert v-show="false" :title="getEnvByName('VITE_APP_TITLE')" type="success" :closable="false"
            style="position: fixed"></el-alert>
        <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
                <div style="color: transparent">左侧区域占位符</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="login-form">
                    <div class="form-header">
                        <div class="title">hello !</div>
                        <div class="title-tips">
                            欢迎来到{{ getEnvByName('VITE_APP_TITLE') }}！
                        </div>
                    </div>
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" :prefix-icon="User" autocomplete="off"
                            placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" type="password" show-password :prefix-icon="Lock"
                            autocomplete="off" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-btn" type="primary" size="large" :loading="loading"
                            @click="submitForm(ruleFormRef)">
                            登陆
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup >
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTokenStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'

import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { HOME_URL } from '@/config/config'
import { timeFix } from '@/utils/index'
import { login,getUserInfo } from '@/api/system'
import { getEnvByName } from '@/utils/getEnv'
const router = useRouter()
const route = useRoute()
const ruleFormRef = ref()
const tokenStore = useTokenStore()
const { token } = storeToRefs(tokenStore)
const ruleForm = reactive({
    username: 'admin',
    password: '111111',
})
const loading = ref(false)
const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('用户名不能为空'))
    } else if (value.length < 4) {
        callback(new Error('用户名长度不能小于4位'))
    } else {
        callback()
    }
}

const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
    } else {
        callback()
    }
}

const rules = reactive({
    username: [{ required: true, validator: validateUsername }],
    password: [{ required: true, validator: validatePassword }],
})
import { useUsertore } from '@/store/modules/user'
const userStore = useUsertore()
const { avatar,name,userId,btns } = storeToRefs(userStore)

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (!valid) return
        try {
            loading.value = true
            const { data } = await login(ruleForm)
            token.value = data.token
            const res = await getUserInfo()
            avatar.value=res.data.avatar
            name.value=res.data.name
            userId.value=res.data.userId
            btns.value=res.data.btns
            router.replace(route.query.redirect || HOME_URL)
            ElNotification({
                title: `hi,${timeFix()}!`,
                message: `欢迎回来`,
                type: 'success',
            })
        } finally {
            loading.value = false
        }
    })
}
</script>

<style scoped lang="scss">
@import './index';
</style>