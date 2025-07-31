<template>
  <div class="modal">
    <h2>{{ isEdit ? '编辑博客' : '新建博客' }}</h2>
    <form @submit.prevent="submit">
      <input v-model="title" placeholder="标题" required />
      <textarea v-model="content" placeholder="内容" required></textarea>
      <button type="submit" :disabled="submitting">
        {{ submitting ? '提交中...' : '提交' }}
      </button>
      <button type="button" @click="$emit('close')" :disabled="submitting">取消</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import api from '../api'

const props = defineProps({
  post: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'created'])

const isEdit = ref(!!props.post)
const title = ref(props.post ? props.post.title : '')
const content = ref(props.post ? props.post.content : '')
const submitting = ref(false)

// 监听props变化
watch(() => props.post, (newPost) => {
  isEdit.value = !!newPost
  title.value = newPost ? newPost.title : ''
  content.value = newPost ? newPost.content : ''
})

const submit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('请填写标题和内容')
    return
  }

  try {
    submitting.value = true
    if (isEdit.value) {
      await api.put(`/posts/${props.post.id}/`, {
        title: title.value,
        content: content.value
      })
    } else {
      await api.post('/posts/', {
        title: title.value,
        content: content.value
      })
    }
    title.value = ''
    content.value = ''
    // 通知父组件刷新列表
    emit('created')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 300px;
}

input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>