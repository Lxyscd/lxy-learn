<script setup>
import { ref, computed, watch } from 'vue'
import TodoItem from '@/components/TodoItem.vue'
import { useTodoStore } from '@/composables/useTodoStore'

// ------------------------------------------------------------
// 语法点：解构赋值（Destructuring）
// ------------------------------------------------------------
// useTodoStore() 返回的是一个对象（见 useTodoStore.js 最后的 return { ... }），
// 用 { } 直接从这个对象里按需取出需要的字段，等价于下面这种啰嗦的写法：
//   const store = useTodoStore()
//   const todos = store.todos
//   const newTodoText = store.newTodoText
//   ... 还要一行行写
// 解构赋值一行就能搞定，而且哪些数据/方法要用一目了然。
const {
  todos,
  newTodoText,
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted
} = useTodoStore()

// 过滤器：all / active / completed，用普通 ref 存储当前选中的过滤条件
const filter = ref('all')

// ------------------------------------------------------------
// 语法点：computed —— 有缓存的"计算属性"
// ------------------------------------------------------------
// computed 会根据它内部用到的响应式数据（这里是 filter 和 todos）自动重新计算，
// 而且有缓存：只要 filter 和 todos 没有变化，多次访问 filteredTodos.value 不会重复执行这段函数，
// 这比每次都重新 filter 一遍性能更好。
//
// switch 语句：适合"一个变量对应多种分支"的场景，比 if/else if/else 写多个分支时更清晰
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      // .filter()：数组方法，只留下满足条件的项，这里是"未完成"的（!t.done）
      return todos.value.filter(t => !t.done)
    case 'completed':
      return todos.value.filter(t => t.done)
    default:
      return todos.value
  }
})

// 统计信息，同样用 computed，todos 变化时会自动重新计算
const remaining = computed(() => todos.value.filter(t => !t.done).length)
const total = computed(() => todos.value.length)

// ------------------------------------------------------------
// 语法点：watch —— 监听响应式数据变化，执行"副作用"（打日志、发请求等）
// ------------------------------------------------------------
// watch(要监听的数据, (新值) => { 变化后要做的事 }, 配置项)
//
// 第三个参数 { deep: true } 很关键：因为 todos 是一个"数组，里面装的是对象"，
// 默认情况下 watch 只能检测到"整个数组被替换"这种粗粒度的变化，
// 检测不到"数组里某一项的 done 属性从 false 变成 true"这种更深层的变化。
// 加上 deep: true 后，Vue 会递归遍历数组里的每个对象属性，才能感知到这种深层修改。
//
// 模板字符串：用反引号 ` ` 包裹，${} 里直接嵌入表达式，等价于用 + 拼接字符串，但更简洁易读
watch(
  todos,
  (newVal) => {
    console.log(`[TodoList] 待办事项变化: ${newVal.length} 项，${newVal.filter(t => t.done).length} 已完成`)
  },
  { deep: true }
)

// 添加待办的表单提交处理函数
function handleSubmit() {
  if (newTodoText.value.trim()) {
    addTodo()
  }
}
</script>

<template>
  <div class="todo-page">
    <h1>待办事项</h1>
    <p class="subtitle">试试添加、完成、删除待办，体验 Vue 的响应式数据流</p>

    <!--
      语法点：@submit.prevent —— 事件修饰符
      .prevent 相当于在事件处理函数里调用了 event.preventDefault()，
      作用是阻止表单提交的默认行为（默认行为是刷新整个页面），
      这样点击"添加"按钮只会触发 handleSubmit，不会导致页面刷新。
    -->
    <form class="add-form" @submit.prevent="handleSubmit">
      <!-- v-model 实现输入框和 newTodoText 的双向绑定：输入框变化会自动更新 newTodoText -->
      <input
        v-model="newTodoText"
        type="text"
        placeholder="输入待办事项..."
        class="todo-input"
      />
      <button type="submit" class="add-btn">添加</button>
    </form>

    <!--
      语法点：v-for 遍历一个"字面量数组" ['all', 'active', 'completed']
      不一定要遍历响应式数据，直接写死的数组也可以遍历渲染
    -->
    <div class="filters">
      <button
        v-for="f in ['all', 'active', 'completed']"
        :key="f"
        :class="['filter-btn', { active: filter === f }]"
        @click="filter = f"
      >
        <!-- 嵌套三元表达式：条件1 ? 值1 : 条件2 ? 值2 : 值3，从左到右依次判断 -->
        {{ f === 'all' ? '全部' : f === 'active' ? '未完成' : '已完成' }}
      </button>
    </div>

    <!-- 统计 -->
    <div class="todo-stats">
      <span>{{ remaining }} 项未完成 / 共 {{ total }} 项</span>
      <!-- v-if：条件渲染，只有 remaining < total（有已完成的项）时才显示这个按钮 -->
      <button v-if="remaining < total" class="clear-btn" @click="clearCompleted">
        清除已完成
      </button>
    </div>

    <!--
      语法点：组件通信实战
      :todo="todo"        —— 对应 TodoItem.vue 里的 defineProps，把数据传给子组件
      @toggle="toggleTodo" —— 对应 TodoItem.vue 里 emit('toggle', id)，
                              子组件触发 toggle 事件时，自动调用父组件的 toggleTodo 方法，
                              并把 emit 携带的参数（id）作为 toggleTodo 的参数传入
      @delete="deleteTodo" —— 同理，对应 emit('delete', id)
    -->
    <div class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />
    </div>

    <!-- 空状态 -->
    <div v-if="filteredTodos.length === 0" class="empty-state">
      <p>暂无待办事项</p>
    </div>
  </div>
</template>

<style scoped>
.todo-page h1 {
  color: #2c3e50;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 20px;
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.todo-input:focus {
  border-color: #4fc08d;
}

.add-btn {
  padding: 10px 20px;
  background-color: #4fc08d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #42b983;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-btn {
  padding: 6px 16px;
  border: 2px solid #eee;
  background-color: white;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  border-color: #4fc08d;
  color: #4fc08d;
  font-weight: bold;
}

.todo-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
}

.clear-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 13px;
}

.clear-btn:hover {
  text-decoration: underline;
}

.empty-state {
  text-align: center;
  color: #ccc;
  padding: 40px;
  font-size: 15px;
}
</style>
