<template>

  <el-container>
    <el-header style="z-index: 1000;">
      <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-aside class="el-width" :width="$store.state.asideWidth">
        <FMenu></FMenu>
      </el-aside>
      <el-main class="main-container">
        <FTagList class="tag-list"></FTagList>
        <router-view v-slot="{ Component }">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from '~/layout/components/FHeader.vue'
import FMenu from '~/layout/components/FMenu.vue'
import FTagList from '~/layout/components/FTagList.vue'
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('activated')
})

onDeactivated(() => {
  console.log('deactivated')
})

</script>

<style>
.el-aside {
  transition: all 0.3s;
  z-index : 10;
  position: relative;
}
.main-container {
  position: relative;
  z-index: 1; /* 主内容区层级低于侧边栏 */
}

.tag-list {
  position: relative;
  z-index: 2; /* 标签栏层级高于主内容但低于侧边栏 */
}
.fade-enter-from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>