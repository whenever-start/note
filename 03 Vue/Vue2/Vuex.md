# vuex

[toc]

## 一、安装与引入

安装

```shell
npm i -S vuex
```

引入

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})

export default store
```

```js
// main.js
import store from './store'

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
```

## 二、核心概念（选项）

### 2.1 `state`

```js
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
```

`mapState`

```js
import { mapState } from 'vuex'
export default {
  // 配置对象
  computed: {
    ...mapState({
      count: (state) => state.count
    })
  },
  // 名字相同时，可以用数组
  computed: {
    ...mapState(['count'])
  }
}
```

### 2.2 `getters`

相当于 `vue` 中的 `computed`

```js
new Vuex.Store({
  getters: {
    countText: (state) => '数量：' + state.count,
    doubleCount: (state) => state.count * 2,
    doubleCountText: (state, getters) => '数量：' + getters.doubleCount
  }
})
```

- `store.getters` 访问

  ```js
  count(){
    return this.$store.state.count
  }
  ```

- `mapGetters`

  ```js
  new Vuex.Store({
    getters: {
      doubleCount: (state) => state.count * 2
    }
  })

  export default {
    computed: {
      // 不同名
      ...mapGetters({
        customCount: 'count'
      }),

      // 同名
      ...mapGetters(['count'])
    }
  }
  ```

- 第二个参数

  ```js
  new Vuex.Store({
    getters: {
      doubleCountText: (state, getters) => getters.doubleCountText + ''
    }
  })
  ```

- 返回一个函数，可以传参

  ```js
  // 此方法没有缓存
  new Vuex.Store({
    getters: {
      getTodoById: (state) => (id) => state.todos.find((todo) => todo.id === id)
    }
  })
  ```

### 2.3 `mutations`

更改 `Vuex` 的 `store` 中的状态的唯一方法是提交 `mutation`。

`Vuex` 中的 `mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的 事件类型 (`type`) 和 一个 回调函数 (`handler`)。

#### `vuex` 中的 `mutations`

```js
new Vuex.Store({
  mutations: {
    increment(state, n) {
      state.count += n
    },

    // 在大多数情况下，载荷应该是一个对象
    increment(state, payload) {
      state.count += payload.amount
    }
  }
})
```

#### `vue` 中的 `mutaions`

- `store.commit` 方式

  ```js
  store.commit(type, payload)
  store.commit('increment', 10)
  // 对象提交风格
  store.commit({
    type: 'increment',
    amount: 10
  })
  ```

- `mapMutations` 方式

  ```js
  import { mapMutations } from 'vuex'

  export default {
    // ...
    methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  }
  ```

#### `Mutation` 需遵守 `Vue` 的响应规则

1. 最好提前在你的 store 中初始化好所有所需属性。

2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者

- 以新对象替换老对象。例如，利用对象展开运算符，我们可以这样写：`state.obj = { ...state.obj, newProp: 123 }`

#### 使用常量替代 `Mutation` 事件类型

优点：

- 可以使 `linter` 之类的工具发挥作用
- 把这些常量放在单独的文件中可以让你的代码合作者对整个 `app` 包含的 `mutation` 一目了然

1. 新建 `mutation-types.js` 文件

   ```js
   export const ADD_TODO = 'ADD_TODO'
   export const REMOVE_TODO = 'REMOVE_TODO'
   ```

2. 引入 `types` 文件

   ```js
   import { ADD_TODO, REMOVE_TODO } from './mutation-types'

   new Vuex.Store({
     mutations: {
       [ADD_TODO](state, todo) {
         state.todos.push(todo)
       },

       [REMOVE_TODO](state, index) {
         state.todos.splice(index, 1)
       }
     }
   })
   ```

`mutation`必须是同步函数，异步函数用 `action`

### 2.4 `actions`

### 2.5 `modules`
