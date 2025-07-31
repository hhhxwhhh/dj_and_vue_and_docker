<template>
  <div>
    <h1>博客列表</h1>
    <button @click="showForm = true">新建博客</button>
    <div v-if="posts.length === 0">暂无内容</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id" @click="selectPost(post)">
        <strong>{{ post.title }}</strong>
        <small>{{ formatDate(post.created_at) }}</small>
      </li>
    </ul>
    <PostForm 
      v-if="showForm" 
      :post="editingPost"
      @created="onCreated" 
      @close="closeForm" 
    />
    <PostDetail 
      v-if="selectedPost && !showForm" 
      :post="selectedPost" 
      @close="selectedPost = null"
      @edit="editPost"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import PostForm from './PostForm.vue'
import PostDetail from './PostDetail.vue'

const posts = ref([])
const showForm = ref(false)
const selectedPost = ref(null)
const editingPost = ref(null)

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

const fetchPosts = async () => {
  try {
    const res = await api.get('/posts/')
    posts.value = res.data
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}

const onCreated = () => {
  closeForm()
  fetchPosts()
}

const closeForm = () => {
  showForm.value = false
  editingPost.value = null
}

const selectPost = (post) => {
  selectedPost.value = post
}

const editPost = (post) => {
  selectedPost.value = null
  editingPost.value = post
  showForm.value = true
}

onMounted(fetchPosts)
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

li:hover {
  background-color: #f5f5f5;
}

li strong {
  display: block;
  margin-bottom: 5px;
}

li small {
  color: #666;
}
</style>