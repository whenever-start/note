# zepto

> [中文版](https://www.zeptojs.com.cn/#) > [英文版](https://zeptojs.com/#) > [github](https://github.com/madrobby/zepto/tree/main/src)

## 安装

[开发版](https://zeptojs.com/zepto.js)
[生产版](https://zeptojs.com/zepto.min.js)

```shell
npm install zepto -S
```

## core

### $()

```js
$('#div') // document.querySelector('#div')

$('<p>abc</p>') // 创建 p 元素

$('<p />', { text: 'hello', id: 'text', css: { color: '#000' } })
// <p id="text" style="color: #000">hello</p>
```

### camelCase

```js
$.camelCase('hello-world') // helloWorld
```

### contains

```js
const parent = $('#parent')
const child = $('#child')
$.contains(parent, child) // true
```
