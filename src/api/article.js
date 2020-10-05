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

/*
删除文章
 */
export const deleteArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/*
新建文章
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为草稿（true草稿）
    },
    data
  })
}

/*
修改文章
 */
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft // 是否存为草稿（true草稿）
    },
    data
  })
}

/*
获取指定文章
 */
export const getOneArticle = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/*
修改文章评论状态
 */

export const updataCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
