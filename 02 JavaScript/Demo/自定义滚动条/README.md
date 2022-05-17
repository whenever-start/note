# 自定义滚动条

[参考来源: 实现一个自定义滚动条](https://juejin.cn/post/6844903569288593421)
[自定义滚动条的实现思路与关键算法](https://juejin.cn/post/6844903847282868238)

功能说明： 本案例属于 “半自定义滚动条”。自定义了滚动条样式，但是 `scroll` 行为是原生的。

## 使用

1. `html` 结构

   ```html
   <div class="section-scroll">
     <div class="scroll-container">
       <div class="content">...</div>
     </div>
   </div>
   ```

1. 添加 `css` 样式

   ```css
   /* 根据喜好修改样式 */
   .scrollbar {
     position: absolute;
     right: 0;
     top: 0;
     bottom: 0;
     width: 6px;
     border-radius: 6px;
   }
   .slider {
     position: absolute;
     top: 0;
     width: 100%;
     border-radius: 6px;
     background-color: #ccc;
     user-select: none;
     opacity: 0;
     transition: background-color 0.3s, opacity 0.3s;
   }

   /* 选择滚动条时的样式 */
   .slider--selected,
   .slider:hover {
     background-color: #b2b2b2;
   }

   /* hover 容器时的样式 */
   .scroll-container:hover .slider {
     opacity: 1;
   }
   ```

1. `js` 引用

   ```js
   const scrollElt = document.querySelector('.section-scroll')
   customizeScrollbar(scrollElt)
   ```

1. `utils`

   ```js
   css()
   numInRange()
   ```

## 待完成

- `options` 选项
- 返回顶部
- 加载更多 -> 更新 `slider` 高度

## 其它

`scrollTo()` 方法兼容性问题

```js
// https://juejin.cn/post/6844904090741260302
if (!window.scrollTo) {
  window.scrollTo = function (option) {
    window.scrollLeft = option.left
    window.scrollTop = option.top
  }
}

if (!document.body.scrollTo) {
  Element.prototype.scrollTo = function (option) {
    this.scrollLeft = option.left
    this.scrollTop = option.top
  }
}
```

```js
// https://juejin.cn/post/7041845658730364941
if ('scrollBehavior' in d.documentElement.style) {
  return
}

const Element = window.HTMLElement || window.Element

Element.prototype.scrollTo = function () {
  let left = 0
  let top = 0
  if (arguments.length > 1) {
    left = arguments[0]
    top = arguments[1]
  } else {
    left = arguments[0].left
    top = arguments[0].top
  }
  this.scrollLeft = left
  this.scrollTop = top
}
```
