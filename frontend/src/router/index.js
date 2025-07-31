// filepath: e:\dj_and_vue\frontend\src\router\index.js
import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/PostList.vue'
import PostDetail from '../components/PostDetail.vue'
import HelloWorld from '../components/HelloWorld.vue'
import PostForm from '../components/PostForm.vue'

// 导入新创建的页面组件
import PostDetailPage from '../components/PostDetailPage.vue'
import PostFormPage from '../components/PostFormPage.vue'


const routes = [
  { path: '/', component: PostList },
  { path: '/post/:id', component: PostDetailPage, props: true },
  { path: '/hello', component: HelloWorld },
  { path: '/post-form', component: PostFormPage },
  { path: '/post-form/:id', component: PostFormPage, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router