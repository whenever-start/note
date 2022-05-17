# Proxy

## 什么是 proxy

`proxy` 是拦截、代理。

```js
const proxy = new Proxy(target, handler)
```

其中

`proxy`: 返回值, 是 `Proxy` 的实例对象
`target`: 目标对象, 可以是包括函数在内的任何值
`handler`: 触发拦截(代理)时的回调函数

## 主要方法

- `set`: 当对 `target` 设置值时触发
- `get`: 当对 `target` 读取值时触发
- `apply`: 当 `target` 被调用(包括 `apply` 和 `call`)时触发, `target` 必须为函数
- `has`: 当用 `key in obj` 来判断时触发, `hanOwnProperty` 则不会
- `constructor`: 当调用构造函数时触发 `new proxy()`, `target` 必须是函数

## 参数

```js
set(target, key, value, receiver)
get(garget, key, receiver)
apply(target, ctx, args)
has(target, key)
constructor(target, args, newTarget)
```
