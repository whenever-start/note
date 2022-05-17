# canvas

> [Web API 从零开始——Canvas](https://zhuanlan.zhihu.com/p/259499093)

[toc]

## 1. 概念

```html
<div>
  <canvas id="canvas" width="300" height="300"></canvas>
</div>
```

```js
const canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d') // webgl 生成3d
```

## 2. 绘制图形 API

### 2.1 路径

- `beginPath()`：开始绘制路径。
- `closePath()`：结束路径，返回到当前路径的起始点。如果图形未闭合，会绘制一条直线。
- `moveTo()`：路径起始点移到(x,y)坐标。
- `lineTo()`：连线到(x,y) 坐标。
- `fill()`：在路径内部填充颜色，默认黑色。
- `stroke()`：路径线条着色（画笔）。
- `fillStyle`：填充颜色和模式。
- `strokeStyle`：线条的颜色和模式。

```js
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.moveTo(100, 100)
ctx.lineTo(200, 200)
ctx.lineTo(100, 200)
```

### 2.2 线型

- `lineWidth`：指定线条的宽度，默认为 1.0
- `lineCap`：指定线条末端的样式，有三个可能的值：butt（默认值，末端为矩形）、round（末端为圆形）、square（末端为突出的矩形，矩形宽度不变，高度为线条宽度的一半）
- `lineJoin`：指定线段交点的样式，有三个可能的值：round（交点为扇形）、bevel（交点为三角形底边）、miter（默认值，交点为菱形)
- `miterLimit`：指定交点菱形的长度，默认为 10。该属性只在 lineJoin 属性的值等于 miter 时有效
- `getLineDash()`：返回一个数组，表示虚线里面线段和间距的长度
- `setLineDash()`：数组，用于指定虚线里面线段和间距的长度

```js
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.moveTo(100, 100)
ctx.lineTo(200, 200)
ctx.lineTo(100, 200)

ctx.lineWidth = 3
ctx.lineCap = 'round'
ctx.lineJoin = 'round'
ctx.setLineDash([15, 5])
ctx.stroke()
```

### 2.3 矩形

- `rect()`：绘制矩形路径
- `fillRect()`：填充一个矩形
- `strokeRect()`：绘制矩形边框
- `clearRect()`：指定矩形区域的像素都变成透明

```js
var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')

ctx.rect(10, 10, 100, 100)
ctx.fill()
```

### 2.4 弧线

- `arc()`：通过指定圆心和半径绘制弧形
- `arcTo()`：通过指定两根切线和半径绘制弧形

```js
// 格式
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)

// 实例
ctx.arc(5, 5, 5, 0, 2 * Math.PI, true)
```

```js
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.moveTo(0, 0)
ctx.arcTo(50, 50, 100, 0, 25)
ctx.lineTo(100, 0)
ctx.stroke()
```

### 2.5 文本

- `fillText()`

  - `text`：所要填充的字符串
  - `x`：文字起点的横坐标，单位像素
  - `y`：文字起点的纵坐标，单位像素
  - `maxWidth`：文本的最大像素宽度，该参数可选，如果省略，则表示宽度没有限制，如果文本实际长度超过这个参数指定的值，那么浏览器将尝试用较小的字体填充

  ```js
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  ctx.fillText('Hello world', 50, 50)
  ```

- `strokeText()`：在指定位置绘制空心字符

  ```js
  // 参数与 fillText() 一致
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  ctx.strokeText('Hello world', 50, 50)
  ```

- `measureText()`：返回一个 `TextMetrics` 对象
- `font`：指定字型大小和字体，默认值为 `10px sans-serif`
- `textAlign`：文本的对齐方式，默认值为 `start`

  - `left`：左对齐
  - `right`：右对齐
  - `center`：居中
  - `start`：默认值，起点对齐（从左到右的文本为左对齐，从右到左的文本为右对齐）
  - `end`：结尾对齐（从左到右的文本为右对齐，从右到左的文本为左对齐）

  ```js
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  ctx.font = 'Bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Hello world', 50, 50)
  ```

- `direction`：文本的方向，默认值为 `inherit`

- `textBaseline`：文本的垂直位置，默认值为 `alphabetic`
  - `top`：上部对齐（字母的基线是整体上移）
  - `hanging`：悬挂对齐（字母的上沿在一根直线上），适用于印度文和藏文
  - `middle`：中部对齐（字母的中线在一根直线上）
  - `alphabetic`：默认值，表示字母位于字母表的正常位置（四线格的第三根线）
  - `ideographic`：下沿对齐（字母的下沿在一根直线上），使用于东亚文字
  - `bottom`：底部对齐（字母的基线下移）；对于英文字母，这个设置与 `ideographic` 没有差异

### 2.6 渐变色和图像填充

- `createLinearGradient()`：定义线性渐变样式
- `createRadialGradient()`：定义辐射渐变样式
- `createPattern()`：定义图像填充样式

```js
// x0 x1 => 起点 终点
ctx.createLinearGradient(x0, y0, x1, y1)

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

let gradient = ctx.createLinearGradient(0, 0, 200, 0)
gradient.addColorStop(0, 'green')
gradient.addColorStop(1, 'white')
ctx.fillStyle = gradient
ctx.fillRect(10, 10, 200, 100)
```

```js
// 起点 终点 半径
ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

let gradient = ctx.createRadialGradient(100, 100, 50, 100, 100, 100)
gradient.addColorStop(0, 'white')
gradient.addColorStop(1, 'green')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, 200, 200)
```

```js
ctx.createPattern(image, repetition)

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = './search.png'
img.onload = function () {
  const pattern = ctx.createPattern(img, 'repeat')
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, 400, 400)
}
```

### 2.7 阴影

- `shadowBlur`：阴影的模糊程度，默认为 0
- `shadowColor`：阴影的颜色，默认为 `black`
- `shadowOffsetX`：阴影的水平位移，默认为 0
- `shadowOffsetY`：阴影的垂直位移，默认为 0

```js
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 5
ctx.shadowColor = 'rgba(0,0,0,0.5)'

ctx.fillStyle = 'green'
ctx.fillRect(10, 10, 100, 100)
```

## 3. Canvas API：图像处理

## 4. `<canvas>` 元素的方法

## 5 Canvas 使用实例
