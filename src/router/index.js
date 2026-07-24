import { createRouter, createWebHistory } from 'vue-router'

// ------------------------------------------------------------
// 路由表：一张"URL 路径 -> 页面组件"的对照表
// path: URL 路径
// name: 路由名称（用于编程式导航，比如 router.push({ name: 'home' })）
// component: 对应的页面组件
// ------------------------------------------------------------
const routes = [
  {
    path: '/',
    name: 'home',
    // ----------------------------------------------------
    // 语法点：() => import('@/views/Home.vue')
    // ----------------------------------------------------
    // 这是一个"没有参数的箭头函数"，等价于：
    //   function () {
    //     return import('@/views/Home.vue')
    //   }
    //
    // import('路径') 是"动态导入"语法，会返回一个 Promise（异步加载这个文件）。
    // 这里没有用 await，而是直接把这个"返回 Promise 的函数"交给 vue-router，
    // 让 vue-router 自己决定"什么时候需要这个页面，才去真正加载它"——
    // 这样做的好处叫【路由懒加载】：用户第一次打开网站时，只会加载当前页面需要的代码，
    // 其他页面的代码要等用户真正点击导航访问到时才会去下载，首屏加载速度更快。
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/views/TodoList.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  // ============================================================
  // 学习中心路由
  // ============================================================
  {
    path: '/learn',
    name: 'learning-center',
    component: () => import('@/views/LearningCenter.vue')
  },
  {
    path: '/learn/html',
    name: 'learn-html',
    component: () => import('@/views/learn/HtmlBasic.vue')
  },
  {
    path: '/learn/css',
    name: 'learn-css',
    component: () => import('@/views/learn/CssLayout.vue')
  },
  {
    path: '/learn/js',
    name: 'learn-js',
    component: () => import('@/views/learn/JsCore.vue')
  },
  {
    path: '/learn/vue',
    name: 'learn-vue',
    component: () => import('@/views/learn/VueDeep.vue')
  },
  {
    path: '/learn/component',
    name: 'learn-component',
    component: () => import('@/views/learn/ComponentComm.vue')
  },
  {
    path: '/learn/arch',
    name: 'learn-arch',
    component: () => import('@/views/learn/ServiceStore.vue')
  }
]

// createRouter：创建路由实例
// history: createWebHistory() 表示使用浏览器原生的 History API 来管理路径，
// 这样地址栏显示的是正常的 /todo 这种路径，而不是带 # 号的 /#/todo
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导出这个路由实例，main.js 里会通过 app.use(router) 把它安装到整个应用中
export default router
