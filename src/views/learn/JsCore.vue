<script setup>
/**
 * ==========================================
 * 📖 学习模块：JavaScript 核心 - ES6+ 语法
 * ==========================================
 *
 * 对应学城文档：第十四章「JavaScript 核心：从 ES5 到 ES6+」
 *
 * 学习目标：
 *   1. 理解 let / const / var 的区别
 *   2. 掌握箭头函数
 *   3. 理解解构赋值
 *   4. 掌握模板字符串
 *   5. 理解 Promise 和 async/await
 *   6. 掌握常用数组方法
 *
 * Java 后端同学特别注意：
 *   - JS 是动态弱类型语言，变量类型可以随时改变
 *   - JS 没有 Java 那种编译期类型检查（TypeScript 弥补了这个不足）
 *   - JS 的 this 指向比 Java 复杂得多
 *   - JS 数组没有固定长度，可以随时 push/pop
 *   - JS 对象 ≈ Java 的 Map，键都是字符串
 */

import { ref, computed } from 'vue'

// ============================================================
// 当前展示的示例
// ============================================================
const currentTopic = ref('variables')

const topics = [
  { id: 'variables', name: '变量声明' },
  { id: 'arrow', name: '箭头函数' },
  { id: 'destruct', name: '解构赋值' },
  { id: 'template', name: '模板字符串' },
  { id: 'async', name: '异步编程' },
  { id: 'array', name: '数组方法' }
]

// ============================================================
// 1. 变量声明演示
// ============================================================

// const：声明后不可重新赋值（推荐默认用 const）
// 对于对象/数组，const 只保证"引用"不变，内部属性仍可修改
const constValue = ref('我是 const 声明的值')
const constObj = ref({ name: '张三', age: 25 })

// let：可以重新赋值（用于循环计数器、会变化的值）
let letValue = ref(0)

function incrementLet() {
  // .value 是 ref 的访问方式
  letValue.value++
}

function changeConstObj() {
  // 这是合法的：修改对象属性，不是重新赋值
  constObj.value.age++
}

// ============================================================
// 2. 箭头函数演示
// ============================================================

// 传统函数写法
function traditionalAdd(a, b) {
  return a + b
}

// 箭头函数写法（更简洁）
// (参数) => { 函数体 }
// 如果函数体只有一行 return，可以省略 {} 和 return
const arrowAdd = (a, b) => a + b

// 没有参数时需要空括号
const greet = () => 'Hello!'

// 一个参数时可以省略括号
const double = n => n * 2

// 箭头函数演示数据
const arrowResults = ref([
  { expr: 'traditionalAdd(3, 5)', result: traditionalAdd(3, 5) },
  { expr: 'arrowAdd(3, 5)', result: arrowAdd(3, 5) },
  { expr: 'greet()', result: greet() },
  { expr: 'double(7)', result: double(7) }
])

// ============================================================
// 3. 解构赋值演示
// ============================================================

// 对象解构：从对象中提取属性
const storeInfo = {
  storeId: 12345,
  storeName: '小象超市·朝阳店',
  address: '北京市朝阳区xxx路',
  city: '北京',
  area: '华北'
}

// 解构：直接把对象的属性"拿出来"变成变量
// 相当于 const storeId = storeInfo.storeId; const storeName = storeInfo.storeName; ...
const { storeId, storeName, address } = storeInfo

// 重命名 + 默认值
// const { storeId: id, phone = '未知' } = storeInfo
// → id = 12345, phone = '未知'（因为原对象没有 phone 属性）

// 数组解构
const [first, second, third] = [10, 20, 30]

// 展开运算符（...）
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]  // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 }
const obj2 = { ...obj1, c: 3 }  // { a: 1, b: 2, c: 3 }

const destructResults = ref([
  { expr: 'const { storeId, storeName } = storeInfo', result: `storeId=${storeId}, storeName="${storeName}"` },
  { expr: 'const { address } = storeInfo', result: `address="${address}"` },
  { expr: 'const [first, second] = [10, 20, 30]', result: `first=${first}, second=${second}` },
  { expr: '[...arr1, 4, 5]', result: `[${arr2.join(', ')}]` },
  { expr: '{ ...obj1, c: 3 }', result: JSON.stringify(obj2) }
])

// ============================================================
// 4. 模板字符串演示
// ============================================================

const userName = ref('吕鑫宇')
const userId = ref(10086)
const today = new Date().toLocaleDateString('zh-CN')

// 模板字符串用反引号（``）包裹
// ${} 内可以写任何 JavaScript 表达式
const templateString = ref(`用户 ${userName.value}（ID: ${userId.value}）在 ${today} 访问了系统`)

// 对比传统拼接
const traditionalString = ref('用户 ' + userName.value + '（ID: ' + userId.value + '）在 ' + today + ' 访问了系统')

// 模板字符串还支持多行
const multiLine = ref(`第一行
第二行
第三行`)

// ============================================================
// 5. 异步编程演示
// ============================================================

const asyncStatus = ref('idle')  // idle / loading / success / error
const asyncResult = ref('')
const asyncLog = ref([])

// 模拟一个网络请求（实际项目中用 axios/fetch）
function mockRequest(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`请求成功，耗时 ${delay}ms`)
    }, delay)
  })
}

// async/await 写法（推荐）
// async 标记函数为异步函数
// await 等待 Promise 完成，然后获取结果
async function loadData() {
  asyncStatus.value = 'loading'
  asyncLog.value = []
  asyncLog.value.push('🔄 开始加载数据...')

  try {
    // await 会"暂停"函数执行，等待 Promise 完成
    // 不会阻塞主线程（其他代码仍然可以执行）
    const result = await mockRequest(1500)
    asyncResult.value = result
    asyncStatus.value = 'success'
    asyncLog.value.push(`✅ ${result}`)

    // 并发请求：多个请求同时发出，等全部完成
    asyncLog.value.push('🔄 并发请求 2 个接口...')
    const [r1, r2] = await Promise.all([
      mockRequest(800),
      mockRequest(1200)
    ])
    asyncLog.value.push(`✅ 接口1: ${r1}`)
    asyncLog.value.push(`✅ 接口2: ${r2}`)
  } catch (err) {
    asyncStatus.value = 'error'
    asyncLog.value.push(`❌ 出错了: ${err}`)
  }
}

// ============================================================
// 6. 数组方法演示
// ============================================================

const originalList = ref([
  { id: 1, name: '门店A', sales: 12000, city: '北京' },
  { id: 2, name: '门店B', sales: 8000, city: '上海' },
  { id: 3, name: '门店C', sales: 15000, city: '北京' },
  { id: 4, name: '门店D', sales: 5000, city: '广州' },
  { id: 5, name: '门店E', sales: 20000, city: '上海' }
])

// filter：过滤，返回满足条件的新数组（不改原数组）
const filteredList = computed(() => originalList.value.filter(item => item.sales > 10000))

// map：映射，把每个元素转换成新形式（不改原数组）
const mappedList = computed(() => originalList.value.map(item => `${item.name}(${item.city}): ¥${item.sales}`))

// find：查找第一个满足条件的元素
const foundItem = computed(() => originalList.value.find(item => item.city === '上海'))

// findIndex：查找第一个满足条件的元素的索引
const foundIndex = computed(() => originalList.value.findIndex(item => item.sales === 15000))

// reduce：归约，把数组"压缩"成一个值
const totalSales = computed(() => originalList.value.reduce((sum, item) => sum + item.sales, 0))

// sort：排序（会改变原数组，所以先复制）
const sortedList = computed(() => [...originalList.value].sort((a, b) => b.sales - a.sales))

// includes：判断是否包含某元素
const hasBeijing = computed(() => originalList.value.some(item => item.city === '北京'))
</script>

<template>
  <section class="js-learn">
    <h2>JavaScript 核心：ES6+ 语法</h2>
    <p class="learn-desc">
      JavaScript 是前端的核心语言。这里演示最常用的 ES6+ 语法，
      每个示例都可以直接在代码中看到效果。
    </p>

    <!-- 主题切换 -->
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

    <!-- 1. 变量声明 -->
    <div v-if="currentTopic === 'variables'" class="topic-section">
      <h3>let / const / var</h3>
      <div class="code-block">
        <pre v-pre>// var（不推荐）：函数作用域，可重复声明，有变量提升
var oldName = '旧写法'

// let（推荐可变值）：块级作用域，可重新赋值
let count = 0
count = 1  // ✅ 合法

// const（推荐默认）：块级作用域，不可重新赋值
const name = '张三'
// name = '李四'  // ❌ 报错

// ⚠️ const 对象的属性仍可修改
const user = { name: '张三' }
user.name = '李四'  // ✅ 合法（修改属性，不是重新赋值）
// user = {}  // ❌ 报错（重新赋值）</pre>
      </div>

      <!-- 实时演示 -->
      <div class="demo-box">
        <p>const 值：<code>{{ constValue }}</code></p>
        <p>let 计数器：<code>{{ letValue }}</code></p>
        <button @click="incrementLet" class="demo-btn">let + 1</button>
        <p>const 对象：<code>{{ constObj }}</code></p>
        <button @click="changeConstObj" class="demo-btn">修改 const 对象的 age</button>
      </div>
    </div>

    <!-- 2. 箭头函数 -->
    <div v-if="currentTopic === 'arrow'" class="topic-section">
      <h3>箭头函数 Arrow Function</h3>
      <div class="code-block">
        <pre v-pre>// 传统函数
function add(a, b) {{
  return a + b
}}

// 箭头函数（更简洁）
const add = (a, b) => a + b

// 无参数
const greet = () => 'Hello!'

// 一个参数（可省略括号）
const double = n => n * 2

// 多行函数体
const process = (data) => {{
  const result = data * 2
  return result + 1
}}</pre>
      </div>

      <div class="demo-box">
        <div v-for="item in arrowResults" :key="item.expr" class="result-row">
          <code class="expr">{{ item.expr }}</code>
          <span class="arrow">→</span>
          <code class="result">{{ item.result }}</code>
        </div>
      </div>

      <div class="tip-box">
        <strong>💡 箭头函数没有自己的 this</strong>
        <p>传统函数的 this 指向调用者，容易出错。
        箭头函数继承外层的 this，更适合回调函数。</p>
      </div>
    </div>

    <!-- 3. 解构赋值 -->
    <div v-if="currentTopic === 'destruct'" class="topic-section">
      <h3>解构赋值 Destructuring</h3>
      <div class="code-block">
        <pre v-pre>// 对象解构：从对象中提取属性
const storeInfo = {{
  storeId: 12345,
  storeName: '小象超市·朝阳店',
  address: '北京市朝阳区xxx路'
}}

// 直接提取
const {{ storeId, storeName }} = storeInfo
// → storeId = 12345, storeName = '小象超市·朝阳店'

// 重命名 + 默认值
const {{ storeId: id, phone = '未知' }} = storeInfo
// → id = 12345, phone = '未知'

// 数组解构
const [first, second] = [10, 20, 30]
// → first = 10, second = 20

// 展开运算符
const arr2 = [...arr1, 4, 5]
const obj2 = {{ ...obj1, c: 3 }}</pre>
      </div>

      <div class="demo-box">
        <div v-for="item in destructResults" :key="item.expr" class="result-row">
          <code class="expr">{{ item.expr }}</code>
          <span class="arrow">→</span>
          <code class="result">{{ item.result }}</code>
        </div>
      </div>
    </div>

    <!-- 4. 模板字符串 -->
    <div v-if="currentTopic === 'template'" class="topic-section">
      <h3>模板字符串 Template String</h3>
      <div class="code-block">
        <pre v-pre>// 模板字符串用反引号（``）包裹
const name = '吕鑫宇'
const id = 10086

// ${} 内可以写任何 JavaScript 表达式
const msg = `用户 ${{name}}（ID: ${{id}}）在 ${{today}} 访问了系统`

// 对比传统拼接（繁琐易错）
const old = '用户 ' + name + '（ID: ' + id + '）在 ' + today + ' 访问了系统'

// 模板字符串还支持多行
const multi = `第一行
第二行
第三行`</pre>
      </div>

      <div class="demo-box">
        <p><strong>模板字符串结果：</strong></p>
        <p class="result-text">{{ templateString }}</p>
        <p><strong>传统拼接结果：</strong></p>
        <p class="result-text">{{ traditionalString }}</p>
        <p><strong>多行字符串：</strong></p>
        <pre class="multi-line">{{ multiLine }}</pre>
      </div>
    </div>

    <!-- 5. 异步编程 -->
    <div v-if="currentTopic === 'async'" class="topic-section">
      <h3>异步编程：Promise & async/await</h3>
      <div class="code-block">
        <pre v-pre>// Promise 链式调用
fetchData()
  .then(data => process(data))
  .catch(err => console.error(err))

// async/await（推荐，更直观）
async function loadData() {{
  try {{
    const data = await fetchData()  // 等待请求完成
    const processed = await process(data)
    return processed
  }} catch (err) {{
    console.error(err)
  }}
}}

// 并发请求（多个请求同时发出）
const [detail, list] = await Promise.all([
  getDetail(),
  getList()
])</pre>
      </div>

      <div class="demo-box">
        <button
          @click="loadData"
          class="demo-btn"
          :disabled="asyncStatus === 'loading'"
        >
          {{ asyncStatus === 'loading' ? '加载中...' : '模拟加载数据' }}
        </button>

        <div v-if="asyncLog.length" class="async-log">
          <div v-for="(log, i) in asyncLog" :key="i" class="log-line">
            {{ log }}
          </div>
        </div>
      </div>

      <div class="tip-box">
        <strong>💡 Java 后端同学注意</strong>
        <p>async/await 类似 Java 的 CompletableFuture，但语法更简洁。
        JS 是单线程的，await 不会阻塞主线程，只是"暂停"当前 async 函数的执行。</p>
      </div>
    </div>

    <!-- 6. 数组方法 -->
    <div v-if="currentTopic === 'array'" class="topic-section">
      <h3>数组方法 Array Methods</h3>
      <p class="learn-desc">原始数据：</p>
      <div class="data-table">
        <table>
          <thead>
            <tr><th>ID</th><th>名称</th><th>销售额</th><th>城市</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in originalList" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>¥{{ item.sales.toLocaleString() }}</td>
              <td>{{ item.city }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="array-results">
        <div class="result-card">
          <h4>filter（过滤 sales &gt; 10000）</h4>
          <p>{{ filteredList.map(i => i.name).join(', ') }}</p>
        </div>
        <div class="result-card">
          <h4>map（映射为字符串）</h4>
          <p v-for="item in mappedList" :key="item">{{ item }}</p>
        </div>
        <div class="result-card">
          <h4>find（查找上海的门店）</h4>
          <p>{{ foundItem ? foundItem.name : '未找到' }}</p>
        </div>
        <div class="result-card">
          <h4>findIndex（查找 sales=15000 的索引）</h4>
          <p>索引：{{ foundIndex }}</p>
        </div>
        <div class="result-card">
          <h4>reduce（总销售额）</h4>
          <p>¥{{ totalSales.toLocaleString() }}</p>
        </div>
        <div class="result-card">
          <h4>sort（按销售额降序）</h4>
          <p v-for="item in sortedList" :key="item.id">{{ item.name }}: ¥{{ item.sales.toLocaleString() }}</p>
        </div>
        <div class="result-card">
          <h4>some（是否有北京的门店）</h4>
          <p>{{ hasBeijing ? '是' : '否' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.js-learn {
  max-width: 800px;
  margin: 0 auto;
}

.learn-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

.topic-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.topic-btn {
  padding: 6px 16px;
  border: 2px solid #eee;
  background: white;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.topic-btn.active {
  border-color: #4fc08d;
  color: #4fc08d;
  font-weight: bold;
}

.topic-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.topic-section h3 {
  margin-bottom: 16px;
}

.code-block {
  background: #2c3e50;
  color: #a5d6a7;
  padding: 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  margin-bottom: 16px;
}

.demo-box {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 16px;
}

.demo-box p {
  margin-bottom: 8px;
  font-size: 14px;
}

code {
  background: #e8f5e9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
  color: #2e7d32;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
}

.result-row .arrow {
  color: #999;
}

.result-row .result {
  color: #e65100;
}

.demo-btn {
  padding: 6px 16px;
  background: #4fc08d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
}

.demo-btn:hover {
  background: #42b983;
}

.demo-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.tip-box {
  padding: 12px 16px;
  background: #fff3e0;
  border-left: 4px solid #ff9800;
  border-radius: 4px;
  font-size: 13px;
}

.tip-box strong {
  display: block;
  margin-bottom: 4px;
  color: #e65100;
}

.result-text {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #333;
}

.multi-line {
  font-size: 13px;
  color: #666;
  white-space: pre-wrap;
}

.async-log {
  margin-top: 12px;
  background: #1a1a2e;
  border-radius: 6px;
  padding: 12px;
}

.log-line {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #a5d6a7;
  line-height: 2;
}

.data-table {
  margin-bottom: 16px;
  overflow-x: auto;
}

.data-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th,
.data-table td {
  border: 1px solid #eee;
  padding: 8px 12px;
  text-align: left;
}

.data-table th {
  background: #f5f5f5;
  font-weight: 600;
}

.array-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}

.result-card {
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 3px solid #4fc08d;
}

.result-card h4 {
  font-size: 13px;
  color: #333;
  margin-bottom: 6px;
}

.result-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}
</style>
