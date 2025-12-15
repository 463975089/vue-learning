<script setup>
import CountTo from './CountTo.vue'
defineProps({
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  },
  goods:{
    type: Array,
    default: () => []
  },
  orders:{
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-card class="mt-5">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">{{ title }}</span>
        <el-tag
            type="danger"
            effect="plain"
        >
          {{ tip }}
        </el-tag>
      </div>
    </template>
    <div class="flex justify-between">
      <el-card shadow="hover" v-for="(item,index) in goods" :key="index" class="bg-light-500">
        <div class="flex flex-col items-center justify-center" >
          <!-- 正确示例 -->
          <div class="text-xl font-bold mb-2">
            <CountTo :value="item.value" />
          </div>
          <span class="text-xs text-gray-500">{{item.label}}</span>
        </div>
      </el-card>
    </div>


    <div class="flex justify-between">
      <el-card shadow="hover" v-for="(item,index) in orders" :key="index" class="bg-light-500">
        <div class="flex flex-col items-center justify-center" >
          <!-- 正确示例 -->
          <div class="text-xl font-bold mb-2">
            <CountTo :value="item.value" />
          </div>
          <span class="text-xs text-gray-500">{{item.label}}</span>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<style scoped>

</style>