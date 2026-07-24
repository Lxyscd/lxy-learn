import { ref } from 'vue'

/**
 * 组合式函数：管理待办事项的状态和操作
 *
 * 这是一个简化版的 "store"，使用 Vue 的响应式系统来管理数据。
 * 在真实项目中，你可能会用 Pinia 来做状态管理，
 * 但这里用 composables 的方式更轻量，也更容易理解。
 */
export function useTodoStore() {
  // ------------------------------------------------------------
  // 语法点：ref() —— Vue 响应式的核心 API
  // ------------------------------------------------------------
  // ref() 把一个值（这里是数组）包装成"响应式数据"。
  // 原理：Vue 用 Proxy 在这个数据外面包了一层监听器——
  //   - 只要读取 todos.value，Vue 就记录"谁用到了这个数据"
  //   - 只要修改 todos.value（比如 push、赋值），Vue 就自动通知所有用到它的组件重新渲染
  // 所以下面的增删改操作完成后，页面会自动更新，完全不需要手动操作 DOM。
  //
  // 注意：在 <script> 里访问 ref 的值必须加 .value；但在 <template> 模板里会自动"脱掉" .value。
  const todos = ref([
    { id: 1, text: '学习 Vue 3 基础', done: true },
    { id: 2, text: '完成待办事项应用', done: false },
    { id: 3, text: '阅读官方文档', done: false }
  ])

  // 新待办的输入文本，同样是响应式数据，配合 <input v-model="newTodoText"> 实现双向绑定
  const newTodoText = ref('')

  // 普通变量，不需要响应式（页面不需要显示它），用来生成自增 ID
  let nextId = 4

  // ------------------------------------------------------------
  // 添加待办
  // ------------------------------------------------------------
  function addTodo() {
    // .trim()：字符串方法，去掉首尾空格，防止用户只输入空格就添加成功
    const text = newTodoText.value.trim()
    if (!text) return // 提前 return：如果文本为空，直接结束函数，不往下执行

    // .push()：数组方法，往数组末尾添加一个新元素
    // 因为 todos 是 ref 包装的响应式数组，push 之后页面会自动显示这条新数据
    todos.value.push({
      id: nextId++, // nextId++ 是"先使用当前值，再自增 1"（后置递增运算符）
      text,          // ES6 对象属性简写：text: text 可以简写成 text（属性名和变量名相同时）
      done: false
    })

    newTodoText.value = '' // 清空输入框，方便继续输入下一条
  }

  // ------------------------------------------------------------
  // 切换完成状态
  // ------------------------------------------------------------
  function toggleTodo(id) {
    // .find()：数组方法，遍历数组，返回第一个满足条件的元素（找不到则返回 undefined）
    // t => t.id === id 是箭头函数，t 是数组里的每一项，这里的意思是"找到 id 匹配的那一条"
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.done = !todo.done // ! 是取反运算符，true 变 false，false 变 true
    }
  }

  // ------------------------------------------------------------
  // 删除待办
  // ------------------------------------------------------------
  function deleteTodo(id) {
    // .findIndex()：和 find 类似，但返回的是"下标"而不是元素本身，找不到返回 -1
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      // .splice(起始下标, 删除个数)：数组方法，直接在原数组上删除元素
      // splice(index, 1) 表示"从 index 位置开始，删除 1 个元素"
      todos.value.splice(index, 1)
    }
  }

  // ------------------------------------------------------------
  // 清除已完成的待办
  // ------------------------------------------------------------
  function clearCompleted() {
    // .filter()：数组方法，遍历数组，把"满足条件"的元素组成一个新数组返回（不影响原数组）
    // t => !t.done 表示"只保留还没完成的（done 为 false）"
    // 这里直接把 filter 的结果重新赋值给 todos.value，相当于"整体替换成新数组"
    todos.value = todos.value.filter(t => !t.done)
  }

  // ------------------------------------------------------------
  // 语法点：函数最后返回一个对象，把内部的数据和方法"暴露"出去
  // ------------------------------------------------------------
  // 谁调用了 useTodoStore()，就能通过解构拿到这些数据和方法，比如：
  //   const { todos, addTodo } = useTodoStore()
  // 这就是"组合式函数（Composable）"的核心用法：把一块相关的逻辑封装成一个函数，
  // 谁需要这个功能，调用一下这个函数即可复用，不用把代码复制来复制去。
  return {
    todos,
    newTodoText,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  }
}
