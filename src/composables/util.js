import { ElNotification } from 'element-plus'
import { ElMessageBox } from 'element-plus'
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