<script setup>
const iconNavs = [
  {
    icon:"user",
    title:"用户",
    color:"text-light-blue-500",
    path:"/user/list"
  },
  {
    icon:"shopping-cart",
    title:"商品",
    color:"tet-violet-500",
    path:"/goods/list"
  },
  {
    icon:"tickets",
    title:"订单",
    color:"text-fuchsia-500",
    path:"/order/list"
  },
  {
    icon:"chat-dot-square",
    title:"评价",
    color:"text-teal-500",
    path:"/comment/list"
  },
  {
    icon:"picture",
    title:"图库",
    color:"text-rose-500",
    path:"/image/list"
  },
  {
    icon:"bell",
    title:"公告",
    color:"text-green-500",
    path:"/notice/list"
  },
  {
    icon:"set-up",
    title:"配置",
    color:"text-gray-500",
    path:"/setting/base"
  },
  {
    icon:"files",
    title:"优惠卷",
    color:"text-yellow-500",
    path:"/coupon/list"
  }
]
</script>

<template>
  <el-row :gutter="20" class="mt-5">
    <el-col :span="3" :offset="0" v-for="(item,index) in iconNavs" :key="index">
      <el-card shadow="hover" @click="$router.push(item.path)">
        <div class="flex flex-col items-center justify-center cursor-pointer">
             <el-icon :size="25" :class="item.color">
               <component :is="item.icon"></component>
             </el-icon>
             <span class="text-sm mt-2"> {{ item.title }} </span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>