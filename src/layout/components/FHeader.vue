<script setup>
import { ElemeFilled, Fold, Refresh, FullScreen, ArrowDown, Aim } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { msgBox, toast } from '~/composables/util'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'
import { updatePassword } from '~/api/manager'
import FormDrawer from '~/components/FormDrawer.vue'

const drawer = ref(false)
const formDrawerRef = ref(null)
const { isFullscreen, enter, exit, toggle } = useFullscreen()
const store = useStore()
const router = useRouter()
const Logout = () => {
  msgBox('确认退出登录吗？', 'warning').then(() => {
    store.dispatch('handLogout').then(() => {
      router.push({ path: '/login' })
      toast('退出登录成功')
    })
  })
}

const onResh = () => {
  location.reload()
}

const onSubmit = () => {
  
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      formDrawerRef.value.ShowLoding()
      updatePassword(ruleForm).then(() => {
        toast('密码修改成功，请重新登录', 'success')
        formDrawerRef.value.close()
        store.dispatch('handLogout').then(() => {
          router.push({ path: '/login' })
        })
      })
        .finally(() => {
          formDrawerRef.value.HideLoding()
        })
    } else {
      console.log('error submit!!')
    }
  })
}
const handleCommand = (command) => {
  switch (command) {
    case 'logout':
      Logout()
      break
    case 'changePassword':
      formDrawerRef.value.open()
      break
  }
}

const ruleForm = reactive({
  oldpassword: '',
  password: '',
  repassword: '',
})

const rules = reactive({
  oldpassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
  ],
})
const ruleFormRef = ref(null)
</script>

<template>
  <div></div>
  <div class="header">
    <span class="logo">
      <el-icon class="mr-1">
        <ElemeFilled />
      </el-icon>
      帝莎编程
    </span>
    <el-icon class="icon-btn" @click="$store.commit('hnadleAsideWidth')">
      <Fold v-if="$store.state.asideWidth == '250px'"/>
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="top-start">
      <el-icon class="icon-btn" @click="onResh">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏切换" placement="top-start">
        <el-icon class="icon-btn mr-2" @click="toggle">
          <Aim v-if="isFullscreen" />
          <FullScreen v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown @command="handleCommand">
        <span class="dropdown">
          <el-avatar class="mr-1" :src='$store.state.user.avatar' />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="ruleForm.oldpassword" type="password" placeholder="请输入旧密码" />
      </el-form-item>

      <el-form-item label="新密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="请输入新密码" show-password/>
      </el-form-item>

      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="ruleForm.repassword" type="password" placeholder="请再次输入新密码" show-password />
      </el-form-item>
    </el-form>
  </form-drawer>

</template>

<style scoped>
.header {
  @apply flex items-center bg-blue-600 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 40px;
  height: 60px;
}

.icon-btn:hover {
  @apply bg-blue-400;
}

.dropdown {
  cursor: pointer;
  @apply flex items-center el-dropdown-link text-light-50
}

.drawer-footer {
  padding: 10px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}
</style>