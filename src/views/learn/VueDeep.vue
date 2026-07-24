<script setup>
/**
 * ==========================================
 * 📖 学习模块：Vue 深入 - Composition API
 * ==========================================
 *
 * 对应学城文档：第十五章「Vue 深入：从 Options API 到 Composition API」
 * 参考项目：maicai-jiemo-sales/src/components/LeadDetail/index.vue
 *
 * 学习目标：
 *   1. 理解 Options API vs Composition API 的区别
 *   2. 掌握 ref / reactive / computed / watch
 *   3. 理解生命周期钩子
 *   4. 了解 provide / inject 跨层级通信
 *
 * 类比（Java 后端同学）：
 *   - Options API ≈ Spring 的 XML 配置（按类型分散配置）
 *   - Composition API ≈ Spring 的注解配置（按功能聚合）
 *   - ref() ≈ AtomicReference（包装一个值，通过 .value 访问）
 *   - computed() ≈ 缓存方法（依赖不变就不重新计算）
 *   - watch() ≈ 观察者模式（监听变化并响应）
 *   - onMounted() ≈ @PostConstruct（初始化后执行）
 */

import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

// ============================================================
// 当前展示的主题
// ============================================================
const currentTopic = ref('ref_reactive')

const topics = [
  { id: 'ref_reactive', name: 'ref vs reactive' },
  { id: 'computed', name: 'computed' },
  { id: 'watch', name: 'watch' },
  { id: 'lifecycle', name: '生命周期' },
  { id: 'options_vs_comp', name: '两种写法对比' }
]

// ============================================================
// 1. ref vs reactive 演示
// ============================================================

// --- ref 的用法 ---
// ref 适合：基本类型（string/number/boolean）或需要替换整个对象时
// 特点：通过 .value 访问和修改（模板中自动解包）
const refCount = ref(0)
const refName = ref('吕鑫宇')
const refUser = ref({ name: '张三', age: 25 })

function incrementRefCount() {
  refCount.value++  // JS 中必须用 .value
}

function replaceRefUser() {
  // ref 可以直接替换整个对象（reactive 不行）
  refUser.value = { name: '李四', age: 30 }
}

// --- reactive 的用法 ---
// reactive 适合：对象/数组，不需要替换整个引用
// 特点：直接访问属性，不需要 .value
const reactiveState = reactive({
  count: 0,
  user: { name: '王五', age: 28 },
  list: [1, 2, 3]
})

function incrementReactiveCount() {
  reactiveState.count++  // 直接访问，不需要 .value
}

function addReactiveItem() {
  reactiveState.list.push(reactiveState.list.length + 1)
}

// ============================================================
// 2. computed 计算属性演示
// ============================================================

// 计算属性：依赖其他响应式数据，自动计算，有缓存
// 只有依赖变化时才重新计算，否则返回缓存值

// 基础数据
const price = ref(100)
const quantity = ref(3)
const discount = ref(0.9)  // 9 折

// 计算属性：总价 = 价格 × 数量 × 折扣
const totalPrice = computed(() => {
  return (price.value * quantity.value * discount.value).toFixed(2)
})

// 计算属性：折扣后省了多少钱
const savedAmount = computed(() => {
  return (price.value * quantity.value * (1 - discount.value)).toFixed(2)
})

// 计算属性：可读可写（较少用，但要知道）
const fullName = ref('张 三')
const firstName = computed({
  get() {
    return fullName.value.split(' ')[0]
  },
  set(val) {
    fullName.value = val + ' ' + fullName.value.split(' ')[1]
  }
})

// 对比：如果用普通函数，每次调用都会重新计算（没有缓存）
function calculateTotal() {
  return (price.value * quantity.value * discount.value).toFixed(2)
}

// ============================================================
// 3. watch 侦听器演示
// ============================================================

const watchInput = ref('')
const watchLog = ref([])

// 侦听单个 ref
watch(watchInput, (newVal, oldVal) => {
  watchLog.value.unshift(`输入从 "${oldVal}" 变为 "${newVal}"`)
  if (watchLog.value.length > 5) watchLog.value.pop()
})

// 侦听多个源
const multiA = ref(0)
const multiB = ref(0)
const multiLog = ref([])

watch([multiA, multiB], ([newA, newB], [oldA, oldB]) => {
  multiLog.value.unshift(`A: ${oldA}→${newA}, B: ${oldB}→${newB}`)
  if (multiLog.value.length > 5) multiLog.value.pop()
})

// 深度侦听（监听对象内部变化）
const deepObj = ref({ a: { b: 1 } })
const deepLog = ref([])

watch(
  deepObj,
  (newVal) => {
    deepLog.value.unshift(`deepObj.a.b 变为 ${newVal.a.b}`)
    if (deepLog.value.length > 5) deepLog.value.pop()
  },
  { deep: true }  // deep: true 才能侦听嵌套属性变化
)

function changeDeep() {
  deepObj.value.a.b++
}

// ============================================================
// 4. 生命周期演示
// ============================================================

const lifecycleLog = ref([
  '⏳ 组件尚未创建...'
])

// onMounted：组件挂载到 DOM 后执行（最常用）
// 类比 Java 的 @PostConstruct
onMounted(() => {
  lifecycleLog.value.push('✅ onMounted: 组件已挂载到 DOM')
  lifecycleLog.value.push('   - 可以访问 DOM 元素了')
  lifecycleLog.value.push('   - 适合在这里发请求、初始化第三方库')
})

// onUnmounted：组件销毁前执行
// 类比 Java 的 @PreDestroy
onUnmounted(() => {
  console.log('组件已销毁，清理定时器、事件监听等')
})

// ============================================================
// 5. Options API vs Composition API 代码对比
// ============================================================

const optionsCode = `// Options API（Vue 2 传统写法）
export default {
  data() {
    return {
      loading: true,
      list: []
    }
  },
  computed: {
    total() {
      return this.list.length
    }
  },
  methods: {
    async fetchList() {
      this.list = await getList()
      this.loading = false
    }
  },
  mounted() {
    this.fetchList()
  }
}`

const compositionCode = `// Composition API（Vue 3 / Vue 2.7 推荐写法）
import { ref, computed, onMounted } from 'vue'

const loading = ref(true)
const list = ref([])

const total = computed(() => list.value.length)

async function fetchList() {
  list.value = await getList()
  loading.value = false
}

onMounted(() => {
  fetchList()
})`
</script>

<template>
  <section class="vue-learn">
    <h2>Vue 深入：Composition API</h2>
    <p class="learn-desc">
      这是 Vue 最核心的知识点。掌握 Composition API 就掌握了 Vue 3 的开发方式。
    </p>

    <nav class="topic-tabs">
      <button
        v-for="topic in topics"
        :key="topic.id"
        :class="['topic-btn', { active: currentTopic === topic.id }]"
        @click="currentTopic = topic.id"
      >
        {{ topic.name }}
      </button>
    </nav>

    <!-- ref vs reactive -->
    <div v-if="currentTopic === 'ref_reactive'" class="topic-section">
      <h3>ref vs reactive</h3>
      <div class="code-block">
        <pre v-pre>// ref：适用于基本类型，通过 .value 访问
const count = ref(0)
count.value++  // ✅ 修改值

// ref 也可包装对象，且可以替换整个对象
const user = ref({{ name: '张三' }})
user.value.name = '李四'  // ✅ 修改属性
user.value = {{ name: '王五' }}  // ✅ 替换整个对象

// reactive：适用于对象，直接访问属性
const state = reactive({{ count: 0 }})
state.count++  // ✅ 直接访问，不需要 .value
// state = {{}}  // ❌ 不能重新赋值！</pre>
      </div>

      <div class="demo-grid">
        <div class="demo-card">
          <h4>ref 演示</h4>
          <p>count: {{ refCount }}</p>
          <button @click="incrementRefCount" class="demo-btn">count + 1</button>
          <p>name: {{ refName }}</p>
          <p>user: {{ refUser }}</p>
          <button @click="replaceRefUser" class="demo-btn">替换整个 user</button>
        </div>
        <div class="demo-card">
          <h4>reactive 演示</h4>
          <p>state.count: {{ reactiveState.count }}</p>
          <button @click="incrementReactiveCount" class="demo-btn">count + 1</button>
          <p>state.list: [{{ reactiveState.list.join(', ') }}]</p>
          <button @click="addReactiveItem" class="demo-btn">list push</button>
        </div>
      </div>

      <div class="tip-box">
        <strong>💡 建议</strong>
        <p>初学者统一用 ref，行为更一致。模板中 ref 会自动解包（不需要写 .value）。</p>
      </div>
    </div>

    <!-- computed -->
    <div v-if="currentTopic === 'computed'" class="topic-section">
      <h3>computed 计算属性</h3>
      <div class="code-block">
        <pre v-pre>// 计算属性：依赖其他响应式数据，自动计算，有缓存
const price = ref(100)
const quantity = ref(3)
const discount = ref(0.9)

// 只有 price/quantity/discount 变化时才重新计算
const totalPrice = computed(() => {{
  return (price.value * quantity.value * discount.value).toFixed(2)
}})

// 可读可写的 computed（较少用）
const firstName = computed({{
  get() {{ return fullName.value.split(' ')[0] }},
  set(val) {{ fullName.value = val + ' ' + ... }}
}})</pre>
      </div>

      <div class="demo-box">
        <div class="input-group">
          <label>单价：¥{{ price }}</label>
          <input type="range" v-model.number="price" min="1" max="500" />
        </div>
        <div class="input-group">
          <label>数量：{{ quantity }}</label>
          <input type="range" v-model.number="quantity" min="1" max="20" />
        </div>
        <div class="input-group">
          <label>折扣：{{ discount }}（{{ (discount * 10).toFixed(1) }}折）</label>
          <input type="range" v-model.number="discount" min="0.1" max="1" step="0.1" />
        </div>

        <div class="computed-result">
          <div class="result-row">
            <span>总价（computed）：</span>
            <strong>¥{{ totalPrice }}</strong>
          </div>
          <div class="result-row">
            <span>省了：</span>
            <strong>¥{{ savedAmount }}</strong>
          </div>
        </div>
      </div>

      <div class="tip-box">
        <strong>💡 computed vs methods 的区别</strong>
        <p>computed 有缓存：依赖不变时多次访问只计算一次。methods 每次调用都重新计算。</p>
      </div>
    </div>

    <!-- watch -->
    <div v-if="currentTopic === 'watch'" class="topic-section">
      <h3>watch 侦听器</h3>
      <div class="code-block">
        <pre v-pre>// 侦听单个 ref
watch(watchInput, (newVal, oldVal) => {{
  console.log(`从 ${{oldVal}} 变为 ${{newVal}}`)
}})

// 侦听多个源
watch([a, b], ([newA, newB], [oldA, oldB]) => {{
  console.log('a 或 b 变了')
}})

// 深度侦听（监听对象内部属性变化）
watch(deepObj, (newVal) => {{
  // ...
}}, {{ deep: true }})

// 立即执行 + 深度侦听
watch(source, callback, {{
  immediate: true,  // 创建时立即执行一次
  deep: true        // 深度侦听嵌套属性
}})</pre>
      </div>

      <div class="demo-grid">
        <div class="demo-card">
          <h4>单个侦听</h4>
          <input v-model="watchInput" placeholder="输入试试..." class="text-input" />
          <div class="log-area">
            <div v-for="(log, i) in watchLog" :key="i" class="log-line">{{ log }}</div>
          </div>
        </div>
        <div class="demo-card">
          <h4>多源侦听</h4>
          <div class="multi-controls">
            <button @click="multiA++" class="demo-btn">A+1 ({{ multiA }})</button>
            <button @click="multiB++" class="demo-btn">B+1 ({{ multiB }})</button>
          </div>
          <div class="log-area">
            <div v-for="(log, i) in multiLog" :key="i" class="log-line">{{ log }}</div>
          </div>
        </div>
        <div class="demo-card">
          <h4>深度侦听</h4>
          <p>deepObj.a.b = {{ deepObj.a.b }}</p>
          <button @click="changeDeep" class="demo-btn">deepObj.a.b + 1</button>
          <div class="log-area">
            <div v-for="(log, i) in deepLog" :key="i" class="log-line">{{ log }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 生命周期 -->
    <div v-if="currentTopic === 'lifecycle'" class="topic-section">
      <h3>生命周期钩子</h3>
      <p class="learn-desc">
        组件从创建到销毁的过程，Vue 会在特定时机调用对应的"钩子函数"。
        你在钩子里写代码，就能在正确的时机执行。
      </p>

      <div class="lifecycle-table">
        <table>
          <thead>
            <tr>
              <th>Options API</th>
              <th>Composition API</th>
              <th>触发时机</th>
              <th>常见用途</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>beforeCreate</td><td>setup() 开始</td><td>实例初始化</td><td>很少直接用</td></tr>
            <tr><td>created</td><td>setup() 内同步</td><td>数据观测完成</td><td>初始化数据</td></tr>
            <tr><td>beforeMount</td><td>onBeforeMount</td><td>挂载 DOM 前</td><td>很少用</td></tr>
            <tr><td><strong>mounted</strong></td><td><strong>onMounted</strong></td><td>DOM 挂载完成</td><td>发请求、操作DOM、初始化第三方库</td></tr>
            <tr><td>beforeUpdate</td><td>onBeforeUpdate</td><td>数据更新前</td><td>获取更新前DOM状态</td></tr>
            <tr><td>updated</td><td>onUpdated</td><td>数据更新后</td><td>操作更新后的DOM</td></tr>
            <tr><td>beforeDestroy</td><td>onBeforeUnmount</td><td>组件销毁前</td><td>清理定时器、事件监听</td></tr>
            <tr><td>destroyed</td><td>onUnmounted</td><td>组件销毁后</td><td>最终清理</td></tr>
          </tbody>
        </table>
      </div>

      <div class="demo-box">
        <h4>当前组件生命周期日志：</h4>
        <div class="lifecycle-log">
          <div v-for="(log, i) in lifecycleLog" :key="i" class="log-line">{{ log }}</div>
        </div>
      </div>
    </div>

    <!-- Options vs Composition 对比 -->
    <div v-if="currentTopic === 'options_vs_comp'" class="topic-section">
      <h3>Options API vs Composition API</h3>
      <div class="compare-grid">
        <div class="compare-card">
          <h4>Options API（Vue 2 传统）</h4>
          <pre class="compare-code">{{ optionsCode }}</pre>
          <p class="compare-desc">
            逻辑按类型分散在 data、methods、computed 中。
            同一个功能的代码散落在不同选项里。
          </p>
        </div>
        <div class="compare-card">
          <h4>Composition API（推荐）</h4>
          <pre class="compare-code">{{ compositionCode }}</pre>
          <p class="compare-desc">
            相关逻辑聚合在一起，通过 Composables 跨组件复用。
            TypeScript 支持更好。
          </p>
        </div>
      </div>

      <div class="tip-box">
        <strong>💡 为什么推荐 Composition API？</strong>
        <p>
          1. 逻辑聚合：同一功能的代码在一起，不用跳来跳去
          2. 逻辑复用：Composables 比 mixins 更清晰，没有命名冲突
          3. 类型安全：TypeScript 支持完整
          4. 体积更小：没用到的 API 不会打包进去（树摇优化）
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vue-learn { max-width: 800px; margin: 0 auto; }
.learn-desc { color: #666; font-size: 14px; margin-bottom: 16px; }
.topic-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.topic-btn { padding: 6px 16px; border: 2px solid #eee; background: white; border-radius: 20px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.topic-btn.active { border-color: #4fc08d; color: #4fc08d; font-weight: bold; }
.topic-section { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 20px; }
.topic-section h3 { margin-bottom: 16px; }
.code-block { background: #2c3e50; color: #a5d6a7; padding: 16px; border-radius: 8px; font-size: 13px; line-height: 1.6; overflow-x: auto; font-family: 'Courier New', monospace; margin-bottom: 16px; }
.demo-box { padding: 16px; background: #f9f9f9; border-radius: 8px; margin-bottom: 16px; }
.demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-bottom: 16px; }
.demo-card { padding: 16px; background: #f9f9f9; border-radius: 8px; }
.demo-card h4 { font-size: 14px; margin-bottom: 12px; color: #333; }
.demo-btn { padding: 6px 14px; background: #4fc08d; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; margin-right: 4px; margin-bottom: 4px; }
.demo-btn:hover { background: #42b983; }
.tip-box { padding: 12px 16px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px; font-size: 13px; }
.tip-box strong { display: block; margin-bottom: 4px; color: #e65100; }
.text-input { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; margin-bottom: 8px; }
.input-group { margin-bottom: 12px; }
.input-group label { display: block; font-size: 13px; color: #666; margin-bottom: 4px; }
.computed-result { margin-top: 16px; padding: 12px; background: white; border-radius: 8px; }
.result-row { display: flex; justify-content: space-between; font-size: 15px; margin-bottom: 8px; }
.result-row strong { color: #4fc08d; }
.log-area { margin-top: 8px; background: #1a1a2e; border-radius: 6px; padding: 8px 12px; min-height: 60px; }
.log-line { font-family: 'Courier New', monospace; font-size: 12px; color: #a5d6a7; line-height: 1.8; }
.lifecycle-table { overflow-x: auto; margin-bottom: 16px; }
.lifecycle-table table { width: 100%; border-collapse: collapse; font-size: 13px; }
.lifecycle-table th, .lifecycle-table td { border: 1px solid #eee; padding: 8px 12px; text-align: left; }
.lifecycle-table th { background: #f5f5f5; }
.lifecycle-log { background: #1a1a2e; border-radius: 6px; padding: 12px; }
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.compare-card { padding: 16px; background: #f9f9f9; border-radius: 8px; }
.compare-card h4 { margin-bottom: 12px; }
.compare-code { background: #2c3e50; color: #a5d6a7; padding: 12px; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow-x: auto; font-family: 'Courier New', monospace; }
.compare-desc { font-size: 13px; color: #666; margin-top: 8px; }
.multi-controls { display: flex; gap: 8px; margin-bottom: 8px; }
@media (max-width: 768px) { .compare-grid { grid-template-columns: 1fr; } }
</style>
