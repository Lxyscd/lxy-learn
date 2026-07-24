<script setup>
/**
 * ==========================================
 * 📖 学习模块：CSS 基础 - 布局与样式
 * ==========================================
 *
 * 对应学城文档：第十三章「CSS 基础：布局与样式」
 *
 * 学习目标：
 *   1. 理解盒模型（Box Model）：content / padding / border / margin
 *   2. 掌握 Flex 布局（现代前端最常用的布局方式）
 *   3. 理解定位（position: static / relative / absolute / fixed / sticky）
 *   4. 了解响应式设计（媒体查询）
 *
 * 盒模型类比（Java 后端同学可以这样理解）：
 *   想象一个快递盒子：
 *   - content：里面的商品（内容区域）
 *   - padding：泡沫填充物（内边距，内容和边框之间的空间）
 *   - border：纸箱本身的厚度（边框）
 *   - margin：这个箱子和旁边箱子之间的距离（外边距）
 *
 * Flex 布局类比：
 *   想象把东西放进一个抽屉：
 *   - display: flex → 把抽屉设为"弹性模式"
 *   - flex-direction: row → 横着放 / column → 竖着放
 *   - justify-content → 沿着排列方向怎么对齐（左/中/右/两端分散）
 *   - align-items → 垂直于排列方向怎么对齐（上/中/下）
 *   - flex: 1 → 这个东西占据剩余空间
 */

import { ref } from 'vue'

// 当前展示的布局示例
const currentDemo = ref('flex')

// 布局示例列表
const demos = [
  { id: 'flex', name: 'Flex 布局' },
  { id: 'box', name: '盒模型' },
  { id: 'position', name: '定位' },
  { id: 'responsive', name: '响应式' }
]

// 盒模型参数（可调节，实时看效果）
const boxConfig = ref({
  width: 200,
  padding: 20,
  border: 2,
  margin: 10,
  boxSizing: 'content-box'  // content-box 或 border-box
})

// Flex 布局参数
const flexConfig = ref({
  direction: 'row',
  justify: 'flex-start',
  align: 'center',
  gap: 8
})

// Flex 布局选项
const directions = [
  { value: 'row', label: 'row（横向→）' },
  { value: 'column', label: 'column（纵向↓）' },
  { value: 'row-reverse', label: 'row-reverse（横向←）' },
  { value: 'column-reverse', label: 'column-reverse（纵向↑）' }
]

const justifies = [
  { value: 'flex-start', label: 'flex-start（起点对齐）' },
  { value: 'center', label: 'center（居中）' },
  { value: 'flex-end', label: 'flex-end（终点对齐）' },
  { value: 'space-between', label: 'space-between（两端分散）' },
  { value: 'space-around', label: 'space-around（均匀分散）' }
]

const aligns = [
  { value: 'flex-start', label: 'flex-start（顶部）' },
  { value: 'center', label: 'center（居中）' },
  { value: 'flex-end', label: 'flex-end（底部）' },
  { value: 'stretch', label: 'stretch（拉伸铺满）' }
]

// Flex 示例方块数量
const flexItems = ref([1, 2, 3, 4])

// 计算 CSS 代码展示文本（避免模板中花括号冲突）
const flexCodeDisplay = computed(() => {
  return `.container {\n  display: flex;\n  flex-direction: ${flexConfig.value.direction};\n  justify-content: ${flexConfig.value.justify};\n  align-items: ${flexConfig.value.align};\n}`
})
</script>

<template>
  <section class="css-learn">
    <h2>CSS 基础：布局与样式</h2>
    <p class="learn-desc">
      切换不同示例，调节参数，实时观察 CSS 布局效果。
    </p>

    <!-- 切换示例的标签页 -->
    <nav class="demo-tabs">
      <button
        v-for="demo in demos"
        :key="demo.id"
        :class="['tab-btn', { active: currentDemo === demo.id }]"
        @click="currentDemo = demo.id"
      >
        {{ demo.name }}
      </button>
    </nav>

    <!-- ========== Flex 布局演示 ========== -->
    <div v-if="currentDemo === 'flex'" class="demo-section">
      <h3>Flex 布局演示</h3>

      <!-- 控制面板 -->
      <div class="control-panel">
        <div class="control-item">
          <label>flex-direction（主轴方向）</label>
          <select v-model="flexConfig.direction">
            <option v-for="d in directions" :key="d.value" :value="d.value">{{ d.label }}</option>
          </select>
        </div>
        <div class="control-item">
          <label>justify-content（主轴对齐）</label>
          <select v-model="flexConfig.justify">
            <option v-for="j in justifies" :key="j.value" :value="j.value">{{ j.label }}</option>
          </select>
        </div>
        <div class="control-item">
          <label>align-items（交叉轴对齐）</label>
          <select v-model="flexConfig.align">
            <option v-for="a in aligns" :key="a.value" :value="a.value">{{ a.label }}</option>
          </select>
        </div>
      </div>

      <!--
        实际的 Flex 容器
        :style 是动态绑定样式的语法
        Vue 会把对象转成 CSS 样式字符串
      -->
      <div
        class="flex-container"
        :style="{
          flexDirection: flexConfig.direction,
          justifyContent: flexConfig.justify,
          alignItems: flexConfig.align
        }"
      >
        <div
          v-for="item in flexItems"
          :key="item"
          class="flex-item"
        >
          {{ item }}
        </div>
      </div>

      <!-- 显示当前的 CSS 代码 -->
      <!-- 用 computed 属性生成代码字符串，避免模板中 {{ }} 冲突 -->
      <pre class="code-display">{{ flexCodeDisplay }}</pre>
    </div>

    <!-- ========== 盒模型演示 ========== -->
    <div v-if="currentDemo === 'box'" class="demo-section">
      <h3>盒模型演示</h3>

      <div class="control-panel">
        <div class="control-item">
          <label>width: {{ boxConfig.width }}px</label>
          <input type="range" v-model.number="boxConfig.width" min="50" max="400" />
        </div>
        <div class="control-item">
          <label>padding: {{ boxConfig.padding }}px</label>
          <input type="range" v-model.number="boxConfig.padding" min="0" max="60" />
        </div>
        <div class="control-item">
          <label>border: {{ boxConfig.border }}px</label>
          <input type="range" v-model.number="boxConfig.border" min="0" max="20" />
        </div>
        <div class="control-item">
          <label>margin: {{ boxConfig.margin }}px</label>
          <input type="range" v-model.number="boxConfig.margin" min="0" max="40" />
        </div>
        <div class="control-item">
          <label>box-sizing</label>
          <select v-model="boxConfig.boxSizing">
            <option value="content-box">content-box（默认，width=内容宽度）</option>
            <option value="border-box">border-box（width=内容+padding+border）</option>
          </select>
        </div>
      </div>

      <!-- 盒模型可视化 -->
      <div class="box-demo-area">
        <!-- margin 层（最外层，半透明黄色） -->
        <div
          class="box-margin"
          :style="{ padding: boxConfig.margin + 'px' }"
        >
          <!-- border 层（边框层，黑色虚线） -->
          <div
            class="box-border"
            :style="{
              borderWidth: boxConfig.border + 'px',
              boxSizing: boxConfig.boxSizing,
              width: boxConfig.width + 'px',
              padding: boxConfig.padding + 'px'
            }"
          >
            <!-- content 层（最内层，绿色背景） -->
            <div class="box-content">
              content<br />
              {{ boxConfig.width }}×60
            </div>
          </div>
        </div>
      </div>

      <div class="box-legend">
        <span class="legend-item"><span class="dot margin"></span>margin（外边距）</span>
        <span class="legend-item"><span class="dot border"></span>border（边框）</span>
        <span class="legend-item"><span class="dot padding"></span>padding（内边距）</span>
        <span class="legend-item"><span class="dot content"></span>content（内容）</span>
      </div>
    </div>

    <!-- ========== 定位演示 ========== -->
    <div v-if="currentDemo === 'position'" class="demo-section">
      <h3>定位（Position）演示</h3>

      <p class="learn-desc">
        position 决定元素在页面中的定位方式：
      </p>
      <ul class="position-list">
        <li><strong>static</strong>（默认）：正常文档流，top/left 无效</li>
        <li><strong>relative</strong>：相对自身原位置偏移，不影响其他元素</li>
        <li><strong>absolute</strong>：脱离文档流，相对于最近的非 static 祖先定位</li>
        <li><strong>fixed</strong>：脱离文档流，相对于浏览器视口定位（滚动不动）</li>
        <li><strong>sticky</strong>：正常滚动，到达阈值时"粘住"变为 fixed</li>
      </ul>

      <!-- sticky 定位演示 -->
      <div class="sticky-demo">
        <p class="sticky-tip">↓ 向下滚动，观察绿色条"粘住"的效果</p>
        <div class="sticky-scroll-area">
          <div class="scroll-content-block">内容块 1</div>
          <div class="scroll-content-block">内容块 2</div>
          <!-- sticky 元素：滚动到 top:0 时"粘住" -->
          <div class="sticky-element">我是 sticky 元素，滚到顶部就粘住</div>
          <div class="scroll-content-block">内容块 3</div>
          <div class="scroll-content-block">内容块 4</div>
          <div class="scroll-content-block">内容块 5</div>
          <div class="scroll-content-block">内容块 6</div>
        </div>
      </div>
    </div>

    <!-- ========== 响应式演示 ========== -->
    <div v-if="currentDemo === 'responsive'" class="demo-section">
      <h3>响应式设计演示</h3>
      <p class="learn-desc">
        调整浏览器窗口宽度，观察下方布局变化：
      </p>
      <div class="responsive-demo">
        <div class="responsive-card">卡片 1</div>
        <div class="responsive-card">卡片 2</div>
        <div class="responsive-card">卡片 3</div>
        <div class="responsive-card">卡片 4</div>
      </div>
      <!-- v-pre 指令：让 Vue 跳过这个元素的编译，原样显示 {{ }} -->
      <pre class="code-display" v-pre>/* 宽屏：4列 */
.responsive-demo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

/* 中屏：2列 */
@media (max-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

/* 窄屏：1列 */
@media (max-width: 480px) {
  grid-template-columns: 1fr;
}</pre>
    </div>
  </section>
</template>

<style scoped>
.css-learn {
  max-width: 800px;
  margin: 0 auto;
}

.learn-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

/* 标签页 */
.demo-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 6px 16px;
  border: 2px solid #eee;
  background: white;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  border-color: #4fc08d;
  color: #4fc08d;
  font-weight: bold;
}

.demo-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.demo-section h3 {
  margin-bottom: 16px;
  color: #333;
}

/* 控制面板 */
.control-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.control-item label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.control-item select,
.control-item input[type="range"] {
  width: 100%;
  font-size: 13px;
}

/* Flex 演示容器 */
.flex-container {
  display: flex;
  height: 200px;
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}

.flex-item {
  background: #4fc08d;
  color: white;
  padding: 16px 24px;
  border-radius: 6px;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

/* 代码展示 */
.code-display {
  background: #2c3e50;
  color: #a5d6a7;
  padding: 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
}

/* 盒模型演示 */
.box-demo-area {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 16px;
}

.box-margin {
  background: rgba(255, 235, 59, 0.3);
  display: inline-block;
  border-radius: 4px;
}

.box-border {
  border-style: solid;
  border-color: #333;
  background: rgba(0, 0, 0, 0.1);
}

.box-content {
  background: #4fc08d;
  color: white;
  text-align: center;
  font-size: 12px;
  padding: 20px 0;
  border-radius: 2px;
}

.box-legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.dot.margin { background: rgba(255, 235, 59, 0.5); }
.dot.border { background: #333; }
.dot.padding { background: rgba(0, 0, 0, 0.1); }
.dot.content { background: #4fc08d; }

/* 定位演示 */
.position-list {
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

.position-list li {
  font-size: 13px;
  color: #555;
  line-height: 2;
}

.sticky-demo {
  margin-top: 16px;
}

.sticky-tip {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.sticky-scroll-area {
  height: 300px;
  overflow-y: auto;
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 8px;
}

.scroll-content-block {
  height: 80px;
  background: #f0f0f0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 14px;
  color: #999;
}

/* sticky 定位：正常滚动，到达 top:0 时粘住 */
.sticky-element {
  position: sticky;
  top: 0;
  background: #4fc08d;
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 6px;
  font-weight: bold;
  z-index: 10;
  margin-bottom: 8px;
}

/* 响应式演示 */
.responsive-demo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.responsive-card {
  background: #4fc08d;
  color: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

/* 媒体查询：中屏 2 列 */
@media (max-width: 768px) {
  .responsive-demo {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 媒体查询：窄屏 1 列 */
@media (max-width: 480px) {
  .responsive-demo {
    grid-template-columns: 1fr;
  }
}
</style>
