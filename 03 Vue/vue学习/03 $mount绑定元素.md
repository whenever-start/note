# $mount

用 `el`

```js
new Vue({
  el: '#app',
  data: {
    // ...
  }
})
```

用 `$mount`

```js
const vm = new Vue({
  data: {//...}
})
vm.$mount('#app')
// 或
new Vue({
  // ...
}).$mount('#app')
```
