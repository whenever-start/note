# vuex 总结

## map

**modules 文件:**

```js
// store/modules/business.js
const state = {}
// ...
export default {
    namespaced: true,
    state,
    // ...
}
```

**store 引入:**

```js
// store/.index
import business from './modules/business'
const store = new Vuex({
    state,
    // ...
    modules: {
        business
    }
})
export default store
```

**组件使用:**

```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            a: state => state.business.a
        }),
        ...mapGetters('business', {
            'foo'
        })
    },
    methods: {
        ...mapMutations: ('business', {
            'fn1'
        }),
        ...mapActions: ('business', {
            'asyncFn1'
        })
    }
}
```

## 参数

**getters:**

```js
// 基础用法
const getters = {
    newNum(state) {
        return state.num + 1
    }
}

// rootState

```

**mutations:**

```js
// 基础用法
// 必须是同步函数
// $store 用法: this.$store.commit('business/handle', payload)
const mutations = {
    handle(state, payload) { // payload 一般为对象
        state.num = payload
    }
}
```

**actions:**

```js
// 基础用法
// $store用法: this.$store.dispatch('/business/asyncHandle', payload)
const actions = {
    async asyncHandle({ state, getters, commit, dispatch }, payload) {
        await value1 = axios.get().then(res => res.value1)
        await value2 = axios.get().then(res => res.value2)
        commit('handle', value1)
        dispatch('asyncHandle1', value2)
    }
}
```

**不同模块间的引用:**

> [不同模块间的引用](https://www.mmxiaowu.com/article/591a74f60ef91a5c93a340c4)

**state:**

```js
const getters = {
    lists(state, getters, rootState) {
        return rootState.list
    }
}

const actions = {
    async shop(store, config = {}) {
        const { rootState } = store
        console.log(rootState.stateName)
    }
}
```

**getters:**

```js
const actions = {
    async shop(store, config = {}) {
        const { rootGetters } = store
        // 引用
        console.log(rootGetters['模块名/getterName'])
    }
}
```

**mutations:**

```js
const actions = {
    async shop(store, config = {}) {
        const { commit } = store
        // 引用 root: 是否根store
        commit('模块名/方法名', data, {root: true})
        // 模块内
        commit('模块名/方法名', data)
    }
}
```

**actions:**

```js
const actions = {
    async shop(store, config = {}) {
        const { dispatch } = store
        // 引用 root: 是否根store
        dispatch('模块名/方法名', data, {root: true})
        // 模块内
        dispatch('模块名/方法名', data)
    }
}
```
