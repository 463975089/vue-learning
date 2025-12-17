<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-modal=false :destroy-on-close="destroyOnClose" :loading="loading" :append-to-body="true">

      <div class="formDrawer">
          <div class="body">
            <slot> </slot>
          </div>
          <div class="button">
                <el-button type="primary" @click="submit">{{ confirmText }}</el-button>
                <el-button type="default" @click="close">取 消</el-button>
          </div>

      </div>
  </el-drawer>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  const showDrawer = ref(false)
  const loading = ref(false)
  const open = ()=> {
    showDrawer.value = true
  }

  const close = ()=> {
    showDrawer.value = false
  }
  const ShowLoding = ()=> {
    loading.value = true
  }
  const HideLoding = ()=> {
    loading.value = false
  }
  const emit = defineEmits(['submit'])
  const submit = ()=> {
    emit('submit')
  }

  const props = defineProps({
    title:String,
    size:{
      type:String,
      default:'45%'
    },
    destroyOnClose:{
      type:Boolean,
      default:false
    },
    confirmText:{
      type:String,
      default:'确 定'
    }

  })
  //需要暴露给父组件调用
  defineExpose({
        open,
        close,
        ShowLoding,
        HideLoding
  })
</script>

<style>
.formDrawer {
    width: 100%;
    height: 100%;
    position:relative;
    display: flex;
    flex-direction: column;
    
}
.formDrawer .button {
    flex: 1;
    @apply absolute bottom-0 left-0 w-full flex justify-start items-center bg-white p-4;
}
.formDrawer .body {
    padding: 20px;
    overflow-y: auto;
    flex: auto;
}
</style>