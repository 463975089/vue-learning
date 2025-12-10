import { createStore } from 'vuex'
import { getInfo,logout } from '~/api/manager'
import { removeToken } from '~/composables/auth'

const store = createStore({
    state(){
        return {
            //用户信息
            user:{},
            //侧边宽度
            asideWidth:'250px',

            menus:[],
            ruleName:[]
        }
    },
    mutations:{
        //设置用户信息
        SET_USERINFO(state,user){  
            state.user = user

          },
          //设置菜单
          SET_MENUS(state,menus){
            state.menus = menus
          },
          //设置权限
          SET_RULENAME(state,ruleName){
            state.ruleName = ruleName
          },
          //展开/缩起侧边
        hnadleAsideWidth(state){
            state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
        }
    },
    actions:{
        // 修复：使用正确的API调用，避免无限递归
        async getInfo({ commit }){
            try {
                const res = await getInfo()
                commit("SET_USERINFO", res)
                commit("SET_MENUS", res.menus)
                commit("SET_RULENAME", res.ruleName)
                return res
            } catch (error) {
                console.error('获取用户信息失败:', error)
                throw error
            }
        },
        async handLogout({ commit }){
            try {
                await logout()
                removeToken()
                commit("SET_USERINFO", {})
            } catch (error) {
                console.error('注销失败:', error)
                throw error
            }
        }
    }    
})

export default store