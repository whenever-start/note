# 移动端 touch 事件

## 重要对象

`target`: `touchstart` 触发时的 `dom` 元素
`touches`, `targetTouches`: `touch` 对象
`touch`:

    - clientX, clientY: 点击位置距离当前body可视区域的x，y坐标
    - pageX、pageY: 对于整个页面来说，包括了被卷去的 body 部分的长度(包含滚动部分)
    - screenX、screenY: 点击位置距离当前电脑屏幕的x，y坐标
