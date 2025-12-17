<script setup>
defineProps({
  active:{
    type:Boolean,
    default:false
  }
})
defineEmits(['edit','delete'])
</script>

<template>

  <div class="aside-list" :class="{'active':active}">
    <slot></slot>
    <el-button class="ml-auto px-1" text type="primary" size="small" @click="$emit('edit')">
      <el-icon :size="12"><Edit /></el-icon>
    </el-button>
    <el-button text class= "px-1"type="primary" size="small" @click="$emit('delete')">
      <el-icon :size="12"><Close /></el-icon>
    </el-button>
  </div>
</template>

<style scoped>
.aside-list{
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}
.aside-list:hover,.active{
  @apply bg-blue-100;
}
</style>