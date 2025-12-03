import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/pages/index.vue'
import About from '~/pages/about.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import Admin from '~/layout/admin.vue'

const routes = [
    {
        path: '/',
        component: Admin,
        children: [
            {
                path: '',
                component: Index,
                meta: {
                    title: '首页'
                }
            }
        ]
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: '关于'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: {
            title: '404 未找到'
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
        }
    }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router