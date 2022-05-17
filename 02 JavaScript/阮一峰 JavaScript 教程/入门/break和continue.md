# break 和 continue

[break 语句和 continue 语句](https://www.bookstack.cn/read/javascript-tutorial/docs-basic-grammar.md#fwy44o)

break 语句用于跳出代码块或循环。

```js
// i = 10 直接跳出循环
var i = 0
while (i < 100) {
  console.log('i 当前为：' + i)
  i++
  if (i === 10) break
}
```

continue 语句用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环。

```js
// 只是跳过偶数, 并不会直接跳出全部循环
var i = 0
while (i < 100) {
  i++
  if (i % 2 === 0) continue
  console.log('i 当前为：' + i)
}
```
