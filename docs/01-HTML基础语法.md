# HTML 基础语法

> 适合零基础同学。读完这篇你能看懂任何 HTML 代码，并能自己写出基本的网页结构。

---

## 一、HTML 是什么？

HTML（HyperText Markup Language，超文本标记语言）不是编程语言，而是**标记语言**。它用一组"标签"来描述网页的内容结构。

类比：如果说网页是一栋楼，HTML 是钢筋骨架，CSS 是外墙装修，JavaScript 是水电和电梯。

### 最简单的 HTML 页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的第一个网页</title>
</head>
<body>
  <h1>你好，世界！</h1>
  <p>这是一个段落。</p>
</body>
</html>
```

逐行解释：

| 代码 | 含义 |
|------|------|
| `<!DOCTYPE html>` | 告诉浏览器这是 HTML5 文档（固定写法，背下来） |
| `<html lang="zh-CN">` | 根标签，lang 表示页面语言是中文 |
| `<head>` | 头部区域，放看不见的元信息（标题、字符集等） |
| `<meta charset="UTF-8">` | 字符编码设为 UTF-8，避免中文乱码 |
| `<title>` | 浏览器标签页上显示的标题 |
| `<body>` | 主体区域，放用户能看到的所有内容 |
| `<h1>` | 一级标题（最大的标题） |
| `<p>` | 段落（paragraph） |

---

## 二、标签的语法规则

### 1. 标签成对出现

大多数标签有**开始标签**和**结束标签**，用 `/` 区分：

```html
<p>内容</p>
<!--  开始   结束  -->
```

### 2. 自闭合标签

部分标签没有结束标签，自己就闭合了：

```html
<br>      <!-- 换行 -->
<hr>      <!-- 水平线 -->
<img src="logo.png">  <!-- 图片 -->
<input type="text">   <!-- 输入框 -->
<meta charset="UTF-8">
```

### 3. 标签可以嵌套，但不能交叉

```html
<!-- ✅ 正确：正确嵌套 -->
<div>
  <p>段落中的<span>强调</span>文字</p>
</div>

<!-- ❌ 错误：标签交叉了 -->
<div>
  <p>段落中的<div>文字</p></div>
</div>
```

### 4. 标签可以有属性

属性写在开始标签中，格式是 `属性名="属性值"`：

```html
<a href="https://www.meituan.com" target="_blank">点击跳转美团</a>
<!--  属性1: 跳转地址              属性2: 新标签页打开    -->

<img src="photo.jpg" alt="一张照片" width="200">
<!--   图片路径      替代文字     宽度 -->
```

---

## 三、常用标签速查

### 标题标签 h1~h6

从大到小，h1 最大，h6 最小。一个页面只用一个 h1（SEO 建议）。

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

### 文本标签

```html
<p>这是一个段落</p>           <!-- 段落 -->
<span>行内文字</span>          <!-- 行内容器（不换行） -->
<strong>加粗强调</strong>      <!-- 加粗，语义为重要 -->
<em>斜体强调</em>             <!-- 斜体，语义为强调 -->
<br>                         <!-- 换行 -->
<hr>                         <!-- 水平分割线 -->
<code>console.log()</code>    <!-- 代码片段 -->
<mark>高亮文字</mark>          <!-- 黄色高亮 -->
```

### 链接和图片

```html
<!-- 链接 -->
<a href="https://www.meituan.com">美团官网</a>
<a href="/about">关于页面（内部链接）</a>
<a href="mailto:xxx@meituan.com">发邮件</a>

<!-- 图片 -->
<img src="logo.png" alt="Logo">
<img src="https://example.com/photo.jpg" alt="网络图片">
```

### 列表

```html
<!-- 无序列表（圆点） -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橘子</li>
</ul>

<!-- 有序列表（数字） -->
<ol>
  <li>第一步：打开浏览器</li>
  <li>第二步：输入网址</li>
  <li>第三步：回车</li>
</ol>
```

### 容器标签 div 和 span

```html
<!-- div：块级容器，独占一行 -->
<div class="card">
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</div>

<!-- span：行内容器，不换行 -->
<p>价格：<span class="price">¥99</span> 元</p>
```

div 和 span 本身没有语义，就是用来"装东西的盒子"。区别是 div 独占一行，span 不换行。

---

## 四、语义化标签（HTML5 新增）

语义化标签让代码更有意义，对屏幕阅读器和 SEO 友好。**能用语义词就不用 div。**

```html
<header>    <!-- 页面或区块的头部（导航栏、Logo） -->
<nav>       <!-- 导航链接区域 -->
<main>      <!-- 页面主要内容（每页只有一个） -->
<section>   <!-- 文档中的一个区块 -->
<article>   <!-- 独立的内容（文章、卡片） -->
<aside>     <!-- 侧边栏（辅助信息） -->
<footer>    <!-- 页面或区块的底部 -->
```

对比：

```html
<!-- ❌ 不推荐：全是 div，没有语义 -->
<div class="header">
  <div class="nav"></div>
</div>
<div class="main"></div>
<div class="footer"></div>

<!-- ✅ 推荐：语义化标签 -->
<header>
  <nav></nav>
</header>
<main></main>
<footer></footer>
```

---

## 五、表格

```html
<table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>城市</th>
      <th>销售额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>北京</td>
      <td>¥12,000</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>上海</td>
      <td>¥15,000</td>
    </tr>
  </tbody>
</table>
```

| 标签 | 含义 |
|------|------|
| `<table>` | 表格容器 |
| `<thead>` | 表头区域 |
| `<tbody>` | 表体区域 |
| `<tr>` | 行（table row） |
| `<th>` | 表头单元格（加粗居中） |
| `<td>` | 普通单元格（table data） |

---

## 六、表单（重点！）

表单是用户输入数据的界面，前端最常打交道的元素。

```html
<form action="/api/submit" method="POST">

  <!-- 文本输入 -->
  <label for="username">用户名</label>
  <input type="text" id="username" name="username" placeholder="请输入用户名">

  <!-- 密码输入 -->
  <label for="password">密码</label>
  <input type="password" id="password" name="password">

  <!-- 单选按钮 -->
  <label>性别</label>
  <input type="radio" name="gender" value="male" checked> 男
  <input type="radio" name="gender" value="female"> 女

  <!-- 多选框 -->
  <label>爱好</label>
  <input type="checkbox" name="hobby" value="reading"> 阅读
  <input type="checkbox" name="hobby" value="music"> 音乐

  <!-- 下拉选择 -->
  <label for="city">城市</label>
  <select id="city" name="city">
    <option value="">请选择</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
  </select>

  <!-- 多行文本 -->
  <label for="remark">备注</label>
  <textarea id="remark" name="remark" rows="3"></textarea>

  <!-- 提交按钮 -->
  <button type="submit">提交</button>
</form>
```

### input 的 type 属性

| type 值 | 效果 | 用途 |
|---------|------|------|
| `text` | 文本框 | 输入文字 |
| `password` | 密码框 | 输入隐藏 |
| `email` | 邮箱框 | 带邮箱验证 |
| `number` | 数字框 | 只能输入数字 |
| `date` | 日期选择器 | 选择日期 |
| `radio` | 单选按钮 | 多选一 |
| `checkbox` | 复选框 | 多选多 |
| `file` | 文件选择 | 上传文件 |
| `hidden` | 隐藏域 | 存不可见的数据 |

### label 的作用

`<label for="id">` 关联对应的 input，点击文字也能聚焦输入框，提升用户体验。

---

## 七、HTML 注释

```html
<!-- 这是注释，浏览器不显示，但代码中能看到 -->
<!-- 注释用于解释代码，方便团队协作 -->
```

---

## 八、HTML 和 Vue 模板的区别

在 lxy-learn 项目中你会看到 `.vue` 文件，里面的 `<template>` 部分就是 HTML 加了一些 Vue 扩展语法：

| HTML 原生 | Vue 模板扩展 | 说明 |
|-----------|-------------|------|
| `class="active"` | `:class="{ active: isActive }"` | 动态绑定 class |
| `title="固定"` | `:title="变量名"` | 动态绑定属性 |
| 纯文本 | `{{ 变量名 }}` | 插值表达式 |
| 无 | `v-if="条件"` | 条件渲染 |
| 无 | `v-for="item in 列表"` | 循环渲染 |
| `onclick="fn()"` | `@click="fn"` | 事件监听 |
| `value="固定"` | `v-model="变量"` | 双向绑定 |

本质上 Vue 模板编译后还是生成 HTML，只是多了响应式能力。
