import { createStore } from 'vuex'
import { getInfo,logout } from '~/api/manager'
import { removeToken } from '~/composables/auth'

const store = createStore({
    state(){
        return {
            //用户信息
            user:{}
        }
    },
    mutations:{
        //设置用户信息
        SET_USERINFO(state,user){  
            state.user = user
          } 
    },
    actions:{
        // 修复：使用正确的API调用，避免无限递归
        async getInfo({ commit }){
            try {
                const res = await getInfo()
                commit("SET_USERINFO", res)
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