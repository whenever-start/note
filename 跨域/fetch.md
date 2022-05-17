# fetch

> [fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

```js
// fetch 是全局变量 可以直接使用
fetch(
  'https://www.fastmock.site/mock/71e50ae5cecca522d953d8f5992ac055/img/img/slider'
)
  .then((res) => {
    // 需要先用 json 解析
    // 其它方法: text 等
    return res.json()
  })
  .then((res) => {
    console.log(res.data)
  })
```
