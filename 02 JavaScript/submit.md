# 表单提交 submit

```html
<form action="" id="form">
  <button id="btn" type="submit">提交</button>
</form>
```

```js
const btn = document.querySelector('#btn')
const form = document.querySelector('#form')

function fn() {
  return false
}
form.addEventListener('submit', fn)
```

## 表单提交的返回值

只能是 `onsubmit="return fn()`, 不能是 `onsubmit="fn()`

```html
<form action="" id="form" onsubmit="return fn()">
  <button id="btn" type="submit">提交</button>
</form>
```

因为 `onsubmit="fn()` 相当于下面代码

```js
form.onsubmit = function () {
  fn()
}
```

`onsubmit="return fn()` 相当于

```js
form.onsubmit = function () {
  return fn()
}
```
