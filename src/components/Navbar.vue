<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// useRouter()：vue-router 提供的组合式函数，拿到路由实例后可以用它做"编程式导航"（用代码跳转页面）
const router = useRouter()

// 当前激活的导航项，用 ref 存储，方便页面根据它高亮对应的菜单
// router.currentRoute.value.path：拿到当前页面的路径（比如 '/'、'/todo'）作为初始值
const currentPath = ref(router.currentRoute.value.path)

// 导航菜单数据：一个普通的数组，每一项是 { path, label } 对象
// 因为这个数据不需要被"响应式"追踪变化（写死后不会再变），所以没有用 ref 包装，直接用普通常量即可
const menuItems = [
  { path: '/', label: '首页' },
  { path: '/learn', label: '学习中心' },
  { path: '/todo', label: '待办事项' },
  { path: '/about', label: '关于' }
]

// 点击导航项时切换路由
// 这是一个普通的具名函数（不是箭头函数），因为在模板里通过 @click="navigate(item.path)" 调用，
// 写成普通函数或箭头函数在这里效果一样，因为不涉及 this 指向问题（组合式 API 里没有 this 的坑）
function navigate(path) {
  router.push(path) // router.push(path)：编程式导航，跳转到指定路径，不会刷新整个页面
  currentPath.value = path // 同步更新"当前激活路径"，让菜单高亮立刻生效
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <span class="logo-text">LXY Learn</span>
    </div>
    <ul class="navbar-menu">
      <!--
        语法点：v-for="item in menuItems" —— 列表渲染
        遍历 menuItems 数组，每一项 item 都会渲染出一个 <li>
        :key="item.path" 是必须写的，Vue 用它来识别每个列表项，方便高效地更新 DOM（不加会有警告）
      -->
      <li
        v-for="item in menuItems"
        :key="item.path"
        :class="['menu-item', { active: currentPath === item.path }]"
        @click="navigate(item.path)"
      >
        <!--
          语法点：:class 数组 + 对象混合写法
          ['menu-item', { active: currentPath === item.path }]
            - 'menu-item'：始终生效的基础样式类
            - { active: currentPath === item.path }：
              当 currentPath 等于当前这一项的 path 时（表达式结果为 true），
              就自动加上 'active' 这个 class，实现"当前页高亮"的效果
        -->
        {{ item.label }}
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background-color: #4fc08d;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar-logo .logo-text {
  font-size: 20px;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 8px;
  margin: 0;
  padding: 0;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}
</style>
