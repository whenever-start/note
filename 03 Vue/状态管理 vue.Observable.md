# vue.Observable ()进行状态管理

> [https://www.jianshu.com/p/e97502f89bde]

创建 store/index.js

```js
import Vue from 'vue'
export const state = Vue.observable({
  screenCars: {}
})
export const mutations = {
  updateScreenCars(payload) {
    state.screenCars = Object.assign({}, payload)
  }
}
```

`vue` 中使用

```html
<template>
  <div>
    <el-button @click="toSave">保存</el-button>
  </div>
</template>

<script>
  // 1. 引入
  import { state, mutations } from './store.js'
  export default {
    name: 'table_form',
    computed: {
      // 2. computed 中引入变量
      screenCars() {
        return state.screenCars
      }
    },
    methods: {
      // 3. methods 中引入方法
      setTest: mutations.updateScreenCars,
      toSave() {
        // 此处修改的方法会通知store.js里面的数据发生变化
        this.setTest({ a: 1 })
      }
    }
  }
</script>
```
