<script setup>
// 这是"根组件"，是所有页面的公共外壳（导航栏 + 内容区 + 页脚）
// 无论用户访问哪个路径，Navbar 和页脚都不会变，只有中间的 <router-view /> 内容会切换
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="app-container">
    <!-- 导航栏组件：全局共用，写在这里表示所有页面顶部都会显示它 -->
    <Navbar />

    <!--
      语法点：<router-view /> —— 路由出口
      这是 vue-router 提供的特殊组件，作用是"占位"：
      当前 URL 匹配到 router/index.js 里配置的哪个路由，对应的页面组件就会渲染在这个位置。
      比如访问 /todo，这里就会自动显示 TodoList.vue 的内容。
    -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <p>LXY Learn © 2025 - Vue 3 学习项目</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
}

.app-footer {
  text-align: center;
  padding: 16px;
  background-color: #f5f5f5;
  color: #999;
  font-size: 14px;
}
</style>
