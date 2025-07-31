<template>
  <div class="home-container">
    <header class="header">
      <div class="header-content">
        <h1 class="logo">博客管理系统</h1>
        <div class="user-info">
          <span>欢迎, {{ username }}!</span>
          <button @click="handleLogout" class="logout-button">退出登录</button>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <div class="welcome-section">
        <h2>欢迎使用博客管理系统</h2>
        <p>在这里您可以管理您的博客文章，创建新的内容，编辑现有文章或删除不需要的文章。</p>
      </div>
      
      <div class="navigation-grid">
        <div class="nav-card" @click="goToPosts">
          <div class="card-icon">📝</div>
          <h3>文章管理</h3>
          <p>查看、创建、编辑和删除博客文章</p>
        </div>
        
        <div class="nav-card" @click="goToCreate">
          <div class="card-icon">➕</div>
          <h3>新建文章</h3>
          <p>创建一篇新的博客文章</p>
        </div>
        
        <div class="nav-card" @click="goToProfile">
          <div class="card-icon">👤</div>
          <h3>个人资料</h3>
          <p>查看和编辑您的个人资料</p>
        </div>
        
        <div class="nav-card" @click="goToSettings">
          <div class="card-icon">⚙️</div>
          <h3>系统设置</h3>
          <p>配置系统参数和偏好设置</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')

onMounted(() => {
  // 检查用户是否已登录
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (!isLoggedIn) {
    router.push('/login')
    return
  }
  
  // 获取用户名
  username.value = localStorage.getItem('username') || '用户'
})

const handleLogout = () => {
  // 清除登录状态
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('username')
  
  // 跳转到登录页面
  router.push('/login')
}

const goToPosts = () => {
  router.push('/posts')
}

const goToCreate = () => {
  router.push('/post-form')
}

const goToProfile = () => {
  // 个人资料页面（待实现）
  alert('个人资料页面尚未实现')
}

const goToSettings = () => {
  // 设置页面（待实现）
  alert('系统设置页面尚未实现')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #c82333;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-section h2 {
  color: #333;
  margin-bottom: 1rem;
}

.welcome-section p {
  color: #666;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.navigation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.nav-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.nav-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
}

.nav-card p {
  color: #666;
  margin: 0;
}
</style>