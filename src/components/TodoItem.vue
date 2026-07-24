<script setup>
// ------------------------------------------------------------
// 语法点：defineProps —— 声明"父组件传给我的数据"
// ------------------------------------------------------------
// props 是组件通信里"父组件 -> 子组件"传数据的方式，特点是【单向】的：
// 子组件只能读取 props，不能直接修改它（比如不能写 props.todo.text = 'xxx'，
// 这样做 Vue 会在控制台报警告，因为数据的"唯一来源"应该始终是父组件）。
//
// defineProps 的对象写法可以给每个字段加类型校验：
//   type: 期望的数据类型（Object、String、Number、Boolean、Array...）
//   required: 是否必须传，true 表示父组件不传就会报警告
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

// ------------------------------------------------------------
// 语法点：defineEmits —— 声明"我要发送给父组件的事件"
// ------------------------------------------------------------
// emit 是组件通信里"子组件 -> 父组件"的方式。
// 子组件自己不直接修改数据，而是"喊一声"（触发事件），把需要变更的信息告诉父组件，
// 由父组件来决定怎么修改真正的数据（在这个项目里，真正的数据存在 useTodoStore.js 的 todos 里）。
//
// defineEmits(['toggle', 'delete']) 表示：这个组件只能触发 'toggle' 和 'delete' 这两种事件，
// 写清楚之后，Vue 和编辑器都能帮你检查事件名有没有写错。
const emit = defineEmits(['toggle', 'delete'])

// 点击勾选框时调用：通过 emit 把"要切换哪一条"（用 id 标识）告诉父组件
// emit('事件名', 携带的参数) —— 参数可以是任意类型，这里传的是 todo.id
function handleToggle() {
  emit('toggle', props.todo.id)
}

// 点击删除按钮时调用，同理，只是换成了 'delete' 事件
function handleDelete() {
  emit('delete', props.todo.id)
}
</script>

<template>
  <!--
    语法点：:class 数组 + 对象混合写法
    ['todo-item', { completed: todo.done }]
      - 数组第一项 'todo-item'：始终生效的基础样式
      - 数组第二项是一个对象：{ completed: todo.done } 表示
        "当 todo.done 为 true 时，加上 completed 这个 class；为 false 时不加"
    这里因为在模板里，todo 是从 props 自动解构出来的，直接写 todo.done 即可，不用写 props.todo.done
  -->
  <div :class="['todo-item', { completed: todo.done }]">
    <!-- @click 绑定点击事件，触发上面定义的方法 -->
    <span class="todo-checkbox" @click="handleToggle">
      <!-- 模板里的三元表达式：条件 ? 值1 : 值2，用于根据 todo.done 显示不同的符号 -->
      {{ todo.done ? '✓' : '○' }}
    </span>
    <span class="todo-text">{{ todo.text }}</span>
    <span class="todo-delete" @click="handleDelete">✕</span>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: opacity 0.2s;
}

.todo-item.completed {
  opacity: 0.5;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
}

.todo-checkbox {
  cursor: pointer;
  font-size: 20px;
  color: #4fc08d;
  user-select: none;
  width: 24px;
  text-align: center;
}

.todo-text {
  flex: 1;
  font-size: 15px;
}

.todo-delete {
  cursor: pointer;
  color: #e74c3c;
  font-size: 14px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.todo-delete:hover {
  opacity: 1;
}
</style>
