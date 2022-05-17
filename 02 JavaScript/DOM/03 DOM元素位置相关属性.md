# DOM 元素距离

[toc]

## 事件

### scroll

原生 js 事件名: `onscroll`
`vue` 事件名: `scroll`

```html
<div @scroll="handleScroll"></div>
```

```js
handleScroll(e){
  console.log(e.target)
}
```

### scrollTo

```js
element.scrollTo(x, y)

element.scrollTo({
  top: x,
  left: y,
  behavior: auto | smooth | instant // 平滑 | 瞬间
})
```

## 属性`e.target` 中有用的属性

### height

- `clientHeight`：**_元素高度（不包括边框）。_** 包括 `padding` 但不包括 `border` 、水平滚动条、 `margin` 的元素的高度。对于 `inline` 的元素这个属性一直是 0，单位 `px` ，只读元素。

- `offsetHeight`：**_元素高度（包括边框）。_** 包括`padding`、`border`、水平滚动条，但不包括`margin`的元素的高度。对于`inline`的元素这个属性一直是 0，单位`px`，只读元素。

- `scrollHeight`: **_滚动元素整体高度（包括被隐藏部分）。_** 因为子元素比父元素高，父元素不想被子元素撑的一样高就显示出了滚动条，在滚动的过程中本元素有部分被隐藏了，`scrollHeight`代表包括当前不可见部分的元素的整体高度。而可见部分的高度其实就是`clientHeight`，也就是`scrollHeight>=clientHeight`恒成立。在有滚动条时讨论`scrollHeight`才有意义，在没有滚动条时`scrollHeight==clientHeight`恒成立。单位`px`，只读元素。

### top

- `clientTop`: **_边框宽度_**

- `offsetTop`:**_与父元素的距离。_** 当前元素顶部距离最近父元素(position:relative)顶部的距离,和有没有滚动条没有关系。单位 px，只读元素。

- `scrollTop`:**_滚动距离。_** 代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度。在没有滚动条时 scrollTop==0 恒成立。单位 px，可读可设置。

![1244738654-5efb56bbe7405_fix732.png](http://tva1.sinaimg.cn/mw690/006EgRKPgy1gx5tr32j6cj306o04ngma.jpg)

如上图, `clientHeight = 220`. `offsetHeight = 240`. `clientTop = 10`

## 设备(视口)相关

**`Element.getBoundingClientRect()`** 方法返回元素的大小及其相对于视口的位置。

```text
{
  width: 元素自身宽度,
  height: 元素自身高度,
  top: 元素顶部到视口顶部的距离,
  bottom: 元素底部到视口顶部距离,
  left: 元素左边到视口左边的距离,
  right: 元素右边到视口左边的距离,
  x: = left,
  y: = top
}
```

**设备(视口)宽高**:
[JS 获取屏幕、浏览器、页面的高度宽度](https://segmentfault.com/a/1190000010443608)

- `screen.height`：屏幕高度。

- `screen.availHeight`：屏幕可用高度。即屏幕高度减去上下任务栏后的高度，可表示为软件最大化时的高度。

- `window.outerHeight`：浏览器高度。

- `window.innerHeight`：浏览器内页面可用高度；此高度包含了水平滚动条的高度(若存在)。可表示为浏览器当前高度去除浏览器边框、工具条后的高度。

- `body.offsetHeight`：body 总高度。

- `body.clientHeight`：body 展示的高度；表示 body 在浏览器内显示的区域高度。

- `滚动条高度/宽度`：如高度，可通过浏览器内页面可用 `高度 - body 展示高度` 得出，即 `window.innerHeight - body.clientHeight`

[隐藏滚动条](https://www.jianshu.com/p/01a85bf1e113)

```css
.box {
  /*解决ios上滑动不流畅*/
  -webkit-overflow-scrolling: touch;
  /*纵向超出部分将会隐藏，即滚动条部分被挤出可视区域*/
  padding-bottom: 20px;
}
.box::-webkit-scrollbar {
  display: none;
}
```

## document

> [JavaScript HTML DOM Document](https://www.w3schools.com/js/js_htmldom_document.asp)

- `document.baseURI`: 返回基础路径
- `document.URL`: 返回完整路径
- `document.body`: `body` 标签
- `document.cookie`: `cookie`
- `document.doctype`: `doctype`, 如 `<!DOCTYPE html>`
- `document.documentElement`: `HTML` 标签
- `document.domain`: 域名
- `document.images`: 图片集合
- `document.lastModified`: 文档最后修改时间
- `document.links`: 链接集合
- `document.anchors`: 锚点集合
- `document.title`: 文档标题
