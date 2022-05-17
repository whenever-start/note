# express

```shell
# 需要 nodejs
npm i express
```

```js
// 1. 引入
const express = require('express')

// 2. 创建应用对象
const app = express()

3. 创建路由规则
app.get('/',(request, response) => {
  response.send('hello')
})

4. 监听端口启动服务
app.listen(8000, ()=>{
  console.log('服务器已经启动')
})
```

## nodemon 包

```shell
npm i -g nodemon

# 使用
nodemon xxx.js
```
