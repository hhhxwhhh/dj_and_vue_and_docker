<template>
  <div class="post-detail-page" v-if="post">
    <div class="header">
      <h1>{{ post.title }}</h1>
      <div class="actions">
        <button @click="goBack">返回</button>
        <button @click="goToEdit">编辑</button>
        <button @click="deletePost" class="delete-btn">删除</button>
      </div>
    </div>
    <div class="meta">
      <small>创建时间: {{ formatDate(post.created_at) }}</small>
      <small v-if="post.updated_at && post.updated_at !== post.created_at">
        更新时间: {{ formatDate(post.updated_at) }}
      </small>
    </div>
    <div class="content">
      {{ post.content }}
    </div>
  </div>
  <div v-else-if="loading">
    加载中...
  </div>
  <div v-else>
    文章未找到
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

const fetchPost = async () => {
  try {
    loading.value = true
    const res = await api.get(`/posts/${route.params.id}/`)
    post.value = res.data
  } catch (error) {
    console.error('获取文章失败:', error)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

const goToEdit = () => {
  router.push(`/post-form/${route.params.id}`)
}

const deletePost = async () => {
  if (confirm('确定要删除这篇文章吗？')) {
    try {
      await api.delete(`/posts/${route.params.id}/`)
      router.push('/')
    } catch (error) {
      console.error('删除文章失败:', error)
      alert('删除失败')
    }
  }
}

onMounted(fetchPost)
</script>

<style scoped>
.post-detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 20px;
}

.header h1 {
  margin: 0;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

button:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

.meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: #666;
}

.content {
  white-space: pre-wrap;
  line-height: 1.6;
}
</style>