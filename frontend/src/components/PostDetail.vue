<template>
  <div class="modal">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <small>{{ post.created_at }}</small>
    <button @click="$emit('close')">关闭</button>
  </div>
</template>

<script setup>
defineProps(['post'])
</script>