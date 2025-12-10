<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="i in 4" :key="i">
        <el-skeleton class="bg-light-100" loading animated>
          <template #template>
            <el-skeleton-item variant="image" style="width: 240px; height: 240px"/>
            <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 50%"/>
              <div
                  style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
              >
                <el-skeleton-item variant="text" style="margin-right: 16px"/>
                <el-skeleton-item variant="text" style="width: 30%"/>
              </div>
            </div>
          </template>
        </el-skeleton>
      </el-col>
      <el-col :span="6" v-for="(item,index) in panels" :key="index">
        <el-card shadow="never" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag
                  :type="item.unitColor || 'info'"
                  effect="plain"
              >
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <div class="text-3xl"> {{ item.value }}</div>
          <template #footer>
            <div class="flex justify-between text-sm">
              <span> {{ item.subTitle }}</span>
              <span> {{ item.subValue }}</span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
<script setup>
import {ref} from 'vue'
import {getStatistics1} from '~/api/index.js'

const panels = ref([])

getStatistics1().then(res => {
  panels.value = res.panels
  console.log(panels.value)
})
</script>