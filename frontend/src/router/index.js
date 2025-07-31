// filepath: e:\dj_and_vue\frontend\src\router\index.js
import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/PostList.vue'
import PostDetail from '../components/PostDetail.vue'
import HelloWorld from '../components/HelloWorld.vue'
import PostForm from '../components/PostForm.vue'
import PostDetail from '../components/PostDetail.vue'



const routes = [
  { path: '/', component: PostList },
  { path: '/post/:id', component: PostDetail, props: true },
  { path: '/hello', component: HelloWorld },
  { path: '/post-form', component: PostForm },
  { path: '/post-form/:id', component: PostForm, props: true },
    // 添加其他路由配置
    { path: '/post-form/:id', component: PostForm, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router