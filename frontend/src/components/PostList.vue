<template>
  <div>
    <h2>博客列表</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <strong>{{ post.title }}</strong>
        <p>{{ post.content }}</p>
        <small>{{ post.created_at }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])

onMounted(async () => {
  const res = await axios.get('/api/posts/')
  posts.value = res.data
})
</script>