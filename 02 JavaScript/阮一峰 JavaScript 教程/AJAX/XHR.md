# `XMLHttpRequest` 对象

构造函数

```js
var xhr = new XMLHttpRequest()

// 参数: method url 异步
xhr.open('GET', 'http://www.example.com/page.php', true)

// 指定回调函数监听 readyState 的变化
xhr.onreadystatechange = handleStateChange
function handleStateChange() {
  // ...
}

// 发送请求, null 表示不带数据体
xhr.send(null)
```

**注意**，`AJAX` 只能向同源网址（协议、域名、端口都相同）发出 `HTTP` 请求，如果发出跨域请求，就会报错

```js
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
  // 通信成功时，状态值为4
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText)
    } else {
      console.error(xhr.statusText)
    }
  }
}
xhr.onerror = function (e) {
  console.error(xhr.statusText)
}
xhr.open('GET', '/endpoint', true)
xhr.send(null)
```
