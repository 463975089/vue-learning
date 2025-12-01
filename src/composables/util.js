import { ElNotification } from 'element-plus'
import { ElMessageBox } from 'element-plus'

import nprogress from 'nprogress'
export function toast(message, type = 'success', duration = 3000,dangerouslyUseHTMLString = true) {
    ElNotification({
        message,
        type,
        duration,
        dangerouslyUseHTMLString,
    })
}

export function msgBox(message, type = 'warning', title = '提示', confirmButtonText = '确定', cancelButtonText = '取消') {
    return ElMessageBox.confirm(message, title, {
        confirmButtonText,
        cancelButtonText,
        type,
    })
}

//显示全屏loading
export function showFullLoading(){
    nprogress.start()
}

//隐藏全屏loading
export function hideFullLoading(){
    nprogress.done()
}
//