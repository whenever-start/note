# `AJAX`

作为浏览器与服务器的通信(`http` 请求)

优点:

- 获取不用刷新页面
- 可以用事件来实现用户交流

缺点:

- 没有会退功能
- 存在跨域问题
- 不利 `SEO`

## `HTTP`

`HTTP`: `Hyper Text Transport Protocol`, 超文本传输协议, 协议规定了 **浏览器与万维网服务器** 之间通信的规则

**_重点是格式与数据_**

请求报文

```text
行  POST / https://www.baidu.coms?wd=js HTTP/1.1    (method / url / HTTP版本)
头  :authority: www.xxx.com
    :method: GET
    accept: text/html
    accept-encoding: gzip
    ...
空行
体  get 请求为空, post请求可以发送数据
```

响应报文

```text
行  HTTP/1.1 200 OK
头  content-type: text/html; charset=utf-8
    content-encoding: gzip
    date: Sat, 30 Apr 2022 15:02:05 GMT
    ...
空
体  <html>
      ...
体  </html>
```

## ajax 请求

```js
const xhr = new XHRHttpRequest()
xhr.open('GET', 'http://127.0.0.1:8000/article', true)
xhr.send()
xhr.onreadyStateChange = function () {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response)
    }
  }
}
xhr.onerror = function (event) {
  // Event 事件
  console.log(event)
  console.log(xhr.statusText)
}
```

请求参数

```js
// GET: 加在 ? 后边
xhr.open('GET', 'http://.../article?wd=100')

// POST
// 理论上可以任意格式, 常用的是 & 字符串拼接和 json 格式
xhr.send('a=100&b=100')
xhr.send({...})
```

设置请求头信息

```js
// 在 xhr.send() 之前设置
// application... 是固定写法
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
```

响应 json 数据

```js
// 服务器发送数据
app.get('/xxx', (request, response) => {
  const data = {
    name: 'xxx'
  }
  response.send(JSON.stringify(data))
})

// 手动转换
xhr.onreadyStateChange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let data = JSON.parse(xhr.response)
    console.log(data)
  }
}

// 自动转换
const xhr = new XMLHttpRequest()
xhr.open(...)
xhr.responseType = 'json'

xhr.onreadyStateChange = function(){
    if(...){
        // 自动转换, 无需 JSON.parse 处理
        console.log(xhr.response)
    }
}

// responseType:
//  text
//  json
//  document
//  buffer: arrayBuffer blob
```

IE 缓存问题

ie 浏览器会对 ajax 的返回进行缓存, 所以对于一些时效性的请求会有问题

```js
// 实际开发中工具会解决
xhr.open('GET', 'http://xxx.com/xxx?t=' + Date.now())
```

请求超时与网络异常

```js
// 设置超时时间 ms
xhr.timeout = 2000

// 监听函数
xhr.ontimeout = function () {
  // ...
}

// 请求失败
xhr.onerror = function () {
  // ...
}
```

取消请求

```js
// send() 发出但结果还没返回前取消
// 调用后 readyState = 4, status = 0
xhr.abort()
```

重复请求

```js
let isSending = false
let xhr

function ajax() {
  if (isSending) {
    xhr.abort()
  }

  xhr = new XHRHttpRequest()
  // ...
  xhr.onreadyStateChange = function () {
    if (xhr.readyState === 4) {
      isSending = false
      // ...
    }
  }
}
```
