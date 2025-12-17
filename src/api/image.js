import axios from '~/axios'

export function getImageList(data){
    return axios.get('/admin/image_class/'+data)
}

export function addImage(data){
    return axios.post('/admin/image_class',data)
}


