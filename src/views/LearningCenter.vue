<script setup>
/**
 * ==========================================
 * 📖 学习中心首页
 * ==========================================
 *
 * 这是 lxy-learn 项目的学习导航页面
 * 展示完整的学习路线和进度
 *
 * 学习路线（基于学城文档）：
 *   第 1 周：HTML 基础 + CSS 基础
 *   第 2 周：JavaScript ES6+
 *   第 3 周：Vue 组件 + Composition API
 *   第 4 周：组件通信 + 状态管理 + Service 封装
 *   第 5 周：综合实战（待办事项应用）
 */

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 学习模块列表
const learningModules = ref([
  {
    id: 1,
    week: '第 1 周',
    title: 'HTML 基础',
    desc: '语义化标签、表单元素、HTML 结构',
    route: '/learn/html',
    icon: '📄',
    topics: ['语义化标签', '表单元素', 'label/for 关联', 'v-model 基础'],
    difficulty: '入门',
    completed: true
  },
  {
    id: 2,
    week: '第 1 周',
    title: 'CSS 布局',
    desc: '盒模型、Flex 布局、定位、响应式设计',
    route: '/learn/css',
    icon: '🎨',
    topics: ['盒模型', 'Flex 布局', 'position 定位', '媒体查询'],
    difficulty: '入门',
    completed: true
  },
  {
    id: 3,
    week: '第 2 周',
    title: 'JavaScript ES6+',
    desc: '变量声明、箭头函数、解构、异步编程、数组方法',
    route: '/learn/js',
    icon: '⚡',
    topics: ['let/const', '箭头函数', '解构赋值', 'async/await', '数组方法'],
    difficulty: '基础',
    completed: true
  },
  {
    id: 4,
    week: '第 3 周',
    title: 'Vue Composition API',
    desc: 'ref/reactive/computed/watch、生命周期',
    route: '/learn/vue',
    icon: '🟢',
    topics: ['ref vs reactive', 'computed', 'watch', '生命周期', 'Options vs Composition'],
    difficulty: '进阶',
    completed: true
  },
  {
    id: 5,
    week: '第 4 周',
    title: '组件通信与组织',
    desc: 'props/emits、v-model、组件拆分、容器vs展示',
    route: '/learn/component',
    icon: '🧩',
    topics: ['props 父传子', 'emits 子传父', 'v-model', '组件拆分原则', '容器vs展示'],
    difficulty: '进阶',
    completed: true
  },
  {
    id: 6,
    week: '第 4 周',
    title: '请求层与状态管理',
    desc: 'Service 封装、Pinia、Composables',
    route: '/learn/arch',
    icon: '🏗️',
    topics: ['Service 层', '请求拦截器', 'Pinia Store', 'Composables'],
    difficulty: '进阶',
    completed: true
  },
  {
    id: 7,
    week: '第 5 周',
    title: '综合实战：待办事项',
    desc: '综合运用所学知识，完成完整功能',
    route: '/todo',
    icon: '✅',
    topics: ['响应式数据', '组件通信', 'Composables', '条件渲染', '列表渲染'],
    difficulty: '实战',
    completed: true
  }
])

// 统计信息
const totalModules = computed(() => learningModules.value.length)
const completedModules = computed(() => learningModules.value.filter(m => m.completed).length)
const progress = computed(() => Math.round((completedModules.value / totalModules.value) * 100))

// 参考项目信息
const projectInfo = ref({
  name: 'maicai-jiemo-sales',
  desc: '小象超市（芥末销售平台）PC Web 前端工程',
  tech: ['Vue 2.7', 'TypeScript', 'Pinia', 'Axios', 'ECharts', 'SCSS'],
  doc: 'km.sankuai.com/collabpage/2772839025'
})

// 跳转到学习页面
function goToModule(route) {
  router.push(route)
}
</script>

<template>
  <div class="learning-center">
    <h1>📚 学习中心</h1>
    <p class="subtitle">
      基于 maicai-jiemo-sales 项目的前端学习路线 · 从零开始掌握 Vue 开发
    </p>

    <!-- 进度概览 -->
    <div class="progress-card">
      <div class="progress-info">
        <div class="progress-stats">
          <span class="stat-num">{{ completedModules }}/{{ totalModules }}</span>
          <span class="stat-label">已完成模块</span>
        </div>
        <div class="progress-bar-wrapper">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="progress-percent">{{ progress }}%</span>
      </div>
    </div>

    <!-- 参考项目信息 -->
    <div class="project-info-card">
      <h3>📦 参考项目</h3>
      <div class="project-detail">
        <p><strong>{{ projectInfo.name }}</strong> — {{ projectInfo.desc }}</p>
        <div class="tech-tags">
          <span v-for="t in projectInfo.tech" :key="t" class="tech-tag">{{ t }}</span>
        </div>
        <p class="doc-link">📖 学习文档：{{ projectInfo.doc }}</p>
      </div>
    </div>

    <!-- 学习模块列表 -->
    <h2>🗺️ 学习路线</h2>
    <div class="module-list">
      <div
        v-for="module in learningModules"
        :key="module.id"
        :class="['module-card', { completed: module.completed }]"
        @click="goToModule(module.route)"
      >
        <div class="module-header">
          <span class="module-icon">{{ module.icon }}</span>
          <div class="module-title-area">
            <h3>{{ module.title }}</h3>
            <span class="module-week">{{ module.week }}</span>
          </div>
          <span :class="['difficulty-tag', module.difficulty]">{{ module.difficulty }}</span>
        </div>
        <p class="module-desc">{{ module.desc }}</p>
        <div class="module-topics">
          <span v-for="topic in module.topics" :key="topic" class="topic-tag">{{ topic }}</span>
        </div>
        <div class="module-footer">
          <span v-if="module.completed" class="completed-badge">✅ 已完成</span>
          <span class="go-link">点击学习 →</span>
        </div>
      </div>
    </div>

    <!-- 学习建议 -->
    <div class="tips-section">
      <h2>💡 学习建议</h2>
      <div class="tips-content">
        <p>
          <strong>1. 按顺序学习：</strong>
          模块之间有依赖关系，HTML → CSS → JS → Vue → 组件 → 架构，不要跳着看。
        </p>
        <p>
          <strong>2. 动手操作：</strong>
          每个页面都有可交互的演示，调一调参数、改一改代码，看效果变化。
        </p>
        <p>
          <strong>3. 读注释：</strong>
          每个文件都有详细的注释，解释了"为什么这样写"而不只是"怎么写"。
        </p>
        <p>
          <strong>4. 对比真实项目：</strong>
          学习模块中的代码风格和架构参考了 maicai-jiemo-sales 真实项目，
          学完后去真实项目中找对应的代码加深理解。
        </p>
        <p>
          <strong>5. 善用 AI：</strong>
          不懂的概念可以问我，我会用 Java 后端能理解的方式类比解释。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-center {
  max-width: 800px;
  margin: 0 auto;
}

.learning-center h1 {
  color: #2c3e50;
  font-size: 28px;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 24px;
}

/* 进度卡片 */
.progress-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.progress-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.stat-num {
  font-size: 24px;
  font-weight: bold;
  color: #4fc08d;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.progress-bar-wrapper {
  flex: 1;
  height: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4fc08d, #42b983);
  border-radius: 6px;
  transition: width 0.3s;
}

.progress-percent {
  font-size: 18px;
  font-weight: bold;
  color: #4fc08d;
  min-width: 50px;
  text-align: right;
}

/* 项目信息卡片 */
.project-info-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.project-info-card h3 {
  margin-bottom: 12px;
  font-size: 16px;
}

.project-detail p {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.tech-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.tech-tag {
  padding: 2px 10px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 12px;
  font-size: 12px;
}

.doc-link {
  font-size: 13px !important;
  color: #999 !important;
  font-family: 'Courier New', monospace;
}

/* 模块列表 */
.learning-center h2 {
  font-size: 20px;
  color: #2c3e50;
  margin: 24px 0 16px;
  border-left: 4px solid #4fc08d;
  padding-left: 12px;
}

.module-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.module-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid transparent;
}

.module-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.module-card.completed {
  border-left-color: #4fc08d;
}

.module-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.module-icon {
  font-size: 28px;
}

.module-title-area {
  flex: 1;
}

.module-title-area h3 {
  font-size: 16px;
  color: #333;
  margin: 0;
}

.module-week {
  font-size: 12px;
  color: #999;
}

.difficulty-tag {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.difficulty-tag.入门 {
  background: #e8f5e9;
  color: #2e7d32;
}

.difficulty-tag.基础 {
  background: #e3f2fd;
  color: #1565c0;
}

.difficulty-tag.进阶 {
  background: #fff3e0;
  color: #e65100;
}

.difficulty-tag.实战 {
  background: #fce4ec;
  color: #c62828;
}

.module-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.module-topics {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.topic-tag {
  padding: 2px 8px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.module-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.completed-badge {
  font-size: 13px;
  color: #4fc08d;
}

.go-link {
  font-size: 13px;
  color: #4fc08d;
  font-weight: 500;
}

/* 学习建议 */
.tips-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.tips-section h2 {
  margin: 0 0 16px;
  font-size: 18px;
  border: none;
  padding: 0;
}

.tips-content p {
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 8px;
}

.tips-content strong {
  color: #333;
}
</style>
