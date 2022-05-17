# HTMLCollection 和 NodeList 的区别

[HTMLCollection 和 NodeList 的区别](https://juejin.cn/post/6977000721938022407)

[Object.keys/values/entries](https://www.jianshu.com/p/43445c4118de)

`document.querySelector` 获取的是 `NodeList` (快照)
`document.getElementsByTagName` 获取的是 `HTMLCollection`(动态属性)

共同方法: `NodeList.item(index)` `HTMLCollection.item(index)`

`NodeList` 可以用 `forEach` `keys()` `values()` `entries()`
