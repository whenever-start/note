# jsonp 原理

jsonp: 解决跨域问题. 简单, 但只能 `get` 请求

原理: 利用 `script` 标签发起请求不受同源策略的限制

1. 服务器发送一个函数调用(字符串)并把数据作为参数
2. js 脚本用相同的函数名来接收数据

```js
// 服务器
app.get('/jsonp-server', (request, response) => {
  const data = {
    name: 'jsonp'
  }
  let str = JSON.stringify(data)
  // 发送的字符串是要到 script 标签执行的
  // 因此像 hello 这种 js 并不能识别, 会报错
  // 必须是可执行代码 比如 console.log('hello')
  response.end(`callback(${str})`)
})

// 客户端 用同名函数来接收数据
function callback(data) {
  console.log(data)
}
```
