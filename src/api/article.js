import request from '@/utils/request'

/*
获取文章列表
 */
export const getArticle = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用data设置
    // query 参数使用 params 设置
    // headers 参数使用headers设置
    params
  })
}
/*
获取文章频道
 */
export const getArticleChannel = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
