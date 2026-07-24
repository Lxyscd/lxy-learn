import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// ------------------------------------------------------------
// 这是整个应用的入口文件，程序从这里开始运行
// 对应 index.html 里的 <script type="module" src="/src/main.js"></script>
// ------------------------------------------------------------

// createApp(App)：以根组件 App.vue 为基础，创建一个 Vue 应用实例
// 此时应用还没有真正显示在页面上，只是在内存里创建好了
const app = createApp(App)

// app.use(router)：给应用安装 router 插件
// use() 是 Vue 提供的通用"安装插件"的方法，router、Pinia 等插件都是这样接入的
// 装上之后，所有组件里才能使用 <router-view />、useRouter() 等路由相关功能
app.use(router)

// app.mount('#app')：把应用真正"挂载"到 index.html 里的 <div id="app"></div> 节点上
// 执行完这一行，页面上才会真正出现内容
app.mount('#app')
