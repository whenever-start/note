# call apply bind

> [JS 中的 call、apply、bind 方法详解](https://segmentfault.com/a/1190000018270750)

目的: 改变 `this`

作用:

1. 改变 `this`, 使得参数中的对象可以调用其它对象的方法

   ```js
   a.say().call(b)
   ```

2. 传参: `arr => arg1, arg2...`。相当于 `ES6` 的扩展运算符 `...`

   ```js
   Math.max.apply([1, 2, 3])
   // 等同于
   Math.max(...[1, 2, 3])
   ```

## 区别

- `call` 参数是 `(arg1,arg2...)`
- `apply` 参数是 `(arr)`
- `bind` 前两者是立即执行，返回的是一个函数调用。

## 使用

```js
function fruits() {}

fruits.prototype = {
  color: 'red',
  say: function () {
    console.log('My color is ' + this.color)
  }
}

var apple = new fruits()
apple.say() //My color is red
```

但是如果我们有一个对象 `banana= {color : "yellow"}` ,我们不想对它重新定义 `say` 方法，那么我们可以通过 `call` 或 `apply` 用 `apple` 的 `say` 方法：

```js
banana = {
  color: 'yellow'
}
apple.say.call(banana) //My color is yellow
apple.say.apply(banana) //My color is yellow
```

## 实例

- 数组追加

  ```js
  var array1 = [12, 'foo', { name: 'Joe' }, -2458]
  var array2 = ['Doe', 555, 100]
  Array.prototype.push.apply(array1, array2)

  // =>
  array1.push(...array2)
  ```

- 获取数组中的最大值和最小值

  ```js
  var numbers = [5, 458, 120, -215]
  var maxInNumbers = Math.max.apply(Math, numbers) //458
  var maxInNumbers = Math.max.call(Math, 5, 458, 120, -215) //458

  // =>
  Math.max(...numbers)
  Math.min(...numbers)
  ```

## bind

为方法绑定一个 `this`

```js
var altwrite = document.write
altwrite('hello')
```

结果：Uncaught TypeError: Illegal invocation
altwrite()函数改变 this 的指向 global 或 window 对象，导致执行时提示非法调用异常，正确的方案就是使用 bind()方法：

```js
altwrite.bind(document)('hello')
// 或
altwrite.call(document, 'hello')
```
