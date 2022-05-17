# BFC 块级元素上下文(Block Formatting Context)

> [知乎: 10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)

## 三种常见布局方案

- 普通流(文档流)
- 浮动(`float`)
- 定位(`position`)

## BFC

`BFC` 即 `Block Formatting Contexts` (块级格式化上下文)，它属于上述定位方案的普通流。

具有 `BFC` 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 `BFC` 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 `BFC` 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

### 触发 BFC

- 根元素（`<html>`）
- 浮动元素（元素的 `float` 不是 `none）`
- 绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed）`
- 行内块元素（元素的 `display` 为 `inline-block`）
  表格单元格（元素的 `display` 为 `table-cell`，HTML 表格单元格默认- 为该值）
  表格标题（元素的 `display` 为 `table-caption`，HTML 表格标题默认- 为该值）
- `overflow`
- `flex`

[等等](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

### BFC 的特性及应用

- 折叠外边距: 同一个 `BFC` 下外边距会发生折叠
- 清除浮动: `BFC` 可以包含浮动的元素（清除浮动）
- 文字环绕: `BFC` 可以阻止元素被浮动元素覆盖

## 其它格式化上下文

- `IFC 内联格式化上下文`
- `FFC 弹性格式化上下文`
