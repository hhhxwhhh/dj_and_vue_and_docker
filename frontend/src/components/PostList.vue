<template>
  <div>
    <h1>博客列表</h1>
    <button @click="showForm = true">新建博客</button>
    <div v-if="posts.length === 0">暂无内容</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id" @click="selectPost(post)">
        <strong>{{ post.title }}</strong>
        <small>{{ post.created_at }}</small>
      </li>
    </ul>
    <PostForm v-if="showForm" @created="onCreated" @close="showForm = false" />
    <PostDetail v-if="selectedPost" :post="selectedPost" @close="selectedPost = null" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PostForm from './PostForm.vue'
import PostDetail from './PostDetail.vue'

const posts = ref([])
const showForm = ref(false)
const selectedPost = ref(null)

const fetchPosts = async () => {
  const res = await axios.get('http://localhost:8000/api/posts/')
  posts.value = res.data
}

const onCreated = () => {
  showForm.value = false
  fetchPosts()
}

const selectPost = (post) => {
  selectedPost.value = post
}

onMounted(fetchPosts)
</script>