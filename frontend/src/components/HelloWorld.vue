<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:8000/api/posts/')
  posts.value = res.data
})
</script>

<template>
  <h1>博客列表</h1>
  <div v-if="posts.length === 0">暂无内容</div>
  <ul v-else>
    <li v-for="post in posts" :key="post.id" style="margin-bottom: 1em;">
      <strong>{{ post.title }}</strong>
      <p>{{ post.content }}</p>
      <small>{{ post.created_at }}</small>
    </li>
  </ul>
</template>

<style scoped>
h1 {
  color: #42b983;
}
ul {
  padding: 0;
  list-style: none;
}
li {
  border-bottom: 1px solid #eee;
  padding-bottom:10px;
}
</style>
