<script setup>
import { ElemeFilled, Fold, Refresh, FullScreen,ArrowDown } from '@element-plus/icons-vue'

</script>

<template>
    <div class="header">
      <span class="logo">
        <el-icon class="mr-1"><ElemeFilled /></el-icon>
        帝莎编程
      </span>
      <el-icon class="icon-btn"><Fold /></el-icon>
      <el-icon class="icon-btn"><Refresh /></el-icon>
      <div class="ml-auto flex items-center">
        <el-icon class="icon-btn mr-2"><FullScreen /></el-icon>
        <el-dropdown>
          <span class="dropdown">
            <el-avatar class="mr-1" :size="size" :src='$store.state.user.avatar'/>
            {{ $store.state.user.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
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
.icon-btn{
  @apply flex justify-center items-center;
  width: 40px;
  height: 60px;
}
.icon-btn:hover{
  @apply bg-blue-400;
}
.dropdown{
  cursor: pointer;
  @apply flex items-center el-dropdown-link text-light-50
}
</style>