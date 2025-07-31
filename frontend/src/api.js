import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '/api', // 使用相对路径，通过代理访问后端API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error(`请求失败: ${error.response.status}`)
      }
    } else {
      console.error('网络错误')
    }
    return Promise.reject(error)
  }
)

export default api