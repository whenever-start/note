# DOM 事件、属性、方法

> [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp)

> [事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)

[toc]

## 常用事件

### 表单事件

- `blur`: 失去焦点时, 不支持冒泡
- `focusout`: 同上, 支持冒泡
- `change`: `input` `select` `textarea` 的 `value` 值改变
- `focus`: (可聚焦的)元素获得焦点时, 不支持冒泡
- `fucusin`: 同上, 支持冒泡
- `input`: 输入时
- `search`: `<input type="search" />` 写入时

### 媒体事件

- `canplay`: 媒体加载了足够数据, 可以开始播放(不需加载全部)
- `canplaythrough`: 可以正常播放且无需停顿和缓冲.
- `pause`: 暂停时
- `play`: 播放时
- `playing`: 暂停/因缓冲而停止后, 准备就绪(可以播放)时
- `seeking`: 调整进度中
- `seeked`: 调整进度后
- `ended`: 媒体播放到最后(结束)
- `stalled`: 获取媒体数据失败

### 鼠标事件

- `click`: 点击
- `mousedown`: 按下鼠标
- `mouseup`: 释放(弹起)鼠标
- `mouseenter`鼠标移动到元素上
- `mouseleave`: 鼠标从元素上移开
- `mousemove`: 鼠标在元素上移动(hover 时)
- `mouseover`: 鼠标移动到元素上或其任一子元素上
- `mouseout`: 鼠标从元素或其任一子元素上移开
- `wheel`: 鼠标滚轮在元素上向上或向下滚动时

### 文档(复制粘贴等)事件

- `copy`: 复制
- `cut`: 剪切
- `paste`: 粘贴
- `select`: 选择文本

### 拖拽事件

- `drag`: 当元素被拖动时
- `drop`: 释放被拖动的元素时

`dragenter` `dragleave` `dragover` `dragend` `dragstart` `dragend`[详情](https://www.w3schools.com/jsref/dom_obj_event.asp#:~:text=MouseEvent-,drag,drop,-The%20event%20occurs)

### 移动端事件

- `touchcancel`: 触碰被中断时
- `touchend`: 当手指从屏幕上移开时
- `touchmove`: 当手指在屏幕上拖动时
- `touchstart`: 当手指放在触屏上时

### 加载事件

- `error`: 加载外部文件时发生错误
- `load`: 当对象加载时放生

### 键盘事件

- `keydown`: 按下按键
- `keyup`: 弹起按键

### 窗口事件

- `resize`: 窗口大小调整

### 滚动事件

- `scroll`: 滚动

## 常用属性 / 方法

### 鼠标+按键

- `altKey`: 出发鼠标事件或键盘事件时, `alt` 键是否被按下
- `ctrlKey`: `ctrl` 键是否被按下
- `shiftKey`: `shift` 键是否被按下
- `metaKey`: 返回触发事件时是否按下了 `meta`( `mac` 键或 `win` 键) 键
- `which`: 返回 `鼠标事件` 或 `按键事件` 时按下的哪个按键.

### 鼠标

- `clientX /Y`: 鼠标事件触发时, 返回相对于当前窗口的 `x` / `y` 坐标
- `offsetX /Y`: 返回鼠标指针相对于目标元素边缘位置的 `x` 坐标
- `movementX /Y`: 返回鼠标指针相对于上次 `mousemove` 事件位置的 `x` 坐标
- `pageX /Y`当鼠标事件被触发时，返回鼠标相对于文档的 `x` 坐标
- `screenX /Y`: 返回相对于屏幕的 `x` 坐标
- `deltaX /Y /Z`: 返回 `x` 轴滚动量
- `deltaMode`: 返回一个数字(增量值)
- `detail`: 鼠标点击次数

### 按键

- `keyCode`: 返回 `keydown` `keyup` 事件的键码

### 元素

- `currentTarget`: 返回当前触发事件的元素

### 表单

- `inputType`: 返回更改的类型（即“插入”或“删除”）

### touch 事件

- `touches`: 返回一个 `touch` 事件列表

### 其它

- `newURL`: 更改 `hash` 后返回的 `url`
- `oldURL`: `hash` 更改前的 `url`

- `stopPropagation()`: 阻止事件流期间事件的进一步传播(阻止冒泡)

- `target`: 返回触发事件的元素
- `timeStamp`: 返回创建事件时的时间戳
- `type`: 返回事件的名称
