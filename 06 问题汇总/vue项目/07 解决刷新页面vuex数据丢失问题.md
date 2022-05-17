# 解决刷新页面时vuex数据丢失的问题

> [vue单页面应用刷新网页后vuex的state数据丢失的解决方案](https://blog.csdn.net/guzhao593/article/details/81435342)

```js
// App.vue
export default {
  name: 'App',
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
```
