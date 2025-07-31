<template>
  <div class="login-container">
    <div class="login-form">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input 
            v-model="username" 
            type="text" 
            placeholder="用户名" 
            required 
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input 
            v-model="password" 
            type="password" 
            placeholder="密码" 
            required 
            class="form-input"
          />
        </div>
        <div class="form-group">
          <button 
            type="submit" 
            :disabled="loading" 
            class="login-button"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // 这里应该调用后端API进行身份验证
    // 由于目前后端没有实现用户认证，我们暂时模拟登录成功
    // 在实际应用中，应该发送用户名和密码到后端进行验证
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 保存登录状态（在实际应用中应该使用更安全的方式）
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', username.value)
    
    // 跳转到首页
    router.push('/home')
  } catch (err) {
    error.value = '登录失败，请检查用户名和密码'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.login-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
}
</style>