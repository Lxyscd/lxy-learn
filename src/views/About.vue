<script setup>
import { ref } from 'vue'

// 项目技术栈信息
const techStack = ref([
  { name: 'Vue 3', role: '前端框架', version: '^3.4.0' },
  { name: 'Vite', role: '构建工具', version: '^5.4.0' },
  { name: 'Vue Router', role: '路由管理', version: '^4.3.0' }
])

// 项目目录结构（用文本展示）
const projectStructure = `lxy-learn/
├── index.html          # 入口 HTML
├── package.json        # 依赖与脚本
├── vite.config.js      # Vite 配置
└── src/
    ├── main.js         # 应用入口
    ├── App.vue         # 根组件
    ├── router/         # 路由配置
    ├── views/          # 页面组件
    ├── components/     # 通用组件
    ├── composables/    # 组合式函数
    └── assets/         # 静态资源`
</script>

<template>
  <div class="about">
    <h1>关于本项目</h1>
    <p class="intro">
      这是一个基于 Vue 3 + Vite 的学习项目，包含了一个完整的待办事项应用。
      项目演示了 Vue 3 的核心概念：响应式数据、组件通信、路由、组合式 API 等。
    </p>

    <h2>技术栈</h2>
    <div class="tech-list">
      <div v-for="tech in techStack" :key="tech.name" class="tech-card">
        <div class="tech-name">{{ tech.name }}</div>
        <div class="tech-role">{{ tech.role }}</div>
        <div class="tech-version">v{{ tech.version }}</div>
      </div>
    </div>

    <h2>项目结构</h2>
    <pre class="code-block">{{ projectStructure }}</pre>
  </div>
</template>

<style scoped>
.about h1 {
  color: #2c3e50;
}

.intro {
  color: #555;
  line-height: 1.7;
  margin-bottom: 24px;
}

.about h2 {
  color: #2c3e50;
  font-size: 20px;
  margin-top: 28px;
  margin-bottom: 16px;
  border-left: 4px solid #4fc08d;
  padding-left: 12px;
}

.tech-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.tech-card {
  flex: 1;
  min-width: 180px;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.tech-name {
  font-size: 18px;
  font-weight: bold;
  color: #4fc08d;
  margin-bottom: 6px;
}

.tech-role {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.tech-version {
  font-size: 12px;
  color: #999;
}

.code-block {
  background-color: #2c3e50;
  color: #a5d6a7;
  padding: 20px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
}
</style>
