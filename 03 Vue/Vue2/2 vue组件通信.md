# vue 组件通信

[vue 中 8 种组件通信方式](https://juejin.cn/post/6844903887162310669)

[toc]

组件关系

- 父子关系：`props + $emit` `$parent + $children` `ref`
- 隔代关系：`provide + inject` `$attrs + $listeners`
- 任意关系：`eventBus` `vuex`

## 一、父子关系

### 1.1 `props + $emit`

1. 父组件：`<child :msg="msg" @change-msg="msg = $event" />`
2. 子组件：`this.$emit('event-name', data)`

### 1.2 `$parent + $children`

- 父组件：`<button @click="$children[0].say()">调用子级的方法</button>`
- 子组件：`<button @click="$parent.say()">调用父级方法</button>`

### 1.3 `ref`

- 父组件：
  - `<child ref="childA" />`
  - `mounted` 中调用子组件方法：`this.$refs.childA.say()`
- 子组件：

## 二、隔代关系

### 2.1 `provide + inject`

- 父组件

  ```js
  export default {
    provide() {
      return {
        parentProvide() {
          console.log('父组件的 provide 方法')
        }
      }
    }
  }
  ```

- 子组件
  - `<button @click="parentProvide()">provide 方法</button>`
  - `inject: ['parentProvide']`

**_缺点：_**

- 它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。
- 同时所提供的 property 是非响应式的。

### 2.2 `$attrs + $listeners`

- `$attrs` 继承父元素的非 `props` 属性（不包括 `class` 和 `style`）
- `$listeners`：获取父元素绑定的事件，是一个对象。
- `inheritAttrs`：添加到子组件 `<Child name="abc" />` 的非 `props` 属性，默认会渲染到 `html` 中的，`<div class="child" name="abc"></div>`，设置 `inheritAttrs: false` 可以关闭，再用 `$attrs` 来继承。

```html
<!-- 父组件 -->
<child
  :msg="msg"
  :name="person.name"
  :age="person.age"
  @change-msg="msg = $event"
  @abc="number = $event"
  @click="console.log('click')"
/>

<!-- 子组件 -->
<div class="child">
  <!-- msg 是 props 属性，不会被继承 -->
  <p>child {{ msg }}</p>
  <!-- 可以直接调用父级绑定的方法 -->
  <button @click="$listeners.click">listeners按钮</button>
  <!-- 可以直接用 $attrs 继承非 props 属性 -->
  <p>$attrs: {{ $attrs }}</p>
  <!-- 可以往下一级传递 -->
  <grandson v-bind="$attrs" v-on="$listeners" />
</div>
```

## 三、任意关系

### 3.1 `eventBus`

```js
// main.js
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
```

```js
// 父级
export default {
  mounted() {
    this.$bus.on('event-name', callback)
  },
  destroyed() {
    this.$bus.off('event-name')
  }
}
```

```html
<!-- 子级 -->
<button @click="$bus.emit('event-name',arg)"></button>
```

### 3.2 `vuex`
