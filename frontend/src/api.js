import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '/api', // 使用相对路径，通过代理访问后端API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // 允许携带cookie
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 如果有token，添加到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
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
        case 401:
          // 未授权，清除登录信息并跳转到登录页
          localStorage.removeItem('isLoggedIn')
          localStorage.removeItem('username')
          window.location.href = '/login'
          break
        case 403:
          console.error('访问被拒绝')
          break
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

// 登录函数
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login/', { username, password })
    if (response.data.success) {
      // 保存登录状态
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', response.data.user.username)
    }
    return response.data
  } catch (error) {
    throw error
  }
}

// 登出函数
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout/')
    // 清除本地存储的登录信息
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    return response.data
  } catch (error) {
    // 即使后端调用失败，也要清除本地状态
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    throw error
  }
}

// 注册函数
export const register = async (username, password) => {
  try {
    const response = await api.post('/auth/register/', { username, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export default api