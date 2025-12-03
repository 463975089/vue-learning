import axios from 'axios'
import { toast } from '~/composables/util'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getToken } from '~/composables/auth'
import store from './store'
const cookie = useCookies()
const service =axios.create({
    baseURL:"/api"
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    
    config.headers['token'] = getToken() 
 
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    response = response.data.data 
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const msg = error?.response?.data?.msg || error?.message || '请求失败'
    
    toast(msg, 'error');
    if (msg.contains('非法token')) { 
       store.dispatch('handLogout').finally(() => {
          location.reload()
       })
    }
    return Promise.reject(error);
  });


export default service