<script setup>
/**
 * ==========================================
 * 📖 学习模块：HTML 基础 - 语义化与结构
 * ==========================================
 *
 * 对应学城文档：第十二章「HTML 基础：语义化与结构」
 *
 * 学习目标：
 *   1. 理解什么是"语义化标签"，为什么不用全 div
 *   2. 认识常见的 HTML 语义标签
 *   3. 理解表单元素的基本用法
 *
 * 什么是语义化？
 *   简单说，就是用"有意义的标签"来描述内容。
 *   比如标题就用 <h1>，导航就用 <nav>，而不是通通写 <div>。
 *   好处：① 屏幕阅读器能正确朗读 ② SEO 更好 ③ 代码更易读
 *
 * 本页面展示了一个"门店信息录入表单"的示例，
 * 所有标签都使用语义化写法。
 */

import { ref } from 'vue'

// ============================================================
// 响应式数据：表单数据
// ============================================================
// ref() 创建一个"响应式"变量
// 什么是响应式？就是当这个变量的值改变时，页面会自动更新
// ref 包裹的值需要通过 .value 来访问和修改（在 JS 中）
// 但在模板（<template>）中会自动解包，不需要写 .value

// 门店名称 - 文本输入
const storeName = ref('')

// 业态 - 下拉选择
const businessType = ref('')

// 开业日期 - 日期选择
const openDate = ref('')

// 是否有竞品 - 单选（是/否）
const hasCompetitor = ref('')

// 备注 - 多行文本
const remark = ref('')

// 业态选项列表
const businessTypes = ref([
  { value: 'supermarket', label: '超市' },
  { value: 'convenience', label: '便利店' },
  { value: 'restaurant', label: '餐饮' },
  { value: 'other', label: '其他' }
])

// ============================================================
// 方法：提交表单
// ============================================================
// 这是一个普通的函数，用 function 关键字声明
// 当用户点击"提交"按钮时会被调用
function handleSubmit() {
  // 收集所有表单数据，打印到控制台（实际项目会发送到后端）
  // console.log 是前端最常用的调试手段，类似于 Java 的 System.out.println
  console.log('表单数据：', {
    storeName: storeName.value,       // 注意：JS 中要用 .value
    businessType: businessType.value,
    openDate: openDate.value,
    hasCompetitor: hasCompetitor.value,
    remark: remark.value
  })

  // 弹窗提示（实际项目用 UI 组件库的弹窗，这里用浏览器原生 alert 演示）
  alert('表单已提交！请打开浏览器控制台（F12）查看数据')
}
</script>

<!--
  ==========================================
  📖 模板部分：HTML 结构
  ==========================================

  这里使用语义化标签搭建表单页面结构：
  - <section>：表示文档中的一个"区块"
  - <form>：表单容器
  - <label>：标签，关联表单控件，点击文字也能聚焦输入框
  - <input>：各种输入框（type 属性决定类型）
  - <select> + <option>：下拉选择
  - <textarea>：多行文本输入
  - <button>：按钮
-->

<template>
  <!-- section：语义化标签，表示一个内容区块 -->
  <section class="html-learn">
    <!-- h2：二级标题，语义化（h1~h6 表示不同级别标题） -->
    <h2>HTML 基础：语义化标签与表单</h2>

    <!-- p：段落标签 -->
    <p class="learn-desc">
      本页面演示语义化 HTML 标签的用法。注意观察每个标签的含义，
      而不是用 div 堆砌一切。
    </p>

    <!--
      form：表单容器
      @submit.prevent="handleSubmit" 的含义：
        - @submit：监听表单提交事件
        - .prevent：修饰符，阻止表单的默认提交行为（页面刷新）
        - ="handleSubmit"：触发时调用 handleSubmit 函数
    -->
    <form @submit.prevent="handleSubmit" class="store-form">

      <!-- 门店名称：文本输入 -->
      <div class="form-item">
        <!-- label 的 for 属性关联 input 的 id，点击文字可聚焦输入框 -->
        <label for="storeName">门店名称</label>
        <!--
          input：最常用的表单元素
          v-model：Vue 的双向绑定指令
            - 输入框的值变化时，自动更新 storeName 变量
            - storeName 变量变化时，输入框也跟着变
          type="text"：文本输入框
          placeholder：占位提示文字
          required：HTML5 原生验证，必填
        -->
        <input
          id="storeName"
          v-model="storeName"
          type="text"
          placeholder="请输入门店名称"
          required
        />
      </div>

      <!-- 业态：下拉选择 -->
      <div class="form-item">
        <label for="businessType">业态</label>
        <!--
          select + option：下拉选择框
          v-model 绑定的值等于选中 option 的 value
        -->
        <select id="businessType" v-model="businessType" required>
          <!-- value="" 是默认空选项 -->
          <option value="" disabled>请选择业态</option>
          <!-- v-for：循环渲染列表 -->
          <!-- :key 是必须的，帮助 Vue 高效更新列表（用唯一值） -->
          <!-- :value 和 {{ }} 是 Vue 的绑定语法 -->
          <option
            v-for="item in businessTypes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>

      <!-- 开业日期：日期选择 -->
      <div class="form-item">
        <label for="openDate">开业日期</label>
        <!-- type="date" 会显示浏览器原生的日期选择器 -->
        <input
          id="openDate"
          v-model="openDate"
          type="date"
        />
      </div>

      <!-- 是否有竞品：单选 -->
      <div class="form-item">
        <span class="label-text">是否有竞品</span>
        <!--
          type="radio"：单选按钮
          同一组单选按钮的 name 属性必须相同
          v-model 绑定的值等于选中项的 value
        -->
        <div class="radio-group">
          <label class="radio-label">
            <input v-model="hasCompetitor" type="radio" name="competitor" value="yes" />
            <span>是</span>
          </label>
          <label class="radio-label">
            <input v-model="hasCompetitor" type="radio" name="competitor" value="no" />
            <span>否</span>
          </label>
        </div>
      </div>

      <!-- 备注：多行文本 -->
      <div class="form-item">
        <label for="remark">备注</label>
        <!--
          textarea：多行文本输入
          rows 属性设置显示行数（不影响输入上限）
        -->
        <textarea
          id="remark"
          v-model="remark"
          rows="3"
          placeholder="补充说明..."
        ></textarea>
      </div>

      <!-- 提交按钮 -->
      <!-- type="submit"：点击时触发表单的 submit 事件 -->
      <button type="submit" class="submit-btn">提交</button>
    </form>

    <!--
      aside：语义化标签，表示侧边辅助信息
      这里用来展示"知识点提示"
    -->
    <aside class="tips">
      <h3>💡 知识点提示</h3>
      <ul>
        <li>label 的 for 属性 = input 的 id，实现点击文字聚焦输入框</li>
        <li>v-model 实现双向绑定：输入框 ↔ 变量</li>
        <li>@submit.prevent 阻止表单默认刷新行为</li>
        <li>v-for 循环渲染列表时必须有 :key</li>
      </ul>
    </aside>
  </section>
</template>

<style scoped>
/* ==========================================
   📖 样式部分
   ==========================================
   scoped：表示这些样式只对当前组件生效
   避免不同组件之间的样式互相干扰
*/

.html-learn {
  max-width: 600px;
  margin: 0 auto;
}

.learn-desc {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.store-form {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 表单项布局 */
.form-item {
  margin-bottom: 16px;
}

/* label 样式 */
.form-item label,
.form-item .label-text {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 输入框统一样式 */
.form-item input[type="text"],
.form-item input[type="date"],
.form-item select,
.form-item textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

/* 聚焦时边框变绿 */
.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
  border-color: #4fc08d;
}

/* textarea 不允许拖拽改变大小 */
.form-item textarea {
  resize: vertical;
}

/* 单选组 */
.radio-group {
  display: flex;
  gap: 16px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-weight: normal !important;
  margin-bottom: 0 !important;
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #4fc08d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #42b983;
}

/* 提示框 */
.tips {
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f9eb;
  border-radius: 8px;
  border-left: 4px solid #4fc08d;
}

.tips h3 {
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}

.tips ul {
  padding-left: 20px;
}

.tips li {
  font-size: 13px;
  color: #666;
  line-height: 1.8;
}
</style>
