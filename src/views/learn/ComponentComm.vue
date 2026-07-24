<script setup>
/**
 * ==========================================
 * 📖 学习模块：组件通信与组织
 * ==========================================
 *
 * 对应学城文档：第四章「组件通信与组织」
 * 参考项目：maicai-jiemo-sales/src/components/ReportDetail/
 *
 * 学习目标：
 *   1. 理解父传子（props）
 *   2. 理解子传父（emits）
 *   3. 理解 v-model 双向绑定原理
 *   4. 掌握组件拆分原则
 *   5. 理解容器组件 vs 展示组件
 *
 * 组件通信类比（Java 后端同学）：
 *   - props ≈ 构造函数参数（父传子，只读）
 *   - emits ≈ 事件回调/监听器（子传父，通知）
 *   - v-model ≈ 双向绑定的语法糖（props + emits 的组合）
 *   - provide/inject ≈ Spring 的 ApplicationContext（跨层级共享）
 */

import { ref, computed } from 'vue'

// ============================================================
// 演示数据：模拟"门店详情"页面的数据流
// 参考项目中的 ReportDetail 组件结构
// ============================================================

// 门店数据（模拟从后端接口获取的数据）
const storeData = ref({
  storeId: 10001,
  storeName: '小象超市·朝阳店',
  city: '北京',
  area: '朝阳区',
  monthlySales: 158000,
  status: '营业中'
})

// ============================================================
// 父→子通信：通过 props 传递数据
// ============================================================
// props 是"只读"的，子组件不能直接修改
// 这就像 Java 中方法参数是 final 的，你不能改传入的引用

// ============================================================
// 子→父通信：通过 emits 发送事件
// ============================================================
// 子组件通过 emit "通知"父组件发生了什么
// 父组件在模板上用 @事件名 监听

// 处理子组件发出的"编辑门店名称"事件
function handleUpdateName(newName) {
  storeData.value.storeName = newName
}

// 处理子组件发出的"状态切换"事件
function handleToggleStatus() {
  storeData.value.status = storeData.value.status === '营业中' ? '休息中' : '营业中'
}

// ============================================================
// v-model 演示：双向绑定的语法糖
// ============================================================

// v-model 实际上是两步操作的简写：
// :modelValue="searchKeyword" + @update:modelValue="searchKeyword = $event"
const searchKeyword = ref('')

// ============================================================
// 组件拆分演示：模拟 ReportDetail 的结构
// ============================================================

const componentStructure = `ReportDetail/（真实项目结构）
├── index.vue              # 容器组件：获取数据、整合各模块
├── components/
│   ├── ReportHeader.vue   # 展示组件：只负责显示头部
│   ├── BasicInfo/         # 展示组件：只负责显示基础信息
│   ├── BusinessAnalysis/  # 展示组件：只负责经营分析
│   └── SignInfo/          # 展示组件：只负责签约信息
├── service.ts             # 数据请求层
├── type.ts                # 类型定义
└── utils.ts               # 模块工具函数`

// 拆分原则说明
const splitPrinciples = [
  { rule: '单一职责', desc: '一个组件只做一件事，Header 只管头部，BasicInfo 只管基础信息' },
  { rule: '超过 300 行考虑拆分', desc: '当组件代码过长时，按功能模块拆分为子组件' },
  { rule: 'Props 向下，Events 向上', desc: '数据从父传子（props），事件从子传父（emits）' },
  { rule: '不要在子组件修改 props', desc: 'props 是只读的，要改就 emit 事件让父组件改' },
  { rule: '容器 vs 展示分离', desc: '容器组件管数据和逻辑，展示组件管 UI 渲染' }
]

// ============================================================
// 容器组件 vs 展示组件对比
// ============================================================
const containerVsPresentational = [
  {
    type: '容器组件（Smart）',
    role: '负责数据获取、状态管理、业务逻辑',
    example: 'ReportDetail/index.vue',
    code: `// 容器组件
const loading = ref(true)
const detail = ref(null)

async function fetchDetail() {
  const data = await getReportDetail(id)
  detail.value = data
  loading.value = false
}

onMounted(() => fetchDetail())`
  },
  {
    type: '展示组件（Dumb）',
    role: '负责 UI 渲染，接收 props 和事件',
    example: 'ReportHeader.vue',
    code: `// 展示组件
const props = defineProps({
  title: String,
  status: String
})

const emit = defineEmits(['refresh'])`
  }
]
</script>

<template>
  <section class="comp-learn">
    <h2>组件通信与组织</h2>
    <p class="learn-desc">
      这是企业级前端开发的核心：如何把一个复杂页面拆成多个组件，
      以及组件之间如何传递数据。
    </p>

    <!-- ===== 父子通信演示 ===== -->
    <div class="section-card">
      <h3>父子组件通信演示</h3>
      <p class="section-desc">
        下面模拟一个"门店详情卡片"：父组件持有数据，
        通过 props 传给子组件展示；子组件的按钮点击通过 emit 通知父组件修改。
      </p>

      <!--
        父组件模板
        :store-data="storeData"  →  把父组件的数据通过 props 传给子组件
        @update-name="handleUpdateName"  →  监听子组件的 update-name 事件
        @toggle-status="handleToggleStatus"  →  监听子组件的 toggle-status 事件
      -->
      <div class="demo-container">
        <div class="parent-area">
          <h4>📦 父组件（ParentComp）</h4>
          <p class="role-tag">职责：持有数据、处理业务逻辑</p>

          <!-- 这里模拟子组件的展示效果 -->
          <!-- 实际项目中会写成 <StoreCard :store-data="..." @update-name="..." /> -->
          <div class="mock-child">
            <h4>🎫 子组件（StoreCard）</h4>
            <p class="role-tag">职责：展示数据、发出事件</p>

            <div class="store-info">
              <div class="info-row">
                <span class="label">门店ID：</span>
                <span>{{ storeData.storeId }}</span>
              </div>
              <div class="info-row">
                <span class="label">门店名称：</span>
                <span>{{ storeData.storeName }}</span>
              </div>
              <div class="info-row">
                <span class="label">城市区域：</span>
                <span>{{ storeData.city }} · {{ storeData.area }}</span>
              </div>
              <div class="info-row">
                <span class="label">月销售额：</span>
                <span>¥{{ storeData.monthlySales.toLocaleString() }}</span>
              </div>
              <div class="info-row">
                <span class="label">状态：</span>
                <span :class="['status-tag', storeData.status === '营业中' ? 'open' : 'closed']">
                  {{ storeData.status }}
                </span>
              </div>
            </div>

            <!-- 子组件的按钮，点击后 emit 事件给父组件 -->
            <div class="child-actions">
              <button @click="handleUpdateName(storeData.storeName + '（已更新）')" class="demo-btn">
                emit('update-name')
              </button>
              <button @click="handleToggleStatus" class="demo-btn">
                emit('toggle-status')
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 代码展示 -->
      <div class="code-comparison">
        <div class="code-side">
          <h5>父组件模板</h5>
          <pre class="code-block" v-pre>&lt;!-- 父传子：通过 props 传递数据 --&gt;
&lt;StoreCard
  :store-data="storeData"
  @update-name="handleUpdateName"
  @toggle-status="handleToggleStatus"
/&gt;

&lt;script setup&gt;
// 父组件持有数据
const storeData = ref({{ ... }})

// 处理子组件事件
function handleUpdateName(newName) {{
  storeData.value.storeName = newName
}}
&lt;/script&gt;</pre>
        </div>
        <div class="code-side">
          <h5>子组件代码</h5>
          <pre class="code-block" v-pre>&lt;script setup&gt;
// 接收父组件传来的 props
const props = defineProps({{
  storeData: Object  // 类型约束
}})

// 声明要发出的事件
const emit = defineEmits([
  'update-name',
  'toggle-status'
])

// 点击按钮时通知父组件
function onEditName() {{
  emit('update-name', newName)
}}
&lt;/script&gt;</pre>
        </div>
      </div>
    </div>

    <!-- ===== v-model 原理 ===== -->
    <div class="section-card">
      <h3>v-model 双向绑定原理</h3>
      <p class="section-desc">
        v-model 是 props + emits 的语法糖，让父子组件可以"双向同步"数据。
      </p>

      <div class="demo-box">
        <input v-model="searchKeyword" placeholder="输入搜索关键词..." class="text-input" />
        <p>searchKeyword 的值：<code>{{ searchKeyword }}</code></p>
      </div>

      <pre class="code-block" v-pre>&lt;!-- v-model 是以下两步的简写 --&gt;
&lt;CustomInput
  :modelValue="searchKeyword"
  @update:modelValue="searchKeyword = $event"
/&gt;

&lt;!-- 简写为 --&gt;
&lt;CustomInput v-model="searchKeyword" /&gt;

&lt;!-- 子组件内部实现 --&gt;
&lt;script setup&gt;
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function onInput(e) {{
  emit('update:modelValue', e.target.value)
}}
&lt;/script&gt;</pre>
    </div>

    <!-- ===== 组件拆分原则 ===== -->
    <div class="section-card">
      <h3>组件拆分原则</h3>
      <p class="section-desc">
        参考项目 ReportDetail 组件的真实拆分结构：
      </p>

      <pre class="code-block">{{ componentStructure }}</pre>

      <div class="principles-list">
        <div v-for="p in splitPrinciples" :key="p.rule" class="principle-item">
          <strong>{{ p.rule }}</strong>
          <span>{{ p.desc }}</span>
        </div>
      </div>
    </div>

    <!-- ===== 容器 vs 展示 ===== -->
    <div class="section-card">
      <h3>容器组件 vs 展示组件</h3>
      <div class="compare-grid">
        <div v-for="item in containerVsPresentational" :key="item.type" class="compare-card">
          <h4>{{ item.type }}</h4>
          <p class="compare-role">{{ item.role }}</p>
          <p class="compare-example">示例：{{ item.example }}</p>
          <pre class="code-block">{{ item.code }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comp-learn { max-width: 800px; margin: 0 auto; }
.learn-desc { color: #666; font-size: 14px; margin-bottom: 16px; }
.section-card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 20px; }
.section-card h3 { margin-bottom: 12px; }
.section-desc { color: #666; font-size: 14px; margin-bottom: 16px; }
.demo-container { border: 2px dashed #4fc08d; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
.parent-area h4, .mock-child h4 { font-size: 14px; margin-bottom: 4px; }
.role-tag { font-size: 12px; color: #999; margin-bottom: 12px; }
.mock-child { margin-top: 16px; border-top: 1px dashed #ccc; padding-top: 16px; }
.store-info { background: #f9f9f9; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.info-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
.info-row .label { color: #999; }
.status-tag { padding: 2px 8px; border-radius: 4px; font-size: 12px; }
.status-tag.open { background: #e8f5e9; color: #2e7d32; }
.status-tag.closed { background: #ffebee; color: #c62828; }
.child-actions { display: flex; gap: 8px; }
.demo-btn { padding: 6px 14px; background: #4fc08d; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; }
.demo-btn:hover { background: #42b983; }
.code-comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.code-side h5 { font-size: 13px; margin-bottom: 6px; color: #666; }
.code-block { background: #2c3e50; color: #a5d6a7; padding: 12px; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow-x: auto; font-family: 'Courier New', monospace; }
.demo-box { padding: 16px; background: #f9f9f9; border-radius: 8px; margin-bottom: 12px; }
.text-input { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; margin-bottom: 8px; }
.principles-list { display: flex; flex-direction: column; gap: 8px; }
.principle-item { padding: 10px 14px; background: #f9f9f9; border-radius: 6px; border-left: 3px solid #4fc08d; font-size: 13px; }
.principle-item strong { color: #333; margin-right: 8px; }
.principle-item span { color: #666; }
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.compare-card { padding: 16px; background: #f9f9f9; border-radius: 8px; }
.compare-card h4 { margin-bottom: 8px; }
.compare-role { font-size: 13px; color: #666; margin-bottom: 4px; }
.compare-example { font-size: 12px; color: #999; margin-bottom: 8px; font-family: 'Courier New', monospace; }
@media (max-width: 768px) { .code-comparison, .compare-grid { grid-template-columns: 1fr; } }
</style>
