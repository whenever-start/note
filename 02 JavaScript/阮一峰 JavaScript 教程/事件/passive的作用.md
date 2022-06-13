# passive

[addEventListener 中设置 passive 的作用](https://juejin.cn/post/6976954795051450375)

1. 浏览器渲染页面时有两个线程：主线程（js）、绘制线程（绘制）。
2. 因为事件中可能会调用 `event.preventDefault()`，所以绘制线程要等待主线程，造成卡顿。
3. 手动添加 `passive` 可以告诉浏览器不会调用 `event.preventDefault`，不需要等待。

```js
document.addEventListener('scroll', handle, { passive: true })
```

设置了 `passive:true` 之后，再调用 `event.preventDefault()` 会被忽略并返回一个警告。
