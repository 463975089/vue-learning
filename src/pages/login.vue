<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>
                    欢迎光临
                </div>
                <div>
                    此站点用来演示， 视频课程的演示地址
                </div>
            </div>

        </el-col>
        <el-col :lg="8" :md="12" class="right bg-light-50 flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
            <div class="right my-5 text-gray-300 space-x-2">
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="ruleFormRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input class="pt-2 " v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="pt-2 " type="password" v-model="form.password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-[250px]" round color="#626aef" type="primary" :loading="loading" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive ,onMounted, onUnmounted } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '~/api/manager'
import { setToken } from '~/composables/auth'
import { useRouter } from 'vue-router' 
import { toast } from '~/composables/util'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
// do not use same name with ref
const form = reactive({
    username: '',
    password: '',
})
const ruleFormRef = ref(null)
const loading = ref(false)
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const onSubmit = () => {
    console.log('submit!')
    ruleFormRef.value.validate((valid) => {
        loading.value = true
        if (valid) {
            login(form.username, form.password).then(res => {
                toast('登录成功', 'success')
                setToken(res.token)
                router.push({ path: '/' })
            })
            .finally(() => {
                loading.value = false
            })
        } else {
            console.log('error submit!!')
        }
    })
}
// 键盘事件处理函数
const handleKeydown = (event) => {
    // 检查是否按下了回车键 (keyCode 13 或 key === 'Enter')
    if (event.key === 'Enter' || event.keyCode === 13) {
        // 执行登录
        onSubmit()
    }
}

// 组件挂载时添加事件监听
onMounted(() => {
    // 监听整个文档的键盘事件
    document.addEventListener('keydown', handleKeydown)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
    // 清理事件监听，防止内存泄漏
    document.removeEventListener('keydown', handleKeydown)
})
</script>


<style scope>
.login-container {
    @apply min-h-screen bg-blue-200;
}

.login-container .left,
.login-container .right {
    @apply flex items-center justify-center;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply text-gray-200 text-xl;
}

.line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>