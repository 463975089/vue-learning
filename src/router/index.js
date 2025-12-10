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
        name: 'admin',
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

//动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
    {
        path: '',
        name: '/',
        component: Index,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: () => import('~/pages/goods/list.vue'),
        meta: {
            title: '商品列表'
        }
    }, {
        path: '/category/list',
        name: '/category/list',
        component: () => import('~/pages/category/list.vue'),
        meta: {
            title: '商品分类列表'
        }
    }]

export const router = createRouter({
        history: createWebHashHistory(),
        routes
    })


export function addRoutes(menus) {
       //是否有新的路由
       let hasNewRoutes = false
       const findAndAddRoutesByMenus = (arr) => {
       arr.forEach(e=>{
        let item = asyncRoutes.find(o=>o.path == e.frontpath)
        if(item && !router.hasRoute(item.name )){
            router.addRoute('admin',item)
            hasNewRoutes = true
        }
        if(e.child && e.child.length > 0){
            findAndAddRoutesByMenus(e.child)
        }
       })
    }
    findAndAddRoutesByMenus(menus)
    return hasNewRoutes
       
}

