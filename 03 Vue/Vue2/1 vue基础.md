# vue 基础知识汇总

[toc]

## 一、简单网页测试

1. 创建 `html` 文件
2. 引入 `vue` 脚本
3. 实例化(`new Vue({选项})`)

```html
<!-- vue 脚本 -->
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js"></script>

<div class="app">
  <p>{{msg}}</p>
</div>

<script>
  const vm = new Vue({
    el: '.app',
    data: {
      msg: 'hello'
    }
  })
</script>
```

## 二、生命周期和钩子函数

[vue 官网教程](https://cn.vuejs.org/v2/guide/instance.html#%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%96%B9%E6%B3%95)
[参考来源](https://blog.csdn.net/m0_37805167/article/details/79655346)
[vue 生命周期及其应用场景 1](https://blog.csdn.net/hejiancsdn/article/details/80843408)
[vue 生命周期及其应用场景 2](https://www.jianshu.com/p/57d230ae5538)
[图解](https://www.cnblogs.com/tiger95/p/7902706.html)

### 关键词

- `created`
- `mounted`
- `updated`
- `destroyed`

### 钩子函数详解

**`beforeCreate`:**

`vue` 实例创建前,此时 `data` 和 `$el` 未初始化,值为 `undefined`

**`created`**
创建 `vue` 实例,但还未绑定到 `dom` 元素,`$el` 为初始化

**`beforeMount`:**

`data` 和 `$el` 均已存在,但 `dom` 为虚拟,仍未完全加载,`$el` 为 `undefined`

**`mounted`:**

`dom` 加载完成

**`beforeUpdate`:**

渲染完成,但又检测到 `data` 数据发生变化,在变化的数据重新渲染之前触发,这也是重新渲染之前最后修改数据的机会(再次渲染前)

**`updated`:**

检测到 `data` 数据变化,并且变化后的数据已经完成渲染后触发(再次渲染完成后)

**`beforeDestroyed`:**

实例销毁之前调用,实例仍然完全可用。调用 `vm.destroyed()` 后触发

**`destroyed`:**

实例销毁后调用.所有绑定接触、监听移除、子实例销毁

### 钩子函数应用场景

1. `beforeCreate`: `loading` 效果,`created` 时移除
2. `created: 需要异步请求数据的方法可以在此时执行，完成数据的初始化`
3. `mounted`: 当需要操作 `dom` 的时候执行,可以配合 `$.nextTick` 用法,进行单一事件对数据的更新后跟新立即 `dom`
4. `updated`: 当数据更新需要做统一业务处理的时候

## 三、模板语法

### 文本

**胡子语法:**

```html
<span>{{msg}}</span>
```

```js
data:(){
    return {
        msg: ''
    }
}
```

**v-once:**

```html
<!-- 一次性插入值,不会更新 -->
<span v-once>{{msg}}</span>
```

**v-on v-bind:**

```html
<div v-bind:class="div">绑定属性</div>
<div :class="div">v-bind 缩写</div>

<div v-on:click="clickFn">绑定事件</div>
<div @click="clickFn">v-on 缩写</div>
<!-- 动态参数 -->
<div v-on:[eventName]="eventFn">do something</div>
<!-- 修饰符 -->
<div @click.prevent="clickFn">添加修饰符</div>
```

### 指令

```html
<p v-if="onShow">是否显示</p>
```

## 四、computed 和 watch

### computed

区别于 `methods` 中的方法,`computed` 中的数据会根据 `data` 中的数据变化而自动更新(`data` 中的数据没变化则不变动)

```html
<button @click="changeMsg">按钮</button>
```

```js
data(){
  return {
    msg: '',
    basis: 'hello'
  }
}
// 一般用法, this.newMsg 不可修改(强行修改会报错)
computed:{
  newMsg(){
    return this.msg + this.basis
  }
}
// setter 和 getter(默认只有getter) 属性
// this.newMsg 可以修改, this.basis 和 this.msg 也被修改
computed: {
  newMsg: {
    get () {
      return this.msg + this.basis
    },
    set (newVal) { // newVal 为 newMsg 的更新值
      this.basis = this.msg
      this.msg = newVal
    }
  }
}
methods: {
  changeMsg () {
    this.newMsg = 'yes'
  }
}
```

### watch

> [Vue 中 watch 用法详解](https://www.jianshu.com/p/b70f1668d08f)

需要异步操作如 `axios` 或开销较大时用法

```js
data(){
    return {
        msg: ''
    }
}
// 第一种用法
watch:{
  msg (newVal, oldVal){
    let vm = this
    axios.get('https://yesno.wtf/api')
      .then(response => {
        vm.msg = response
      })
      .catch(error => {
        vm.msg = 'could not reach the API' + error
      })
  }
}
// 第二种用法
watch: {
  msg:{
    handler (newVal, oldVal) {
      // ...
    },// 注意,这是个对象,用法 ',' 分隔
    immediate: true, // 先执行 handler 函数一次(默认第一次不执行)
    deep: true // 监测对象属性的变化(默认不监测)
  }
}

// 监听一个数据, 修改另一个数据
// 如果用 computed, 需要传入 (item,index) in items 里的 index, 但 computed 不能传参数
// 所以监听 currentIndex, 再比较更新前后的值的大小
watch: {
  currentIndex (newIndex, oldIndex) {
    this.animationName = newIndex > oldIndex ? 'move-fade-left-to-right' : 'move-fade-right-to-left'
  }
},
```

## 五、`class` 和 `style`

### `class`

```html
<!-- 对象 -->
<!-- 1. key value 形式, active 是 字符串, isActive 是 data 中的数据, 返回 truthy/falsy -->
<div :class="{ active: isActive }"></div>
<!-- 2. 多个样式名, text-danger 模式要用引号 -->
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
<!-- 3. classObject 可以在 computed 中求值(常用) -->
<div :class="classObject"></div>

<!-- 数组 -->
<!-- 1. activeClass 和 errorClass 为 data 中的数据 -->
<div :class="[activeClass, errorClass]"></div>
<!-- 2. 可以用表达式 -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 3. 和对象一起用 -->
<div :class="[{ active: isActive }, errorClass]"></div>
```

**_注意:_**

1. 对象中, 如 `{key: value}` 中, `key` 是样式名, 是字符串, 而 `value` 是 `data` 中的数据, 最终返回 `真值/假值`
2. 数组中, 如 `[item]`中, `item` 是 `data` 中的数据, 返回一个字符串作为样式名

### `style`

```html
<!-- 对象 -->
<!-- 1. key: value -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<!-- 2. 绑定到 data 或 computed (后者常用) -->
<div :style="styleObject"></div>

<!-- 数组 -->
<!-- 1. baseStyles overridingStyles 为 data / computed 中的数据 -->
<div :style="[baseStyles, overridingStyles]"></div>
<!-- 2. 多重值, 类比 css 的覆盖 -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
<!-- 3. 数组中加对象 -->
<div :style="[baseStyles, {backgroundColor: '#bfa'}]">style</div>
```

**_提示:_** `vue` 会自动添加浏览器前缀

## 六、条件渲染

### `v-if` 和 `v-show` 的区别

`v-if` 为 `false` 的元素不会被渲染出来, `f12` 查看时在 `dom` 中是找不到的. `v-show` 为 `false` 的元素会被渲染出来, 切换的只是 `display` 为 `none`.

```html
<!-- if 里是表达式, 字符串加引号 -->
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else="awesome === 'a'">Oh no 😢</h1>
<h1 v-else>Oh no 😢</h1>

<!-- template 渲染时会被忽略 -->
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

<!-- 用 key 管理可复用元素 -->
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input" />
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input" />
</template>

<h1 v-show="ok">Hello!</h1>
```

## 七、列表渲染

```html
<!-- 数组 -->
<li v-for="item in array">{{item}}</li>
<li v-for="(item,index) in array">{{item}}</li>

<!-- 对象 -->
<li v-for="key in object">{{key}}</li>
<li v-for="(key,value) in object">{{key: value}}</li>
<li v-for="(key,value,index) in object">{{key: value}}</li>

<!-- key -->
<li v-for="item in array" :key="item.id">{{item}}</li>
```

### 数组更新检测

- 变更方法：使用这些方法操作数据，`dom` 会同步更新

  `push` `pop` `shift` `unshift` `splice` `sort` `reverse`

- 替换数组：使用这些方法，由于生成的是新数组而不改变原数组，可以让原数组等于新数组，同样可以更新，且能高效渲染。比如 `filter` `concat` `slice`

  ```js
  // 可以同步更新，dom 也不会删掉前面的元素再重新渲染
  this.list = this.list.concat([1, 2, 3])
  ```

### 检测数组何对象的变化

由于 `js` 的原因，`vue` 不能检测到数组何对象的变化，因此无法同步`dom`。

- 对象：无法检测属性的添加和移除。

  ```js
  // 数据
  data = {
    dog: {
      name: '小黑',
      age: 3,
      like: 'play'
    },
    list: [
      {
        id: 1,
        name: 'an',
        age: 18
      },
      {
        id: 2,
        name: 'bn',
        age: 18
      },
      {
        id: 3,
        name: 'cn',
        age: 18
      }
    ]
  }
  ```

  ```js
  // 操作
  this.list.forEach((item) => {
    // 直接修改 vue 无法检测到，因此不会同步到 dom 中
    item.sex = '男'

    // 使用 Vue.set(object,propertyName,value)
    // 或者 this.$set(this.object,propertyName,value)
    this.$set(item, 'sex', Math.random() > 0.5 ? '男' : '女')
  })

  // 使用 Object.assign()
  // 无法响应
  Object.assign(this.dog, { sex: 'boy' })
  // 使用新对象来接收
  this.newDog = Object.assign({}, this.dog, { sex: 'boy' })
  // 需要在 data 中声明，在 created 中赋值，html 中也用这个属性
  this.newDog = this.dog
  ```

- 数组：不能直接用序号赋值、不能操作 `length`

  ```js
  // 非响应式：不能直接用序号赋值
  this.items[1] = 'hello'
  // Vue.set 或 this.$set 解决
  this.$set(this.items, '1', 'hello')
  // 利用 splice 解决（改变了原数组）
  this.items.splice(1, 1, 'hello')

  // 非响应式：不能操作 `length`
  this.items.length = 0
  // 利用  splice 解决
  this.items.splice(1)
  ```

### 显示过滤后的数组

在 `computed` 中用新数组，而不变更或重置原数组。

```js
new Vue({
  data() {
    return(){
      items: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  computed: {
    evenNumbers() {
      return this.numbers.filter((n) => n % 2 === 0)
    }
  }
})
```

如果不适合用 `computed` （比如要用到参数或者嵌套 `v-for` 等），可以用 `methods`

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{n}}</li>
</ul>
```

```js
new Vue({
  data() {
    sets: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10]
    ]
  },
  methods: {
    even(array) {
      return array.filter((n) => n % 2 === 0)
    }
  }
})
```

### `v-for` + `template`

渲染结果没有 `template`

```html
<!-- 使用 v-for + template -->
<ul>
  <template v-for="item in list">
    <li>{{item.name}}</li>
    <li>{{item.age}}</li>
    <li>{{item.id}}</li>
  </template>
</ul>
```

```js
new Vue({
  data: {
    list: [
      {
        id: 1,
        name: 'an',
        age: 18
      },
      {
        id: 2,
        name: 'bn',
        age: 18
      },
      {
        id: 3,
        name: 'cn',
        age: 18
      }
    ]
  }
})
```

### `v-for` 与 `v-if` 一同使用

`v-for` 优先级更高，即会渲染多个列表，每个列表再判断自身的 `v-if`
不推荐在同意元素上同时使用。

```html
<!-- isComplete === false 的会被渲染 -->
<!-- isComplete === true 的不会被渲染 -->
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo }}</li>

<!-- 想要判断整体，则在外面套个 div -->
<ul v-if="todos.length">
  <li v-for="todo in todos">{{ todo }}</li>
</ul>
<p v-else>No todos left!</p>
```

## 八、事件处理

### 原生事件 `event`

- `key-value` 形式可以直接访问到 `event`
- `es6` 的方法，需要在 `@click` 中手动添加 `$event`

```html
<button @click="fn1">fn1</button> <button @click="fn2($event)">fn2</button>
```

```js
methods: {
  // key-value 形式可以直接访问到 event
  fn1: function(){
    console.log(event)
  },
  // es6 的方法，需要在 @click 中手动添加 $event
  fn2(event){
    console.log(event)
  }
}
```

### 事件修饰符

- `stop`
- `prevent`
- `capture`
- `self`
- `once`
- `passive`

```txt
click.stop: 阻止冒泡，event.stopPropagation()
click.prevent: 阻止原生事件，event.preventDefault()
click.capture: 捕获模式。div.addEventListener('click',handle,true)
click.self: event.target 为自身时触发。
click.once: 只触发一次。
scroll.passive: “被动、顺从”。div.addEventListener('scroll',handle,{passive:true})。主动告诉浏览器不会阻止默认事件，可以让滚动更加顺滑。不可以与 prevent 修饰符一起使用，否则会被忽略并触发警告。
```

### 按键修饰符

- `enter`
- `tab`
- `delete` (捕获“删除”和“退格”键)
- `esc`
- `space`
- `up`
- `down`
- `left`
- `right`
- `ctrl`
- `alt`
- `shift`
- `meta`

可以全局自定义

```js
// 112 是 f1 键位的 keycode，名字可以自定义。
// keycode: https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode
Vue.config.keyCodes.f1 = 112
```

```html
<!-- ctrl+click -->
<div v-on:click.ctrl="doSomething">Do something</div>

<!-- 功能键只有 ctrl 被按下会触发，同时按下 shift alt meta 不会触发 -->
<div v-on:click.ctrl.exact="doSomething">Do something</div>
```

### 鼠标按钮修饰符

- `left`：鼠标左键
- `right`：鼠标右键
- `middle`：鼠标中间

## 九、表单输入绑定

- 作用元素：`input` `textarea` `select`
- 本质：语法糖

不同元素绑定不同的 **_属性_** 和 **_事件_**

- `text`和`textarea`：`value` + `input`
- `checkbox`和`radio`：`checked` + `change`
- `select`：`value` + `change`

### 9.1 基础用法

输入框：`text` 和 `textarea`

```html
<!-- data: input: '' -->
<input type="" v-model="input" />
<p>input: {{input}}</p>

<!-- data: text: '' -->
<textarea name="text" v-model="text" id="text" cols="30" rows="10"></textarea>
<p>text: {{text}}</p>
```

复选框、单选框：`checkbox` `radio`

```html
<!-- 复选框 -->
<!-- data: like: [] -->
<form action="xxx" method="get">
  <input
    name="like"
    type="checkbox"
    v-model="like"
    id="like-basketball"
    value="like-basketball"
  />
  <label for="like-basketball">篮球</label>
  <input
    name="like"
    type="checkbox"
    v-model="like"
    id="like-football"
    value="like-football"
  />
  <label for="like-football">足球</label>
  <input
    name="like"
    type="checkbox"
    v-model="like"
    id="like-volleyball"
    value="like-volleyball"
  />
  <label for="like-volleyball">排球</label>
  <button>提交</button>
</form>
<div>like: {{like}}</div>

<!-- 单选框 -->
<!-- data: sex: '' -->
<input type="radio" name="sex" id="male" v-model="sex" value="0" />
<label for="male">男</label>

<input type="radio" name="sex" id="female" v-model="sex" value="1" />
<label for="female">女</label>

<p>sex: {{sex}}</p>
```

选择框：`select`

```html
<!-- data: selected: '' -->
<select name="select" id="select" v-model="selected">
  <!-- 
    如果 v-model 表达式的初始值未能匹配任何选项，<select> 元素将被渲染为“未选中”状态。
    在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。
    因此，更推荐像这样提供一个值为空的禁用选项。 
  -->
  <option value="" disabled>请选择</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</select>
<p>selected: {{selected}}</p>

<!-- 多选：添加 multiple 属性 -->
<!-- 按住 ctrl 键点击实现多选 -->
<!-- data：select: [] -->
<select name="select" id="select" v-model="selected" multiple>
  <option value="" disabled>请选择</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</select>
<p>selected: {{selected}}</p>
```

### 9.2 值绑定

对于单选框、复选框和选择框的选项，默认绑定的是字符串（复选框可以是布尔值），可以绑定动态值

单选框：`radio`

```html
<!-- data: sex: '', male: 'male', female: 'female' -->
<input type="radio" name="sex" id="male" v-model="sex" :value="male" />
<label for="male">男</label>

<input type="radio" name="sex" id="female" v-model="sex" :value="female" />
<label for="female">女</label>
<p>sex: {{sex}}</p>
```

### 9.3 修饰符

- `.lazy`：在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件 **_之后_** 进行同步

- `.number`：如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符

- `.trim`：如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" />

<input v-model.number="age" type="number" />

<input v-model.trim="msg" />
```
