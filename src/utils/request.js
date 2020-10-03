import axios from 'axios'
import JSONbig from 'json-bigint'

// axios 实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 定制后端返回的数据的原始处理，参数为未经处理的json字符串
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 请求成功
  // config 是当前请求配置的相关信息
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  // 请求失败拦截
  function (error) {
    return Promise.reject(error)
  }
)

export default request
