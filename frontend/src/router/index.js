// filepath: e:\dj_and_vue\frontend\src\router\index.js
import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../components/PostList.vue'
import PostDetail from '../components/PostDetail.vue'
import HelloWorld from '../components/HelloWorld.vue'
import PostForm from '../components/PostForm.vue'

// 导入新创建的页面组件
import PostDetailPage from '../components/PostDetailPage.vue'
import PostFormPage from '../components/PostFormPage.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import PostsPage from '../components/PostsPage.vue'

// 路由守卫
const requireAuth = (to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (!isLoggedIn && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/home', component: Home, beforeEnter: requireAuth },
  { path: '/posts', component: PostsPage, beforeEnter: requireAuth },
  { path: '/post/:id', component: PostDetailPage, props: true, beforeEnter: requireAuth },
  { path: '/hello', component: HelloWorld },
  { path: '/post-form', component: PostFormPage, beforeEnter: requireAuth },
  { path: '/post-form/:id', component: PostFormPage, props: true, beforeEnter: requireAuth },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果已登录且尝试访问登录页，则重定向到首页
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (isLoggedIn && to.path === '/login') {
    next('/home')
  } else {
    next()
  }
})

export default router