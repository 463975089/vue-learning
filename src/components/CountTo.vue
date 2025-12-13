<template>
  {{ d.num }}
</template>
<style scoped>

</style>

<script setup>
import { reactive,watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const d = reactive({
  num: 0
})

function AnimateToValue(){
   gsap.to(d,{
    num: props.value,
    duration: 0.5,
    ease: 'power1.out',
    onUpdate: () => {
      d.num = Math.round(d.num)
    }
   })
}
AnimateToValue()

watch(()=>props.value,()=>{
  AnimateToValue()
})

</script>