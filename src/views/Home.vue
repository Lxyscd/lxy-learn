<script setup>
import { ref, computed } from 'vue'

// ref()：响应式数据。这里包了一个数组，数组里每一项是一个 { title, desc } 对象
const features = ref([
  { title: '响应式系统', desc: 'ref 和 reactive 让数据变化自动更新视图' },
  { title: '组合式 API', desc: 'setup 语法糖，逻辑复用更灵活' },
  { title: '组件化', desc: '将页面拆分为独立、可复用的组件' },
  { title: '路由系统', desc: 'vue-router 实现 SPA 单页应用页面切换' },
  { title: '状态管理', desc: 'vuex 实现组件间状态共享' }
])

// ------------------------------------------------------------
// 语法点：computed —— 计算属性
// ------------------------------------------------------------
// computed 里的箭头函数返回什么，featureCount.value 就是什么。
// 它会自动"订阅"箭头函数内部用到的响应式数据（这里是 features），
// 只有 features 变化时才会重新计算 length，否则直接用缓存的结果，不用每次都重新数一遍。
const featureCount = computed(() => features.value.length)

// 搜索关键词，配合下面的 <input v-model="keyword"> 实现双向绑定
const keyword = ref('eoe')

// ------------------------------------------------------------
// 语法点：computed + 数组的 filter() + 箭头函数
// ------------------------------------------------------------
// 这个计算属性依赖了两个响应式数据：keyword 和 features，
// 任意一个变化，filteredFeatures 都会自动重新计算
const filteredFeatures = computed(() => {
  // 如果关键词为空，直接返回全部列表，不用过滤
  if (!keyword.value) return features.value

  // f => f.title.includes(...) || f.desc.includes(...) 是箭头函数
  // .includes()：字符串方法，判断字符串里是否包含某个子串，返回 true/false
  // || 是"逻辑或"：标题包含关键词 或者 描述包含关键词，只要有一个满足就保留这一项
  return features.value.filter(f =>
    f.title.includes(keyword.value) || f.desc.includes(keyword.value)
  )
})
</script>

<template>
  <div class="home">
    <h1>欢迎来到 LXY Learn</h1>
    <p class="subtitle">一个 Vue 3 学习项目，从实践中掌握前端开发</p>

    <!-- 学习中心入口 -->
    <div class="learn-entry" @click="$router.push('/learn')">
      <span class="learn-entry-icon">📚</span>
      <div class="learn-entry-text">
        <strong>学习中心</strong>
        <span>基于 maicai-jiemo-sales 项目的前端学习路线，从 HTML 到 Vue 组件通信</span>
      </div>
      <span class="learn-entry-arrow">→</span>
    </div>

    <!-- v-model 双向绑定：输入框内容变化时，keyword 自动同步更新，反过来也一样 -->
    <div class="search-box">
      <input
        v-model="keyword"
        type="text"
        placeholder="搜索知识点..."
        class="search-input"
      />
    </div>

    <!--
      语法点：模板里的三元表达式 + 模板插值
      keyword ? `筛选出 ${filteredFeatures.length} 个` : '全部展示'
      意思是："如果 keyword 有值（搜索框非空），就显示筛选结果数量；否则显示'全部展示'"
      反引号 ` ` 包裹的是"模板字符串"，${} 里可以直接嵌入变量或表达式
    -->
    <p class="stats">共 {{ featureCount }} 个知识点，{{ keyword ? `筛选出 ${filteredFeatures.length} 个` : '全部展示' }}</p>

    <!--
      语法点：v-for="(item, index) in filteredFeatures" —— 带下标的列表渲染
      item 是当前遍历到的元素，index 是它的下标（从 0 开始）
      这里用 index 当 :key，因为 features 里的数据没有唯一 id 字段；
      更严谨的做法是给每条数据加一个唯一 id 再用 id 当 key（TodoList 里就是这么做的）
    -->
    <div class="feature-list">
      <div
        v-for="(item, index) in filteredFeatures"
        :key="index"
        class="feature-card"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </div>

    <!-- v-if：条件渲染，只有搜索结果为空时才显示这段提示 -->
    <div v-if="filteredFeatures.length === 0" class="empty">
      没有找到匹配的知识点
    </div>
  </div>
</template>

<style scoped>
.home h1 {
  color: #2c3e50;
  font-size: 28px;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 24px;
}

.learn-entry {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #4fc08d, #42b983);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 24px;
}

.learn-entry:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(79, 192, 141, 0.3);
}

.learn-entry-icon {
  font-size: 32px;
}

.learn-entry-text {
  flex: 1;
}

.learn-entry-text strong {
  display: block;
  font-size: 18px;
  margin-bottom: 4px;
}

.learn-entry-text span {
  font-size: 13px;
  opacity: 0.9;
}

.learn-entry-arrow {
  font-size: 20px;
}

.search-box {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #4fc08d;
}

.stats {
  color: #999;
  font-size: 13px;
  margin-bottom: 16px;
}

.feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.feature-card {
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #4fc08d;
  margin-bottom: 8px;
  font-size: 17px;
}

.feature-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.empty {
  text-align: center;
  color: #999;
  padding: 40px;
}

@media (max-width: 600px) {
  .feature-list {
    grid-template-columns: 1fr;
  }
}
</style>
