<script setup>
import AsideList from './AsideList.vue'
import { getImageList } from '~/api/image'
import { ref } from 'vue'
const imageList = ref([])
const loading = ref(false)
const activeIndex = ref(0)
const total = ref(0)
const currentPage = ref(0)
const pageSize = ref(10)
function getdata(page){
  if (!page) {
    currentPage.value = 1
  } else {
    currentPage.value = page
  }
  loading.value = true
  getImageList(currentPage.value).then(res=>{
    imageList.value = res.list
    if (imageList.value.length > 0) {
      activeIndex.value = res.list[0].id
      total.value = res.totalCount
    }
  }).finally(()=>{
    loading.value = false
  })
}
getdata()
defineExpose(
    {
      getdata
    }
)
</script>

<template>

  <el-aside width="220px" class="image-aside">
    <div class="top">
      <AsideList v-for="(item,index) in imageList" :key="index" :active="activeIndex === item.id">
        {{item.name}}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="getdata" />
    </div>
  </el-aside>
</template>

<style scoped>
.image-aside{
  border-right: 1px solid #e5e5e5;
  position:relative;
}
.image-aside .top {
  position:absolute;
  top :0;
  right:0;
  left:0;
  bottom:50px;
  overflow-y: auto;
}
.image-aside .bottom {
  position:absolute;
  bottom:0;
  right:0;
  left:0;
  height:50px;
  @apply flex items-center justify-center;
}

</style>