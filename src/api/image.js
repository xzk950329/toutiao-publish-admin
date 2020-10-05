import request from '@/utils/request'

/*
上传用户图片素材
 */
export const uploadImage = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 图片上传请求头参数 content-Type是 multipart/form-data, 则请求体必须设置为 FormData
    data
  })
}

/*
获取图片素材
 */
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

/*
收藏图片素材
 */
export const collectImage = (imgId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imgId}`,
    data: {
      collect
    }
  })
}

/*
删除图片素材
 */
export const deleteImage = imgId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imgId}`
  })
}
