<script setup>

</script>

<template>
  <el-main class="image-main">
    <div class="top">
      <div v-for="i in 100" :key="i" class="item"> {{ i }}
      </div>
    </div>
    <div class="bottom">
      分页区域
    </div>
  </el-main>
</template>

<style scoped>
.image-main{
  position:relative;
}
.image-main .top{
  position:absolute;
  top :0;
  right:0;
  left:0;
  bottom:50px;
  overflow-y: auto;
}
.image-main .bottom{
  position:absolute;
  bottom:0;
  right:0;
  left:0;
  height:50px;
  @apply flex items-center justify-center;
}
</style>