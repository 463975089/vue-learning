<template>
  <div>
    后台首页 {{$store.state.user.username}}
    <el-button type="primary" @click="Logout">退出登录</el-button>
  </div>
</template>
<script setup>  
import { useRouter } from 'vue-router'
import { msgBox, toast } from '~/composables/util'
import { useStore } from 'vuex'
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
</script>