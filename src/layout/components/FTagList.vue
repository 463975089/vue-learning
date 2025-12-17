<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { router } from '../../router'
const route = useRoute()
const activeTab = ref(route.path)
const cookie = useCookies()
const lrouter = useRouter()
const tabList = ref([
    {
        title: '后台首页',
        path:"/"
    },
])

function addTab(tab){
    let index = tabList.value.findIndex(t=>t.path == tab.path)
    if(index == -1){
        tabList.value.push(tab)
    }
    cookie.set('tabList', tabList.value)
}
onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path
    addTab({
        path:to.path,
        title:to.meta.title
    })

})

function initTablList(){
    let tbs =  cookie.get("tabList")
    if(tbs){
        tabList.value = tbs
    }
}

initTablList()

const changeTab=(tab)=>{
    activeTab.value = tab
    lrouter.push(tab)
}

const removeTab = (t) => {
    let tabs = tabList.value
    let a = activeTab.value
    if ( a == t ){
        tabs.forEach((tab, index)=>{
            if(tab.path ==t){
                const nextTab = tabs[index+1] || tabs[index-1]
                if(nextTab){
                    a = nextTab.path
                }
            }
        })
    }
    activeTab.value = a
    tabList.value = tabList.value.filter(tab=>tab.path != t)
    cookie.set('tabList', tabList.value)
    lrouter.push(a)
}

const handleCommand=(cmd)=>{
    if(cmd == 'closeOther'){
        tabList.value = tabList.value.filter(tab=>tab.path == activeTab.value || tab.path == '/')
    }else if(cmd == 'closeAll'){
        activeTab.value = '/'
        tabList.value = [{
            title: '后台首页',
            path:"/"
        }]
    }
    cookie.set('tabList', tabList.value)
    router.push(activeTab.value)
}
</script>

<template>
<div>
    <div class="f-tag" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="demo-tabs"  @tab-remove="removeTab" @tab-change="changeTab" style="min-width: 100px;">
            <el-tab-pane v-for="item in tabList" :closable="item.path != '/'" :key="item.path" :label="item.title" :name="item.path">
            </el-tab-pane>
        </el-tabs>
        <span class="tag-btn">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
                        <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height: 44px;"></div>
  </div>
</template>

<style scoped>
.f-tag {
    @apply fixed flex bg-gray-100 items-center px-2;
    z-index: 100;
    top: 64px;
    right: 0;
    height: 44px;
}
.tag-btn{
    @apply bg-white rounded ml-auto flex items-center justify-center;
    height:32px;
    width:32px;
    padding-right: 2px;
}
:deep(.el-icon-right){
    margin-left: 4px;
}
:deep(.el-tabs__header){
    @apply mb-0;
    border: 0 !important;
}

:deep(.el-tabs__item){
    @apply rounded-md mx-1 bg-white;
    border:0 !important;
    height: 32px;
    line-height: 32px;
}
:deep(el-tabs__nav){
    border:0 !important;
}
:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
    line-height: 32px;
    height: 32px;
}
:deep(.is-disabled){
    cursor: not-allowed;
    @apply text-gray-400;
}
</style>