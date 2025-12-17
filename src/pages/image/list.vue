<script setup>
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import FormDrawer from '~/components/FormDrawer.vue'
import { addImage } from '~/api/image'
import { ref,reactive } from 'vue'
import { toast } from '~/composables/util'
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40
const formDrawerRef = ref(null)
const form = reactive({
    name: '',
    order: 50,
})
const formRef = ref(null)
const rules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },]
}
const alist = ref(null  )
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      formDrawerRef.value.ShowLoding()
      // 提交表单数据
      addImage(form).then(res=>{
          toast('新增成功')
          alist.value.getdata(1)
      }).finally(()=>{
        formDrawerRef.value.HideLoding()
      })
      formDrawerRef.value.close()
    } else {
      console.log('表单验证失败')
    }
  })
}
</script>

<template>
  <div class="common-layout">
    <el-container  class="bg-white rounded" :style="{ height:(h + 'px')}">
      <el-header class="image-header">
        <div>
          <el-button type="primary" @click="formDrawerRef.open()">新增图片分类</el-button>
          <el-button type="warning">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
         <ImageAside ref="alist"></ImageAside>
         <ImageMain></ImageMain>
      </el-container>
    </el-container>
  </div>
  <div>
    <FormDrawer ref="formDrawerRef" title="新增" destroyOnClose @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>



</template>

<style scoped>

.image-header{
  border-bottom: 1px solid #e5e5e5;
  @apply flex items-center;
}



</style>