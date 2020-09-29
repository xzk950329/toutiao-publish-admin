import axios from 'axios'

// axios 实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request
