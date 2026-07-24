<script setup>
/**
 * ==========================================
 * 📖 学习模块：请求层封装与状态管理
 * ==========================================
 *
 * 对应学城文档：
 *   - 第五章「状态管理（Pinia）」
 *   - 第六章「请求层与 Service 封装」
 *
 * 参考项目：
 *   - maicai-jiemo-sales/src/plugins/request.js（请求挂载）
 *   - maicai-jiemo-sales/src/components/ReportDetail/service.ts（Service 封装）
 *   - maicai-jiemo-sales/src/pages/ProjectDetail/store.ts（Pinia Store）
 *
 * 学习目标：
 *   1. 理解为什么要封装 Service 层
 *   2. 理解 Pinia 状态管理的概念和用法
 *   3. 掌握 Composables（组合式函数）的编写
 *
 * 请求层类比（Java 后端同学）：
 *   - Service 层 ≈ Java 的 Service 层 / DAO 层
 *   - 封装 HTTP 请求，统一处理错误、loading 状态
 *   - 按业务模块拆分（如 LeadDetail/service.ts、ReportDetail/service.ts）
 *
 * Pinia 类比：
 *   - Pinia Store ≈ Spring 的 @Service 单例 Bean
 *   - 全局状态容器，任何组件都可以读写
 *   - 解决多组件共享数据时的 props 逐层传递问题
 */

import { ref, computed } from 'vue'

// ============================================================
// 演示数据
// ============================================================
const currentTab = ref('service')

const tabs = [
  { id: 'service', name: 'Service 封装' },
  { id: 'pinia', name: 'Pinia 状态管理' },
  { id: 'composable', name: 'Composables' }
]

// ============================================================
// Service 层的代码展示
// ============================================================
const serviceCode = `// ============================================
// service.ts — 按业务模块封装请求
// ============================================
// 参考项目：LeadDetail/service.ts

import { hPost, hGet } from '@/plugins/request'

// 定义请求参数类型（TypeScript）
interface IGetLeadDetailParams {
  leadId: number
  bizTag: number
}

// 定义返回数据类型
interface ILeadDetail {
  leadId: number
  leadName: string
  address: string
  longitude: number
  latitude: number
}

// 封装请求函数
// 好处：① 统一入口 ② 类型安全 ③ 易于 Mock
export const getLeadDetail = async (
  params: IGetLeadDetailParams
): Promise<ILeadDetail> => {
  return hPost('/api/m/crm/commercial/lead/detail', params)
}

export const updateLeadInfo = async (
  data: Partial<ILeadDetail>
): Promise<void> => {
  return hPost('/api/m/crm/commercial/lead/update', data)
}`

const requestPluginCode = `// ============================================
// request.js — 请求插件（全局封装）
// ============================================
// 参考项目：plugins/request.js

import axios from 'axios'

// 创建 axios 实例，统一配置
const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器：在请求发出前统一处理
instance.interceptors.request.use(config => {
  // 自动添加 token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器：统一处理响应和错误
instance.interceptors.response.use(
  response => {
    return response.data  // 只返回数据部分
  },
  error => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // 跳转登录
    }
    return Promise.reject(error)
  }
)

// 导出封装后的请求方法
export const hGet = (url, params) => instance.get(url, { params })
export const hPost = (url, data) => instance.post(url, data)`

// ============================================================
// Pinia 状态管理代码展示
// ============================================================
const piniaStoreCode = `// ============================================
// store.ts — Pinia 状态管理
// ============================================
// 参考项目：ProjectDetail/store.ts

import { defineStore } from 'pinia'

// 定义 Store（类似 Spring 的 @Service 单例）
export const useProjectStore = defineStore('project', {
  // state：状态数据（类似 Vue 的 data）
  state: () => ({
    projectId: 0,
    projectHeader: {} as IProject,
    projectDetail: {} as any,
    loading: false
  }),

  // actions：操作方法（类似 Vue 的 methods）
  actions: {
    setProjectId(id: number) {
      this.projectId = id
    },

    async fetchProjectDetail(id: number) {
      this.loading = true
      try {
        const data = await getProjectDetail({ projectId: id })
        this.projectDetail = data
      } finally {
        this.loading = false
      }
    },

    // 重置状态
    reset() {
      this.projectId = 0
      this.projectHeader = {}
      this.projectDetail = {}
    }
  },

  // getters：计算属性（类似 Vue 的 computed）
  getters: {
    hasData: (state) => !!state.projectDetail.id,
    projectName: (state) => state.projectHeader.name || '未知'
  }
})`

const piniaUsageCode = `// ============================================
// 在组件中使用 Pinia Store
// ============================================
import { useProjectStore } from './store'

// 获取 store 实例
const store = useProjectStore()

// 读取 state
console.log(store.projectId)        // 0
console.log(store.projectName)      // '未知'

// 调用 action
store.setProjectId(123)
await store.fetchProjectDetail(123)

// 读取 getter
console.log(store.hasData)          // true

// 重置
store.reset()

// Pinia vs Vuex 对比：
// | 特性        | Pinia          | Vuex              |
// |------------|----------------|-------------------|
// | 语法       | 更简洁          | 需 mutations      |
// | TypeScript | 原生支持        | 需额外配置         |
// | 模块       | 自动模块化      | 需手动 modules     |
// | 体积       | 更轻量          | 稍大              |`

// ============================================================
// Composables 代码展示
// ============================================================
const composableCode = `// ============================================
// useTodoStore.js — 组合式函数（轻量版状态管理）
// ============================================
// 本项目 lxy-learn 中已经用这种方式管理待办事项

import { ref } from 'vue'

export function useTodoStore() {
  // 响应式数据
  const todos = ref([
    { id: 1, text: '学习 Vue 3', done: true }
  ])

  // 操作方法
  function addTodo(text) {
    todos.value.push({
      id: Date.now(),
      text,
      done: false
    })
  }

  function toggleTodo(id) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  // 返回数据和方法供组件使用
  return { todos, addTodo, toggleTodo }
}

// 使用方式：
// const { todos, addTodo } = useTodoStore()`

const composableScrollCode = `// ============================================
// useScrollHeader.js — 滚动控制 Header 显示
// ============================================
// 参考项目：profileHook/useScrollHeaderVisibility

import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollHeaderVisibility(scrollContainer) {
  const isVisible = ref(true)

  const handleScroll = () => {
    // 滚动到顶部时显示，向下滚动时隐藏
    isVisible.value = scrollContainer.value.scrollTop <= 0
  }

  onMounted(() => {
    scrollContainer.value?.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    scrollContainer.value?.removeEventListener('scroll', handleScroll)
  })

  return { isVisible }
}`
</script>

<template>
  <section class="arch-learn">
    <h2>请求层封装与状态管理</h2>
    <p class="learn-desc">
      企业级前端不只是写页面，还需要合理的数据层架构。
      这里学习如何封装请求、管理全局状态。
    </p>

    <nav class="arch-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['arch-btn', { active: currentTab === tab.id }]"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </nav>

    <!-- Service 封装 -->
    <div v-if="currentTab === 'service'" class="tab-section">
      <h3>Service 层封装</h3>
      <p class="section-desc">
        把 HTTP 请求按业务模块封装，统一管理接口调用。
        好处：统一入口、类型安全、易于 Mock 和维护。
      </p>

      <!-- 架构图示 -->
      <div class="arch-diagram">
        <div class="arch-layer">
          <div class="layer-box component-layer">组件（.vue）</div>
          <p class="layer-desc">调用 service 方法获取数据</p>
        </div>
        <div class="arch-arrow">↓ 调用</div>
        <div class="arch-layer">
          <div class="layer-box service-layer">Service 层（service.ts）</div>
          <p class="layer-desc">按模块封装请求，定义类型</p>
        </div>
        <div class="arch-arrow">↓ 使用</div>
        <div class="arch-layer">
          <div class="layer-box plugin-layer">请求插件（request.js）</div>
          <p class="layer-desc">axios 实例，拦截器，统一错误处理</p>
        </div>
        <div class="arch-arrow">↓ 发送</div>
        <div class="arch-layer">
          <div class="layer-box api-layer">后端 API</div>
          <p class="layer-desc">/api/m/crm/commercial/...</p>
        </div>
      </div>

      <h4>Service 层代码（service.ts）</h4>
      <pre class="code-block">{{ serviceCode }}</pre>

      <h4>请求插件代码（request.js）</h4>
      <pre class="code-block">{{ requestPluginCode }}</pre>
    </div>

    <!-- Pinia -->
    <div v-if="currentTab === 'pinia'" class="tab-section">
      <h3>Pinia 状态管理</h3>
      <p class="section-desc">
        当多个组件需要共享数据时（如当前登录用户、项目详情），
        通过 props 逐层传递太麻烦。Pinia 提供"全局状态容器"。
      </p>

      <!-- 为什么要状态管理 -->
      <div class="problem-solution">
        <div class="problem-card">
          <h4>❌ 没有状态管理</h4>
          <pre class="code-block" v-pre>祖父组件
  └─ 传 props → 父组件
       └─ 传 props → 子组件
            └─ 传 props → 孙组件

// 问题：
// 1. 层层传递，中间组件不需要数据也要转发
// 2. 数据修改需要逐层 emit
// 3. 难以追踪数据变化</pre>
        </div>
        <div class="solution-card">
          <h4>✅ 用 Pinia</h4>
          <pre class="code-block" v-pre>// Store 是全局的
const store = useProjectStore()

// 任何组件直接读写
祖父组件 → store.projectId = 123
孙组件   → store.projectId  // 123

// 数据变化自动响应到所有组件</pre>
        </div>
      </div>

      <h4>定义 Store（store.ts）</h4>
      <pre class="code-block">{{ piniaStoreCode }}</pre>

      <h4>在组件中使用</h4>
      <pre class="code-block">{{ piniaUsageCode }}</pre>
    </div>

    <!-- Composables -->
    <div v-if="currentTab === 'composable'" class="tab-section">
      <h3>Composables（组合式函数）</h3>
      <p class="section-desc">
        把可复用的逻辑封装为函数，是 Vue 3 推荐的逻辑复用方式。
        比 Pinia 更轻量，适合组件级别的逻辑复用。
      </p>

      <div class="tip-box">
        <strong>💡 Composable vs Pinia 的区别</strong>
        <p>
          Composable：适合组件级逻辑复用（如滚动监听、表单验证），每个组件有独立的状态。<br>
          Pinia：适合全局状态共享（如用户信息、项目数据），所有组件共享同一份数据。
        </p>
      </div>

      <h4>示例 1：待办事项管理（本项目已使用）</h4>
      <pre class="code-block">{{ composableCode }}</pre>

      <h4>示例 2：滚动控制 Header 显示（参考项目 profileHook）</h4>
      <pre class="code-block">{{ composableScrollCode }}</pre>

      <h4>使用方式</h4>
      <pre class="code-block" v-pre>// 在组件中使用 Composable
import { useScrollHeaderVisibility } from '@/composables/useScrollHeader'
import { useTodoStore } from '@/composables/useTodoStore'

// 调用函数，获取返回的数据和方法
const {{ isVisible }} = useScrollHeaderVisibility(scrollRef)
const {{ todos, addTodo }} = useTodoStore()

// 解构出来的数据是响应式的，直接在模板中使用</pre>
    </div>
  </section>
</template>

<style scoped>
.arch-learn { max-width: 800px; margin: 0 auto; }
.learn-desc { color: #666; font-size: 14px; margin-bottom: 16px; }
.arch-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.arch-btn { padding: 6px 16px; border: 2px solid #eee; background: white; border-radius: 20px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.arch-btn.active { border-color: #4fc08d; color: #4fc08d; font-weight: bold; }
.tab-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 20px; }
.tab-section h3 { margin-bottom: 12px; }
.tab-section h4 { font-size: 15px; margin: 16px 0 8px; color: #333; }
.section-desc { color: #666; font-size: 14px; margin-bottom: 16px; }
.code-block { background: #2c3e50; color: #a5d6a7; padding: 16px; border-radius: 8px; font-size: 13px; line-height: 1.6; overflow-x: auto; font-family: 'Courier New', monospace; margin-bottom: 16px; }
.arch-diagram { display: flex; flex-direction: column; align-items: center; padding: 24px; background: #f9f9f9; border-radius: 8px; margin-bottom: 20px; }
.arch-layer { text-align: center; }
.layer-box { padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px; color: white; }
.component-layer { background: #42b983; }
.service-layer { background: #3498db; }
.plugin-layer { background: #9b59b6; }
.api-layer { background: #e74c3c; }
.layer-desc { font-size: 12px; color: #999; margin-top: 4px; }
.arch-arrow { color: #ccc; font-size: 18px; margin: 8px 0; }
.problem-solution { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.problem-card, .solution-card { padding: 16px; background: #f9f9f9; border-radius: 8px; }
.problem-card h4 { color: #e74c3c; margin-bottom: 8px; }
.solution-card h4 { color: #4fc08d; margin-bottom: 8px; }
.tip-box { padding: 12px 16px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px; font-size: 13px; margin-bottom: 16px; }
.tip-box strong { display: block; margin-bottom: 4px; color: #e65100; }
@media (max-width: 768px) { .problem-solution { grid-template-columns: 1fr; } }
</style>
