# JavaScript 基础语法

> 适合有 Java 后端基础的同学。读完这篇你能看懂前端项目中的 JS 代码，并能自己写基本的交互逻辑。

---

## 一、JavaScript 是什么？

JavaScript（简称 JS）是浏览器的编程语言，让网页"动起来"。

| 语言 | 职责 |
|------|------|
| HTML | 内容结构 |
| CSS | 外观样式 |
| JavaScript | 交互行为（点击事件、数据请求、动态更新内容） |

### JS 和 Java 的关系

**没有关系。** 就像雷锋和雷峰塔的关系。名字相似是历史原因（1995 年 Netscape 为了蹭 Java 的热度）。

| 维度 | Java | JavaScript |
|------|------|-----------|
| 类型系统 | 静态强类型 | 动态弱类型 |
| 运行环境 | JVM | 浏览器 / Node.js |
| 面向对象 | 基于类（class） | 基于原型（prototype） |
| 编译 | 编译为字节码 | 解释执行（JIT 优化） |

---

## 二、变量声明

### 三种声明方式

```javascript
// var（不推荐）：函数作用域，有变量提升
var name = '张三';

// let（推荐）：块级作用域，可重新赋值
let count = 0;
count = 1;  // ✅ 可以重新赋值

// const（默认推荐）：块级作用域，不可重新赋值
const PI = 3.14;
// PI = 3;  // ❌ 报错
```

### const 的陷阱

```javascript
const user = { name: '张三', age: 25 };

// ✅ 可以修改对象属性（引用没变）
user.name = '李四';
user.age = 26;

// ❌ 不能重新赋值整个对象
// user = { name: '王五' };  // 报错！

const list = [1, 2, 3];
list.push(4);  // ✅ 可以修改数组内容
// list = [4, 5, 6];  // ❌ 报错！
```

**记忆口诀：const 锁的是"指针"不是"内容"。**

### 变量命名规则

```javascript
// ✅ 合法命名
let userName = '张三';     // 驼峰命名（推荐）
let _private = '私有';
let $price = 99;

// ❌ 非法命名
// let 2name = '错误';     // 不能数字开头
// let my-name = '错误';   // 不能用连字符
// let let = '错误';       // 不能用关键字
```

---

## 三、数据类型

### 基本类型（7 种）

```javascript
// 1. 字符串 String
let name = '张三';
let template = `你好，${name}`;  // 模板字符串（反引号）

// 2. 数字 Number（不区分整数和浮点数）
let age = 25;
let price = 9.99;
let infinity = Infinity;

// 3. 布尔值 Boolean
let isTrue = true;
let isFalse = false;

// 4. 空值 Null（有意设为空）
let data = null;

// 5. 未定义 Undefined（声明了但没赋值）
let something;
console.log(something);  // undefined

// 6. Symbol（少见，表示唯一标识符）
let id = Symbol('id');

// 7. BigInt（大整数，少见）
let big = 9007199254740991n;
```

### 引用类型

```javascript
// 对象 Object（类似 Java 的 Map）
let user = {
  name: '张三',
  age: 25,
  city: '北京'
};

// 访问属性
console.log(user.name);    // '张三'
console.log(user['age']);  // 25

// 修改属性
user.age = 26;
user.email = 'zhangsan@test.com';  // 添加新属性

// 数组 Array
let list = [1, 2, 3, '四', true];
console.log(list[0]);     // 1
list.push(5);              // 末尾添加
list.length;               // 5

// 函数 Function（函数也是值）
let greet = function(name) {
  return 'Hello, ' + name;
};
```

### typeof 查看类型

```javascript
typeof 'hello'      // 'string'
typeof 42           // 'number'
typeof true         // 'boolean'
typeof undefined    // 'undefined'
typeof null         // 'object'（这是一个历史 bug，null 不是对象）
typeof {}           // 'object'
typeof []           // 'object'（数组也是对象）
typeof function(){} // 'function'
```

---

## 四、字符串操作

```javascript
const name = '吕鑫宇';
const city = '北京';

// 1. 模板字符串（推荐！用反引号）
const msg = `我叫${name}，来自${city}`;
// → "我叫吕鑫宇，来自北京"

// 2. 字符串拼接（老写法，不推荐）
const old = '我叫' + name + '，来自' + city;

// 3. 常用方法
'Hello World'.length;        // 11，字符串长度
'Hello'.toLowerCase();       // 'hello'
'Hello'.toUpperCase();       // 'HELLO'
'  hello  '.trim();          // 'hello'，去首尾空格
'Hello World'.split(' ');    // ['Hello', 'World']，分割成数组
'Hello'.includes('ell');     // true，是否包含
'Hello'.replace('H', 'J');   // 'Jello'，替换
'Hello'.substring(1, 3);     // 'el'，截取 [1, 3)
'Hello'.charAt(0);           // 'H'，取指定位置字符
```

---

## 五、数组操作

数组是前端最常用的数据结构，务必熟练掌握以下方法。

### 创建和访问

```javascript
const fruits = ['苹果', '香蕉', '橘子'];

// 访问
fruits[0];        // '苹果'
fruits.length;    // 3

// 修改
fruits[0] = '西瓜';
```

### 添加和删除

```javascript
const list = [1, 2, 3];

// 末尾操作
list.push(4);       // [1, 2, 3, 4]，末尾添加，返回新长度
list.pop();         // [1, 2, 3]，末尾删除，返回删除的元素

// 开头操作
list.unshift(0);    // [0, 1, 2, 3]，开头添加
list.shift();       // [1, 2, 3]，开头删除

// 任意位置
list.splice(1, 1);       // [1, 3]，从索引1开始删1个
list.splice(1, 0, 'x');  // [1, 'x', 3]，从索引1开始插入
```

### 遍历

```javascript
const colors = ['red', 'green', 'blue'];

// forEach：遍历，无返回值
colors.forEach((color, index) => {
  console.log(`${index}: ${color}`);
});

// for...of：遍历值
for (const color of colors) {
  console.log(color);
}

// for...in：遍历索引（不推荐用于数组）
for (const index in colors) {
  console.log(index, colors[index]);
}
```

### 高阶方法（重点！）

这些方法不改变原数组，返回新数组或值：

```javascript
const stores = [
  { id: 1, name: '门店A', sales: 12000, city: '北京' },
  { id: 2, name: '门店B', sales: 8000, city: '上海' },
  { id: 3, name: '门店C', sales: 15000, city: '北京' }
];

// filter：过滤，返回满足条件的新数组
const beijingStores = stores.filter(s => s.city === '北京');
// [{ id: 1, ... }, { id: 3, ... }]

// map：映射，把每个元素转换成新形式
const names = stores.map(s => s.name);
// ['门店A', '门店B', '门店C']

// find：查找第一个满足条件的元素
const found = stores.find(s => s.sales > 10000);
// { id: 1, name: '门店A', ... }

// findIndex：查找索引
const index = stores.findIndex(s => s.name === '门店B');
// 1

// reduce：归约，把数组"压缩"成一个值
const totalSales = stores.reduce((sum, s) => sum + s.sales, 0);
// 35000

// some：是否有满足条件的元素（返回 boolean）
const hasBeijing = stores.some(s => s.city === '北京');
// true

// every：是否全部满足条件（返回 boolean）
const allPositive = stores.every(s => s.sales > 0);
// true

// sort：排序（会改变原数组，建议先复制）
const sorted = [...stores].sort((a, b) => b.sales - a.sales);
// 按销售额降序

// includes：是否包含某值
[1, 2, 3].includes(2);  // true

// join：数组转字符串
['a', 'b', 'c'].join('-');  // 'a-b-c'
```

---

## 六、对象操作

```javascript
const user = { name: '张三', age: 25, city: '北京' };

// 解构赋值：从对象中提取属性
const { name, age } = user;
// 等价于：const name = user.name; const age = user.age;

// 重命名解构
const { name: userName } = user;
// userName = '张三'

// 默认值
const { phone = '未知' } = user;
// phone = '未知'（因为 user 没有 phone 属性）

// 展开运算符
const userWithExtra = { ...user, email: 'test@test.com' };
// { name: '张三', age: 25, city: '北京', email: 'test@test.com' }

// Object.keys / values / entries
Object.keys(user);    // ['name', 'age', 'city']
Object.values(user);  // ['张三', 25, '北京']
Object.entries(user);  // [['name', '张三'], ['age', 25], ['city', '北京']]

// 判断属性是否存在
'name' in user;        // true
user.hasOwnProperty('name');  // true
```

---

## 七、函数

### 函数声明

```javascript
// 1. 函数声明（有提升，可在定义前调用）
function add(a, b) {
  return a + b;
}

// 2. 函数表达式
const add = function(a, b) {
  return a + b;
};

// 3. 箭头函数（推荐！更简洁）
const add = (a, b) => a + b;

// 多行箭头函数
const add = (a, b) => {
  const sum = a + b;
  return sum;
};

// 无参数
const greet = () => 'Hello!';

// 一个参数（可省略括号）
const double = n => n * 2;
```

### 默认参数

```javascript
function greet(name = '匿名用户') {
  return `你好，${name}`;
}
greet();        // '你好，匿名用户'
greet('张三');  // '你好，张三'
```

### 箭头函数的 this（重要！）

```javascript
// 普通函数：this 指向调用者
const obj = {
  name: 'Vue',
  say: function() {
    console.log(this.name);  // 'Vue'
  }
};

// 箭头函数：没有自己的 this，继承外层
const obj2 = {
  name: 'Vue',
  say: function() {
    setTimeout(() => {
      console.log(this.name);  // 'Vue'（继承 say 的 this）
    }, 100);
  }
};

// 如果用普通函数，this 会丢失
const obj3 = {
  name: 'Vue',
  say: function() {
    setTimeout(function() {
      console.log(this.name);  // undefined（this 指向 window）
    }, 100);
  }
};
```

**规则：回调函数中用箭头函数，this 不会丢。**

---

## 八、条件判断

### if...else

```javascript
const score = 85;

if (score >= 90) {
  console.log('优秀');
} else if (score >= 80) {
  console.log('良好');
} else if (score >= 60) {
  console.log('及格');
} else {
  console.log('不及格');
}
```

### 三元运算符

```javascript
const age = 20;
const status = age >= 18 ? '成年' : '未成年';
```

### switch

```javascript
const day = 'Monday';
switch (day) {
  case 'Monday':
    console.log('星期一');
    break;  // 不写 break 会继续执行下一个 case
  case 'Tuesday':
    console.log('星期二');
    break;
  default:
    console.log('其他');
}
```

### 短路求值（技巧）

```javascript
// && ：左边为真则返回右边
const name = user && user.name;  // 如果 user 存在则取 name

// || ：左边为假则返回右边（设置默认值）
const displayName = user.name || '匿名';

// ?? ：空值合并运算符（只有 null/undefined 才返回右边）
const count = data ?? 0;
```

---

## 九、异步编程（前端核心！）

JS 是单线程的，网络请求、定时器等操作不会阻塞主线程。

### 1. 回调函数（老方式，不推荐）

```javascript
setTimeout(() => {
  console.log('1秒后执行');
}, 1000);
```

### 2. Promise

```javascript
// 创建 Promise
const fetchUser = new Promise((resolve, reject) => {
  // 模拟网络请求
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ name: '张三', age: 25 });  // 成功
    } else {
      reject(new Error('网络错误'));        // 失败
    }
  }, 1000);
});

// 使用 Promise
fetchUser
  .then(user => {
    console.log('成功：', user);
  })
  .catch(err => {
    console.log('失败：', err);
  })
  .finally(() => {
    console.log('无论成功失败都执行');
  });
```

### 3. async/await（推荐！最直观）

```javascript
// async 标记函数为异步函数
async function loadUserData() {
  try {
    // await 等待 Promise 完成，直接拿到结果
    const user = await fetchUser();
    console.log('用户数据：', user);

    // 串行：一个接一个
    const orders = await fetchOrders(user.id);
    console.log('订单数据：', orders);
  } catch (err) {
    console.log('出错了：', err);
  }
}

// 并发：多个请求同时发出
async function loadAll() {
  const [user, config] = await Promise.all([
    fetchUser(),
    fetchConfig()
  ]);
  console.log('全部完成：', user, config);
}
```

**Java 后端类比：async/await ≈ CompletableFuture，但语法更简洁。**

---

## 十、ES6+ 常用语法速查

| 语法 | 示例 | 说明 |
|------|------|------|
| let/const | `const x = 1` | 块级作用域变量 |
| 箭头函数 | `(a, b) => a + b` | 更简洁的函数 |
| 模板字符串 | `` `Hello ${name}` `` | 字符串插值 |
| 解构赋值 | `const {a, b} = obj` | 提取属性 |
| 展开运算符 | `...arr` | 展开/合并 |
| 默认参数 | `fn(a = 1)` | 参数默认值 |
| Promise | `new Promise()` | 异步编程 |
| async/await | `await fn()` | 异步同步化 |
| 类 | `class Foo {}` | 面向对象 |
| 模块 | `import/export` | 模块化 |
| 可选链 | `obj?.name` | 安全访问嵌套属性 |
| 空值合并 | `a ?? b` | 空值时用默认值 |

### 可选链和空值合并（项目常用）

```javascript
// 可选链 ?. ：安全访问嵌套属性（不存在不会报错）
const userName = response?.data?.user?.name;  // 不会报错，可能返回 undefined

// 空值合并 ?? ：只有 null/undefined 才用默认值
const name = response?.data?.name ?? '匿名用户';
```
