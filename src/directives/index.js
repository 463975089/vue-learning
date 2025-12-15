import store from '~/store'

function hasPermission(value){

   if (!Array.isArray(value)) {
     throw new Error('v-permission 指令的值必须是一个数组')
   }
   const rulename = store.state.ruleName || []
   return value.some(item => rulename.includes(item))
}

export default {
    mounted(el,binding){
        const value = binding.value
        console.log(value)
        if(value){
            const hasPerm = hasPermission(value)
            if(!hasPerm){
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    }
}