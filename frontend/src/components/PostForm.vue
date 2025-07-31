<template>
  <div class="modal">
    <h2>新建博客</h2>
    <form @submit.prevent="submit">
      <input v-model="title" placeholder="标题" required />
      <textarea v-model="content" placeholder="内容" required></textarea>
      <button type="submit">提交</button>
      <button type="button" @click="$emit('close')">取消</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')
const content = ref('')

const submit = async () => {
  await axios.post('http://localhost:8000/api/posts/', {
    title: title.value,
    content: content.value
  })
  title.value = ''
  content.value = ''
  // 通知父组件刷新列表
  emit('created')
}
</script>