# cors

`jsonp` 和 `cors` 都是解决跨域问题。前者相对简单，只作用域 `get` 请求，而后者是官方解决方案，功能更为强大。

`cors`: `cross-origin-resource-sharing`, 跨域资源共享

简单请求和非简单请求

简单请求:

- 请求方法: `HEAD` `GET` `POST` 中的一种
- 头信息不能超过: Accept Accept-Language `Content-Language` `Last-Event-ID` `Content-Type`(`application/x-www-form-urlencoded` `multipart/form-data` `text/plain`)

原因: 表单请求可以跨域，简单请求就是表单请求。

## 设置

- `Access-Control-Request-Method`: `http` 方法
- `Access-Control-Request-Headers`: 允许自定义的头部信息(预定义头信息, 就是已经定义好的, 比如现在的 `Access-Control...`)
- `Access-Control-Allow-Credentials`: 默认浏览器是不发送 `cookie` 的, 设置为 `true`, 且在发送 `ajax` 请求的时候也设置 `xhr.withCredentials = true`, 则可以发送 `cookie`
- `Access-Control-Max-Age`: 缓存预检请求的时间, 在此时间内不用发出另一条预检请求

**预检请求**: 非简单请求就是对服务器提出特殊要求. 在发送正式通信前, 会增加一次 `http` 查询请求, 询问当前域名是否在允许之中, 以及允许那些方法和头信息字段(`Origin` `Method` `Headers`). 只有得到肯定回复才会发送 `ajax` 请求, 否则报错.
