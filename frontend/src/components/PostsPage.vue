<template>
  <div class="posts-container">
    <header class="page-header">
      <h1>博客文章</h1>
      <button @click="goToCreate" class="create-button">新建文章</button>
    </header>
    
    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="posts.length === 0" class="empty-state">
      <p>暂无文章</p>
      <button @click="goToCreate">创建第一篇文章</button>
    </div>
    
    <div v-else class="posts-list">
      <div 
        v-for="post in posts" 
        :key="post.id" 
        class="post-item"
        @click="goToDetail(post.id)"
      >
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-excerpt">{{ truncateContent(post.content) }}</p>
        <div class="post-meta">
          <span>{{ formatDate(post.created_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const posts = ref([])
const loading = ref(true)

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

const truncateContent = (content) => {
  if (!content) return ''
  return content.length > 100 ? content.substring(0, 100) + '...' : content
}

const fetchPosts = async () => {
  try {
    loading.value = true
    const res = await api.get('/posts/')
    posts.value = res.data
  } catch (error) {
    console.error('获取文章列表失败:', error)
  } finally {
    loading.value = false
  }
}

const goToCreate = () => {
  router.push('/post-form')
}

const goToDetail = (postId) => {
  router.push(`/post/${postId}`)
}

onMounted(() => {
  // 检查用户是否已登录
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (!isLoggedIn) {
    router.push('/login')
    return
  }
  
  fetchPosts()
})
</script>

<style scoped>
.posts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  color: #333;
}

.create-button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #0056b3;
}

.loading, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.post-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.post-title {
  margin: 0 0 1rem 0;
  color: #333;
}

.post-excerpt {
  color: #666;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 0.9rem;
}
</style>