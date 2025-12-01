//从 Vue.js 框架中导入 createApp 函数，这是 Vue 3 中创建应用实例的核心函数。
import { createApp } from 'vue'
//导入 Element Plus UI 组件库，这是一个基于 Vue 3 的组件库，提供了丰富的 UI 组件。
import ElementPlus from 'element-plus'
//导入 Element Plus 的样式文件，确保组件能够正确显示样式。
import 'element-plus/dist/index.css'
import './style.css'
//导入根组件 App.vue，这是整个 Vue 应用的主组件。
import App from './App.vue'
import router from './router'
import store from './store'
import "nprogress/nprogress.css"
//使用 createApp 函数创建一个 Vue 应用实例，并将 App 组件作为根组件。
const app = createApp(App)
//将 Vuex 插件安装到 Vue 应用中，这样你就可以在整个应用中使用 Vuex 提供的状态管理了。
app.use(store)
//将 Element Plus 插件安装到 Vue 应用中，这样你就可以在整个应用中使用 Element Plus 提供的组件了。
app.use(router)
app.use(ElementPlus)
import './permission'
//导入 Windi CSS 的虚拟样式文件，启用 Windi CSS 的实用程序类。  
import 'virtual:windi.css'
app.mount('#app')
