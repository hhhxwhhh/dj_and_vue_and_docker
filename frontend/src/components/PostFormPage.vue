<template>
  <div class="post-form-page">
    <h1>{{ isEdit ? '编辑博客' : '新建博客' }}</h1>
    <form @submit.prevent="submit">
      <div class="form-group">
        <input v-model="title" placeholder="标题" required class="title-input" />
      </div>
      <div class="form-group">
        <textarea v-model="content" placeholder="内容" required class="content-textarea"></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" :disabled="submitting">
          {{ submitting ? '提交中...' : '提交' }}
        </button>
        <button type="button" @click="goBack" :disabled="submitting">取消</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const title = ref('')
const content = ref('')
const submitting = ref(false)

const fetchPost = async () => {
  if (isEdit.value) {
    try {
      const res = await api.get(`/posts/${route.params.id}/`)
      title.value = res.data.title
      content.value = res.data.content
    } catch (error) {
      console.error('获取文章失败:', error)
    }
  }
}

const submit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('请填写标题和内容')
    return
  }

  try {
    submitting.value = true
    if (isEdit.value) {
      await api.put(`/posts/${route.params.id}/`, {
        title: title.value,
        content: content.value
      })
    } else {
      await api.post('/posts/', {
        title: title.value,
        content: content.value
      })
    }
    router.push('/')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    submitting.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(fetchPost)
</script>

<style scoped>
.post-form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.title-input {
  width: 100%;
  padding: 12px;
  font-size: 1.2em;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.content-textarea {
  width: 100%;
  min-height: 300px;
  padding: 12px;
  font-family: inherit;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1em;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

button[type="button"] {
  background-color: #6c757d;
}

button[type="button"]:hover:not(:disabled) {
  background-color: #5a6268;
}
</style>