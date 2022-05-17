# vue 基础知识汇总

[toc]

## 简单网页测试

---

1. 创建 html 文件
2. 引入 vue 脚本
3. 实例化(new Vue({选项}))

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

## 生命周期和钩子函数

[vue 官网教程](https://cn.vuejs.org/v2/guide/instance.html#%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%96%B9%E6%B3%95)
[参考来源](https://blog.csdn.net/m0_37805167/article/details/79655346)
[vue 生命周期及其应用场景 1](https://blog.csdn.net/hejiancsdn/article/details/80843408)
[vue 生命周期及其应用场景 2](https://www.jianshu.com/p/57d230ae5538)
[图解](https://www.cnblogs.com/tiger95/p/7902706.html)

---

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

## 模板语法

---

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

## computed 和 watch

---

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

## v-bind 、条件、列表、事件、表单

---

### `class` 和 `style`

**`class`**

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

**`style`**

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

### 条件渲染

**`v-if` 和 `v-show` 的区别:**

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

### 列表渲染

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

### 事件处理

### 表单输入绑定

## 组件

---

### prop 传递数据

```html
<!-- 父组件 -->
<!-- 传递prop数据 -->
<ComponentA msg="msg" />
```

```js
// 父组件
data () {
    return {
        msg: ''
    }
}
```

```html
<!-- 子组件 -->
<p>{{msg}}</p>
```

```js
// 子组件
// 子组件不可直接修改 prop
props: ['msg']
```

### 监听子组件事件

**父组件:**

```html
<!-- 父组件 -->
<!-- 用法子组件 $emit 中命名的事件名监听子组件事件 -->
<ComponentA @custom-event="fn" />

<!-- 父组件自己传参: 用 arguments 表示子组件传来的参数 -->
<!-- arguments 是数组 -->
<ComponentA @custom-event="fn(arguments,666)" />
```

```js
// 父组件
methods: {
    fn (para) {
        // para 为子组件 $emit 传递过来的第二个参数
    }
}
```

**子组件:**

```html
<!-- 子组件 -->
<button @click="clickFn"></button>
```

```js
methods: {
    clickFn () {
        // 通过 $emit 传递事件名称(第一项)和参数(第二项)
        $emit ('custom-event', '参数',...)
    }
}
```

### 父、子组件的双向绑定

**`v-model` 原理:**

```html
<!-- 绑定 input 的value属性 -->
<!-- 绑定 input 的input事件 -->
<input v-model="value" />
<!-- 等同于 -->
<input @input="value = $event.target.value" :value="value" />
```

```js
data () {
    return {
        value: ''
    }
}
```

**组件中用法 v-model 实现双向绑定:**

```html
<!-- 父组件 -->
<ComponentA v-model="value" />
```

```html
<!-- 子组件 -->
<input type="text" @input="handler" :value="value" />
```

```js
prop: ['value'],
methods: {
    handler () {
        this.emit('input', event.target.value)
    }
}
```

**model 选项 自定义组件的 v-model:**

```html
<!-- 父组件 -->
<BaseCheckbox v-model="checked" />
```

```html
<!-- 子组件 -->
<input @change="$emit('change', $event.target.checked)" :checked="checked" />
```

```js
// 子组件
prop: { checked: Boolean },
// model 选项自定义 prop 和 事件,注意为字符串
model: {
    prop: 'checked',
    event: 'change'
}
```

### .sync 语法糖双向绑定

> [深入理解.sync 修饰符](https://www.cnblogs.com/Jingge/p/10724833.html)

**父组件:**

```html
<!-- 父组件 -->
<!-- 原理 -->
<ComponentA @update:msg="msg = $event" :msg="msg" />
<!-- 等同于 -->
<ComponentA :msg.sync="msg" />
```

**子组件:**

```html
<!-- 子组件 -->
<input @input="$emit('update:msg', $event.target.value)" :value="msg" />
```

**绑定多个时(v-model 只能绑定一组):**

```html
<!-- 父组件 -->
<ComponentA :a.sync="value1" :b.sync="value2" :c.sync="value3" />
<!-- 用法对象 -->
<ComponentA v-bind.sync="obj" />
```

```js
// 父组件
data () {
    return {
        obj: {
            a: '',
            b: {},
            c: 1
        }
    }
}
```

## 插槽 slot

---

**普通用法:**

```html
<!-- 子组件 -->
<div class="eg">
  <slot></slot>
</div>

<!-- 父组件 -->
<ComponentA>插入子组件的内容</ComponentA>
<!-- 插入html元素 -->
<ComponentA>
  <p>插入html元素</p>
</ComponentA>
```

```html
<!-- 子组件 BaseLayout -->
<!-- slot 的 name 属性 -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <!-- 默认插槽,相当于 name="default" -->
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<!-- 父组件 -->
<!-- 用法 v-slot 对应子组件中 slot 插槽的 name 属性 -->
<!-- 2.6.0 以前版本为 slot 属性  -->
<base-layout>
  <template v-slot="header">...</template>

  <!-- 默认插槽的内容 即插入 main 中 -->
  <div>...</div>
  <p>...</p>
  <!-- 用 template 包裹更于直观 -->
  <template v-slot="default">...</template>

  <template v-slot="footer">...</template>
</base-layout>
```

**_注意:_** 一般情况, `v-slot` 只能用于 `template` 标签中, 只有当子组件只有一个默认插槽时,可以直接用在组件上.[独占默认插槽的缩写语法](https://cn.vuejs.org/v2/guide/components-slots.html#%E7%8B%AC%E5%8D%A0%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E7%9A%84%E7%BC%A9%E5%86%99%E8%AF%AD%E6%B3%95)

### 插槽 prop

```html
<!-- 子组件 -->
<!-- 用法 v-bind 绑定 插槽prop -->
<!-- 将子组件的 user 传递给父组件 -->
<span>
  <slot v-bind:user="user">...</slot>
</span>
<!-- 父组件 -->
<!-- 用法 v-slot 来接收插槽prop(命名插槽传递过来的prop) -->
<!-- 注意,接受到的 slotProps 为一个对象 -->
<!-- 用法: slotProps.user -->
<base-user>
  <template v-slot:default="slotProps">{{slotProps.user.name}}</template>
</base-user>
<!-- 注意,区别于 v-slot="default" -->

<!-- 多个插槽slot -->
<!-- 子组件 -->
<span>
  <slot v-bind:user="user">...</slot>
  <slot name="slot1" :msg="msg"></slot>
</span>
<!-- 父组件 -->
<base-user>
  <template v-slot:default="slotProps">{{slotProps.user.name}}</template>
  <template v-slot:slot1="slot1Props">{{slot1Props.msg}}</template>
</base-user>
```

**_注意:_** `v-slot: default="slotProps"` 用在 `template` 中,用在 `base-user` 标签可能出错

**只有默认插槽(即只有 1 个插槽)时:**

```html
<base-user>
  <template v-slot:default="slotProps">...</template>
</base-user>
<!-- 等同于 -->
<base-user v-slot:default="slotProps">...</base-user>
<!-- 等同于 -->
<base-user v-slot="slotProps">{{slotProps.user.name}}</base-user>

<!-- ES2015的解构模式用起来更方便 -->
<base-user v-slot="{{user}}">{{user.name}}</base-user>
<!-- 重命名 -->
<!-- 传递过来的user对象重命名为person -->
<base-user v-slot="{{user:person}}">{{person.name}}</base-user>
<!-- 默认值 -->
<!-- 设置user.name默认值 -->
<base-user v-slot="{{user = {name: '小明'}}}">{{user.name}}</base-user>
```

### 动态插槽

```html
<!-- dynamicName: footer -->
<ComponentA>
  <!-- 注意,用冒号 -->
  <template v-slot:[dynamicName]>footer</template>
</ComponentA>
<!-- => -->
<template v-slot="footer">footer</template>

<!-- 错误用法 -->
<template v-slot="[dynamicName]">footer</template>
```

## 动态组件

---

### is 属性(attr) 和 `<component></component>` 标签

```html
<component :is="组件名"></component>
```

### keep-alive

[官网教程](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive)
[官网 API](https://cn.vuejs.org/v2/api/#keep-alive)

```html
<keep-alive>
  <component :is="组件名"></component>
</keep-alive>
```

### 3 个属性

- **_include:_** 字符串或正则表达式。只有名称匹配的组件会被缓存。
- **_exclude:_** 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- **_max:_** 数字。最多可以缓存多少组件实例。

```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起用法 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

**_注意:_** 注意这个 `<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

## prop

---

### prop 类型

```js
// 数组
props: ['title', 'author']

// 对象
props: {
    // 只有类型
    propA: Number,
    // 多个类型
    propB: [String, Number],
    // 多个选项
    propC: {
        type: String, // 类型
        required: true, // 是否必须, 布尔值
        default: 'hello', // 默认值
        default: function () { // 用函数返回默认值
            return 'hello'
        },
        validator: function (value) { // 验证器, value 为 propC 的值,验证其是否符合条件
            // 验证失败, 会有一个控制台警告
            return ['hello', 'good', 'bad'].indexOf(value) !== -1
        }
    }
}
```

### 传递静态值与动态值

```html
<!-- prop: msg -->
<!-- 静态值 -->
<!-- 传递字符串 `abc` -->
<ComA msg="abc"
  ><ComA>
    <!-- 动态值 -->
    <!-- 用 v-bind 或冒号 -->
    <!-- 传递 data 选项中的 msg -->
    <ComA :msg="msg"><ComA></ComA></ComA></ComA
></ComA>
```

一些特殊的赋值

```html
<!-- 数字 -->
<ComA :num="11"></ComA>

<!-- 布尔值 -->
<ComA :onShow></ComA> // 没有值为 true
<ComA :onShow="false"></ComA>

<!-- 一个对象的所有属性 -->
<!-- post = { id: 123, content: 'abc' } -->
<ComA v-bind="post"></ComA>
<!-- 等价于 -->
<ComA :id="post.id" :content: post.content></ComA>
```

### prop 值的更新

1. 父级组件更新 `prop`, 子组件相应更新, 反过来不行
2. 子组件的 `prop` 不能变动, 否则 `vue` 会在控制台发出警告

**两种常见的试图改变 prop 值的情况:**

**_这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来用法(直接用法其值)_**

```js
props: ['msg'],
data: () {
    return {
        str: this.msg
    }
}
```

**_这个 prop 以一种原始的值传入且需要进行转换,用法其值计算_**

```js
props: ['msg'],
computed: {
    str: () {
        // .trim() 返回一个新字符串
        return this.msg.trim() + 'hello'
    }
}
```

### 非 prop 的 属性(attribute)

**组件用法时传入一个属性(attr), 但这个属性并没有在 prop 中定义:**

```html
<!-- 子组件 -->
<!-- prop: msg -->
<div class="eg" color="red">
  <p>{{msg}}</p>
</div>
```

```html
<!-- 第一种: 子组件里没有 -->
<ComA width="200px"></ComA>
<!-- 直接添加到子组件根元素 -->
<div width="200px" class="eg">...</div>

<!-- 第二种: 子组件里有 -->
<ComA color="yellow"></ComA>
<!-- 替换值 -->
<div class="eg" color="yellow">...</div>

<!-- 第三种: class 和 id -->
<ComA class="red"></ComA>
<!-- 合并 -->
<div class="eg red">...</div>
```

### $attrs 和 inheritAttrs

- $attrs: 父组件中除了 prop 外的其它属性(attr),不包括 class 和 id
- inheritAttrs: 值为 false, 表示不继承父组件传递过来的非 prop 属性(attr)

```html
<!-- 子组件 -->
<!-- base-input -->
<div class="wrap">
  <input type="text" v-bind="$attrs" />
</div>
```

```js
// 子组件
inheritAttrs: false
```

```html
<!-- 父组件 -->
<base-input type="radio"></base-input>
```

渲染

```html
<div class="wrap">
  <input type="radio" />
</div>
```

**原理:**

- inheritAttrs=false, 子组件根元素(wrap)不会继承父组件传递过来的 type=radio
- v-bind=$attrs, 使 input 元素继承父元素的非 prop 属性(attr), 即 type=radio

**_注意:_** `inheritAttrs=false` 不会影响 `class` 和 `style`

## 自定义事件

---

### 事件名

**推荐由始自终用法 kebab-case:**

```js
// 子组件
this.$emit('myEvent')
```

```html
<!-- 父组件 -->
<!-- 没有效果 -->
<ComA @my-event="fn"></ComA>
```

### $listeners

**_$listeners:_** 类比 `$attrs`, 包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器

**将原生事件绑定到组件上:**

```html
<!-- .native 将事件 click 绑定到子组件的根元素上 -->
<ComA @click.native="fn"></ComA>
```

但是, 如果想要绑定的目标元素不是根元素,如

```html
<!-- 子组件 -->
<div class="base-input">
  <input class="base-input-input" type="text" />
</div>
```

需要用法 `v-on="$listeners"`, 来将自定义事件绑定到目标元素上

```html
<!-- 子组件 -->
<!-- v-on="$listeners" -->
<div class="base-input">
  <input class="base-input-input" type="text" v-on="$listeners" />
</div>
```

**_提示:_** `$attrs`, `$inheritAttrs`, `$listeners` 常联合用法,用于基础组件如 `base-input`

## 处理边界情况

---

**_在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素_**

### $root, $parent, ref

- `$root`: 根实例(`#app`)
- `$parent`: 组件父级
- `ref`: 类比 `id`, 为元素指定一个 `ref` 名, 调用 `this.$refs.refName`

**_提示:_** 以上 3 个都不是真实的 `dom` 元素, 而是虚拟的 `vue` 元素

**父组件访问子组件的方法(ref):**

```html
<!-- base-input 子组件 -->
<input type="text" ref="input" />
```

```js
// base-input 子组件
methods: {
    focus () {
        this.$refs.input.focus()
    }
}
```

```html
<!-- 父组件 -->
<base-input ref="userName"></base-input>
```

```js
// 父组件
mounted () {
    this.$refs.userName.focus()
}
```

**注意:**

- 用法 `$root` 和 `$parent` 可以访问根实例和父组件的数据和方法, 但如果是中大型项目, 推荐用法 `vuex`
- 如果子组件想用父组件的方法, 推荐 依赖注入 (`inject`), 减少两者间的耦合度(比如在子组件外又套了一个 `div`).
- `$refs` 只会在组件渲染之后生效, 且不是响应式的. 避免在模板或 `computed` 中用法

### 依赖注入

**_provide:_** 为后代组件提供指定的数据和方法

```js
provide () {
    return {
        getMap: this.getMap,
        msg: this.msg
    }
}
```

然后在后代组件里, 用法 `inject` 选项来添加指定的数据和方法

```js
inject: ['getMap']
```

**_注意:_** 耦合度高且非响应式, 可以用 `vuex` 替代

### 程序化的事件侦听器

```js
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```

**让销毁与创建代码在一起:**

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

**多个实例:**

```js
mounted: function () {
  this.attachDatePicker('startDateInput')
  this.attachDatePicker('endDateInput')
},
methods: {
  attachDatePicker: function (refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  }
}
```

**_提示:_** 如果过于复杂, 推荐注册子组件(`Vue.component`)或创建模块化子组件(`.vue` 文件)

### 强制更新($forceUpdate)

手动强制更新数据

**_如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事。_**

### 低开销静态组件(v-once)

```html
<div v-once>
  <p>...</p>
</div>
```

**_v-once:_** 只计算一次内容,然后缓存起来,不再更新

**_注意:_** 尽量不要用, 不利于后期维护(比如看漏了 `v-once`, 而纠结为什么数据不会更新)

## 混入(mixin)

---

**_作用:_** 用来分发 `vue` 组件中的可复用功能,可以包含任意组件选项

**用法:**

```js
// 混入的内容
let mixin = {
  data: {
    mxData: 'mxData'
  },
  methods: {
    fn() {
      console.log('mixin methods')
    }
  }
}

// 实例引入 mixin
const vm = new Vue({
  el: '.app',
  mixins: [mixin]
})
```

**单文件组件(.vue)用法混入:**

```js
// mixin.js
export default {
  data() {
    return {
      a: 'a',
      b: 'b'
    }
  },
  methods: {
    fn() {
      console.log('fn')
    }
  }
}
```

```js
// 引入 mixin 文件
import mixins from '../mixin.js'

// 混入
mixins: [mixins],
// 可以用法混入的数据和方法
created() {
    console.log(this.a) // a
    console.log(this.b) // b
    this.fn() // fn
},
```

### 混入规则

- 数据(`data`)不同时合并, 不同时以组件数据优先
- 同名钩子函数(如 `created`), 限制性混入的, 再执行组件的
- `methods`, `components`, `directives` 等, 不同名的方法/组件/指令合并, 不同名的以组件优先.(参照数据合并)

```js
// 混入
let mixin = {
    data: {
        a: 'a',
        b: 'b',
    },
    methods: {
        fn1 () { console.log(1) },
        fn2 () { console.log(2) },
    },
    created () {
        console.log('钩子函数-混入')
    }
}
// 组件
data: {
    b: 'bb',
    c: 'c',
},
methods: {
    fn2 () { console.log(22) },
    fn3 () { console.log(3) },
}
created () {
    console.log('钩子函数-组件')
}

// 合并后
// 数据(`data`)不同时合并, 不同时以组件数据优先
data: {
    a: 'a',
    b: 'bb',
    c: 'c',
},
// 不同名的方法/组件/指令合并, 不同名的以组件优先.(参照数据合并)
methods: {
    fn1 () { console.log(1) },
    fn2 () { console.log(22) },
    fn3 () { console.log(3) },
},
// 同名钩子函数(如 `created`), 限制性混入的, 再执行组件的
created () {
    console.log('钩子函数-混入')
    console.log('钩子函数-组件')
}
```

## 自定义指令(directives)

---

### 钩子函数(directives)

- **_bind:_** 只调用一次，指令 第一次绑定 到元素时调用。在这里可以进行一次性的 初始化设置。
- **_inserted:_** 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- **_update:_** 所在组件的 `VNode` 更新时调用
- **_componentUpdated:_** 指令所在组件的 `VNode` 及其子 `VNode` 全部更新后调用。
- **_unbind:_** 只调用一次，指令与元素 解绑 时调用。

### 钩子函数参数

- **_el:_** 指令所绑定的元素，可以用来直接操作 `DOM`
- **_binding:_** 一个对象，包含以下 `property`:
  - **_name:_** 指令名，不包括 `v-` 前缀。
  - **_value:_** 指令的绑定值，例如: `v-my-directive="1 + 1"` 中，绑定值为 2。
  - **_oldValue:_** 指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - **_expression:_** 字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - **_arg:_** 传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - **_modifiers:_** 一个包含修饰符的对象。例如: `v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

**用法:**

```js
// directives.js
export default {
  bind: function () {
    // 做绑定的准备工作
    // 一些初始化
    // 比如添加事件监听器，或是其他只需要执行一次的复杂操作
  },
  inserted: function (newValue, oldValue) {
    // 被绑定元素插入父节点时调用
  },
  update: function (newValue, oldValue) {
    // 根据获得的新值执行对应的更新
    // 对于初始值也会被调用一次
  },
  unbind: function () {
    // 做清理工作
    // 比如移除在 bind() 中添加的事件监听器
  }
}
```

```js
// clickOutside.js
// 当鼠标点击目标元素外部时, 做一些处理
export default {
  bind(el, binding, vNode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        // 这里的 value 是个函数
        // 将目标元素 el 和 点击区域 e (或e.target)作为参数
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
```

### 函数简写

**在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。比如这样写:**

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
// 或者
export default {
  function(el, binding) {
    el.style.backgroundColor = binding.value
  }
}
```

**动态参数:**

```html
<div v-myDirective:[argument]="value"></div>

<!-- direction: left, top -->
<p v-pin:[direction]="200"></p>
```

## 过滤器

---

过滤器可以用在两个地方：**_双花括号插值和 v-bind 表达式_**

**_filter 中不能引用 vm 实例(即不能用法 this)_**

**用法:**

```html
{{ 参数(value) | 指令名 }}

<div v-bind:id="参数 | 指令名"></div>

<!-- 实例 -->
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

**串联:**

```html
<!-- 先 message | filterA  -->
<!-- 返回的值 value | filterB -->
{{ message | filterA | filterB }}
```

**传参:**

```html
<!-- 第一个参数还是 message -->
<!-- 从第二个起就是 arg1 arg2 ... -->
{{ message | filterA('arg1', arg2) }}
```
