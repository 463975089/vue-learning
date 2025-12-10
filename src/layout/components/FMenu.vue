
<template>
  <div class="f-menu" :style="{width: $store.state.asideWidth}"  >
    <el-menu :default-active="defaultActive" :unique-opened="true" class="border-0" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
      <template v-for="(item,index) in asideMenu" :key="index">
         <el-sub-menu v-if="item.child && item.child.length > 0 " :index="item.name">
            <template #title>
               <el-icon>
                  <component :is="item.icon" />
               </el-icon>
               <span>{{item.name}}</span>
            </template>
           <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
           <el-icon>
                <component :is="item2.icon" />
             </el-icon>
             <span>{{ item2.name }}</span>
         </el-menu-item>
         </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
                <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>

    </el-menu>
  </div>
</template>
<script setup>

import { useRouter } from "vue-router";
const router = useRouter();
import { computed, ref } from "vue";
import { useStore } from "vuex";
const defaultActive = ref(router.currentRoute.value.path);
const $store = useStore();
const isCollapse = computed(() => {
  return $store.state.asideWidth == '64px'
});
const asideMenu = computed(() => {
  return $store.state.menus
});

const handleSelect = (index) => {
  router.push(index)
}
</script>
<style scoped>
  .f-menu{
    transition:all 0.3s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply fixed shadow-md bg-light-50
  }
  .f-menu::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .f-menu::-webkit-scrollbar-thumb {
    background: transparent;
  }
</style>