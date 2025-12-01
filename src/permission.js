import router from '~/router'
import { getToken } from '~/composables/auth'
import { toast, showFullLoading, hideFullLoading } from '~/composables/util'
import store from '~/store'
//全局前置守卫
router.beforeEach(async(to, from, next) => {
    //显示loading
    showFullLoading()
    const token = getToken()
    let title = to.meta.title? to.meta.title: ""
    document.title = title
    if (!token && to.path != "/login"){
        toast('请先登录', 'warning')
        return next({path:'/login'})
    }


    if (token && to.path == "/login"){
        toast('您已登录，无需重复登录', 'warning')
        return next({path:from.path ?from.path : '/' })
    }

    //如果用户登录了，自动获取用户信息，并存储在vuex中
    if (token) {
        try {
            // ✅ 只在用户信息为空时才获取
            if (!store.state.user || Object.keys(store.state.user).length === 0) {
                await store.dispatch('getInfo')
            }
            next()
        } catch (error) {
            console.error('获取用户信息失败:', error)
            toast('获取用户信息失败，请重新登录', 'error')
            
            // 清除 token 并跳转到登录页
            removeToken()
            next({ 
                path: '/login', 
                query: { redirect: to.fullPath } 
            })
        }
    } else {
        next()
    }
})

//全局后置钩子
router.afterEach(() => {
    //隐藏loading
    hideFullLoading()
})
