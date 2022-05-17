const { response } = require('express')
const express = require('express')

const app = express()

app.all('/article', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  const data = {
    name: 'get 请求'
  }
  response.send(JSON.stringify(data))
})

app.all('/axios-server', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')

  const data = { name: 'abc' }
  response.send(JSON.stringify(data))
})

app.get('/jsonp-server', (request, response) => {
  const data = {
    name: 'jsonp'
  }
  let str = JSON.stringify(data)
  response.end(`callback(${str})`)
})

app.listen(8000, () => console.log('服务器启动, 端口8000'))
