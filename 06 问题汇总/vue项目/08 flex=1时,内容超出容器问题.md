# flex=1 问题

**场景1:**

 垂直方向, 作 `header`, `main`, `footer` 布局时

 ```less
 header, footer {
   flex: none;
 }
 main {
   flex: 1;
 }
 ```

 但是, 当 `main` 中的内容高度超过 `main` 容器时, `main` 的高度也随着扩张, 因此 `footer` 将不再 `固定于底部`, 破坏布局

 **解决:**

 ```less
main {
  // 将 flex-basis 设置为0
  flex: 1 0 0;
  overflow: auto;
  // 或
  overflow: hidden;
}
 ```

**场景2:**

水平方向, 作 `avatar`, `title`, `button` 布局时, 特别是 `title` 单行溢出显示 `...` 时.

```less
avatar, button {
  flex: none;
}
title {
  flex: 1 0 0;
}
```
