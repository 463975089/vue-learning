<script setup>
import * as echarts from 'echarts'
import {ref, onMounted} from 'vue'
import {getStatistics3} from "../api/index.js";
import { useResizeObserver } from '@vueuse/core'
const checked = ref('week')
const el = ref(null)
var myChart = null
onMounted(() => {
  var chartDom = document.getElementById('chart')
  if (chartDom) {
    myChart = echarts.init(chartDom)
    getdata()
  }

})

function getdata(){
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  myChart.showLoading()
  getStatistics3(checked.value).then(res => {
    option.xAxis.data = res.x
    option.series[0].data = res.y
    if(myChart){
      myChart.setOption(option)
    }

  }).finally(() => {
    myChart.hideLoading()
  })
}

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  myChart.resize()
})

const onChange = (item) => {
    checked.value = item
    getdata()
}

const opts = [{
  text: "近一个月",
  value: "month",
}, {
  text: "近一周",
  value: "week",
}, {
  text: "近24小时",
  value: "day",
}]
</script>

<template>
  <el-card ref="el" class="mt-5">
    <template #header>
      <div class="card-header flex items-center justify-between">
        <span>订单统计</span>
        <div class="flex gap-2">
          <el-check-tag v-for="(item,index) in opts" :checked="checked === item.value" @change="onChange(item.value)" :key="index">
            {{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <div id="chart" style="width: 100%; height: 400px;">
    </div>
  </el-card>

</template>

<style scoped>

</style>