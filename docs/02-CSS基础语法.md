# CSS 基础语法

> 读完这篇你能理解 CSS 选择器、盒模型、Flex 布局、定位，能看懂和修改任何页面的样式。

---

## 一、CSS 是什么？

CSS（Cascading Style Sheets，层叠样式表）控制网页的**外观**——颜色、大小、位置、动画等。

HTML 决定"有什么内容"，CSS 决定"内容长什么样"。

### CSS 三种写法

```html
<!-- 1. 行内样式（不推荐，难维护） -->
<p style="color: red; font-size: 16px;">红色文字</p>

<!-- 2. 内部样式（写在 <style> 标签中，小页面可用） -->
<style>
  p { color: red; }
</style>

<!-- 3. 外部样式表（推荐！独立 .css 文件） -->
<link rel="stylesheet" href="style.css">
```

在 Vue 项目中，样式写在 `.vue` 文件的 `<style>` 标签里。

---

## 二、基本语法结构

```css
选择器 {
  属性名: 属性值;
  属性名: 属性值;
}
```

举例：

```css
/* 选中所有 p 标签，设置文字颜色和大小 */
p {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
}

/* 选中 class 为 card 的元素 */
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
}
```

---

## 三、选择器（怎么"选中"元素）

### 1. 基础选择器

```css
/* 标签选择器：选中所有指定标签 */
p { color: #333; }
h1 { font-size: 28px; }

/* 类选择器（class）：选中 class="card" 的元素，用 . 开头 */
.card { background: white; }
.highlight { color: orange; }

/* ID 选择器：选中 id="header" 的元素，用 # 开头 */
#header { height: 60px; }
/* 注意：ID 在页面中唯一，实际开发中少用 */

/* 通配符选择器：选中所有元素 */
* { margin: 0; padding: 0; }
```

### 2. 组合选择器

```css
/* 后代选择器：选中 .card 里面的所有 p（不管嵌套多深） */
.card p { color: #666; }

/* 子代选择器：只选中 .card 的直接子元素 p（不选孙级） */
.card > p { color: #666; }

/* 并集选择器：同时选中 h1 和 h2 */
h1, h2 { font-weight: bold; }

/* 交集选择器：选中同时有 class="card active" 的元素 */
.card.active { border-color: green; }

/* 伪类选择器：鼠标悬停时的样式 */
.btn:hover { background: darkgreen; }
input:focus { border-color: blue; }
li:nth-child(odd) { background: #f9f9f9; }  /* 奇数行 */
```

### 3. 选择器优先级

当多个规则都选中同一个元素时，按优先级决定谁生效：

```
!important > 行内样式 > ID选择器 > 类选择器 > 标签选择器
```

```css
/* 优先级低 */
p { color: black; }

/* 优先级高（类选择器） */
.text-red { color: red; }

/* 优先级最高（尽量别用 !important） */
p { color: blue !important; }
```

实际开发中，推荐用 class 选择器为主，避免用 ID 和 !important。

---

## 四、盒模型（Box Model）

每个 HTML 元素都是一个矩形盒子，由四层组成（从内到外）：

```
┌─────────────────────────────────────┐
│              margin                 │  ← 外边距：盒子和其他盒子的距离
│  ┌───────────────────────────────┐  │
│  │           border              │  │  ← 边框
│  │  ┌─────────────────────────┐  │  │
│  │  │        padding          │  │  │  ← 内边距：内容和边框之间的空间
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │                   │  │  │  │
│  │  │  │     content       │  │  │  │  ← 内容区域（width × height）
│  │  │  │                   │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

```css
.box {
  width: 200px;          /* 内容宽度 */
  height: 100px;         /* 内容高度 */
  padding: 20px;         /* 内边距：内容到边框的距离 */
  border: 2px solid #ccc;/* 边框：宽度 样式 颜色 */
  margin: 10px;          /* 外边距：盒子到其他盒子的距离 */
}
```

### box-sizing（重要！）

```css
/* 默认值：width 只算 content，加上 padding 和 border 后实际更宽 */
.box { box-sizing: content-box; }

/* 推荐值：width 包含 content + padding + border，所见即所得 */
.box { box-sizing: border-box; }
```

实际项目中通常全局设置：

```css
* {
  box-sizing: border-box;
}
```

---

## 五、常用 CSS 属性

### 文字相关

```css
.text {
  color: #333;              /* 文字颜色 */
  font-size: 16px;          /* 字号 */
  font-weight: bold;        /* 粗细：normal / bold / 100-900 */
  font-family: 'PingFang SC', sans-serif;  /* 字体 */
  line-height: 1.6;         /* 行高 */
  text-align: center;       /* 对齐：left / center / right */
  text-decoration: underline; /* 下划线 / none（去掉下划线） */
  letter-spacing: 1px;      /* 字间距 */
}
```

### 颜色写法

```css
color: red;               /* 颜色名 */
color: #ff0000;           /* 十六进制（最常用） */
color: #f00;              /* 十六进制简写 */
color: rgb(255, 0, 0);    /* RGB */
color: rgba(255, 0, 0, 0.5); /* RGBA，最后的 0.5 是透明度 */
```

### 背景相关

```css
.card {
  background-color: white;            /* 背景色 */
  background-image: url('bg.jpg');    /* 背景图 */
  background-size: cover;             /* 背景图填充方式 */
  background-position: center;        /* 背景图位置 */
}
```

### 边框和圆角

```css
.box {
  border: 1px solid #ddd;    /* 边框：宽度 样式 颜色 */
  /* border-style: solid（实线）/ dashed（虚线）/ dotted（点线） */
  border-radius: 8px;        /* 圆角 */
  border-radius: 50%;        /* 圆形（配合正方形元素） */
}
```

### 阴影

```css
.card {
  /* x偏移 y偏移 模糊半径 扩散半径 颜色 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

---

## 六、Flex 布局（重点中的重点）

Flex 是现代前端最常用的布局方式，95% 的布局都能用 Flex 解决。

### 基本用法

```css
.container {
  display: flex;  /* 开启 Flex 布局 */
}
```

设为 `display: flex` 的元素叫**容器**（flex container），里面的子元素叫**项目**（flex item）。

### 容器属性

```css
.container {
  display: flex;

  /* 主轴方向：横向排列还是纵向排列 */
  flex-direction: row;            /* → 横向（默认） */
  flex-direction: column;         /* ↓ 纵向 */

  /* 主轴对齐方式 */
  justify-content: flex-start;    /* 起点对齐（默认） */
  justify-content: center;        /* 居中 */
  justify-content: flex-end;      /* 终点对齐 */
  justify-content: space-between; /* 两端对齐，间距相等 */
  justify-content: space-around;  /* 每个项目两侧间距相等 */

  /* 交叉轴对齐方式（垂直于主轴的方向） */
  align-items: flex-start;        /* 顶部对齐 */
  align-items: center;            /* 垂直居中 */
  align-items: flex-end;          /* 底部对齐 */
  align-items: stretch;           /* 拉伸铺满（默认） */

  /* 是否换行 */
  flex-wrap: nowrap;              /* 不换行（默认） */
  flex-wrap: wrap;                /* 换行 */

  /* 子元素间距 */
  gap: 16px;                      /* 间距 16px */
}
```

### 项目属性

```css
.item {
  flex: 1;          /* 占据剩余空间（最常用） */
  flex: 0 0 200px;  /* 不伸缩，固定 200px */
  flex-grow: 1;     /* 放大比例 */
  flex-shrink: 0;   /* 不缩小 */
}
```

### 常见布局模式

```css
/* 水平垂直居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 顶部导航栏：左右两端对齐 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 侧边栏 + 主内容 */
.layout {
  display: flex;
}
.sidebar { width: 200px; }
.main { flex: 1; }  /* 占据剩余宽度 */
```

---

## 七、定位（Position）

```css
.box {
  position: static;   /* 默认值，正常文档流 */
  position: relative; /* 相对定位：相对自身原位置偏移 */
  position: absolute; /* 绝对定位：脱离文档流，相对最近的非 static 祖先 */
  position: fixed;    /* 固定定位：相对浏览器视口，滚动不动 */
  position: sticky;   /* 粘性定位：正常滚动，到达阈值后变 fixed */
}
```

配合 `top / right / bottom / left` 使用：

```css
/* 相对定位：相对自己原来的位置偏移 10px */
.offset {
  position: relative;
  top: 10px;
  left: 20px;
}

/* 绝对定位：脱离文档流，相对最近的 relative 祖先 */
.popup {
  position: absolute;
  top: 100%;    /* 在父元素正下方 */
  left: 0;
}

/* 固定定位：固定在浏览器顶部 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;  /* 层级，大的在上面 */
}

/* 粘性定位：滚动到 top:0 时"粘住" */
.sticky-nav {
  position: sticky;
  top: 0;
}
```

---

## 八、响应式设计（媒体查询）

根据屏幕宽度应用不同样式：

```css
/* 默认样式（移动端优先） */
.grid {
  grid-template-columns: 1fr;  /* 单列 */
}

/* 平板：768px 以上变两列 */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* 桌面：1024px 以上变三列 */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

---

## 九、CSS 单位

| 单位 | 含义 | 用途 |
|------|------|------|
| `px` | 像素（绝对单位） | 固定尺寸 |
| `%` | 百分比（相对父元素） | 响应式宽度 |
| `rem` | 相对根元素字号 | 响应式字体 |
| `em` | 相对父元素字号 | 嵌套缩放 |
| `vw` | 视口宽度的 1% | 全屏布局 |
| `vh` | 视口高度的 1% | 全屏布局 |

```css
/* 常见用法 */
.container { width: 80%; max-width: 1200px; }
.title { font-size: 1.5rem; }    /* 根字号的 1.5 倍 */
.hero { height: 100vh; }         /* 满屏高度 */
```

---

## 十、SCSS 简介（项目中使用）

SCSS 是 CSS 的增强版，支持变量、嵌套、混入等。Vue 项目中 `<style lang="scss">` 就是用 SCSS。

```scss
// 变量
$primary-color: #4fc08d;
$border-radius: 8px;

// 嵌套（少写很多重复的选择器）
.card {
  background: white;
  border-radius: $border-radius;

  // & 表示父选择器 .card
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .title {
    color: $primary-color;
    font-size: 18px;
  }

  .content {
    color: #666;
  }
}

// 编译后等价于：
// .card { ... }
// .card:hover { ... }
// .card .title { ... }
// .card .content { ... }
```
