# float 和 inline-block

1. `float` 需要清除浮动
2. `inline-block` 之间有间距
3. `inline-block` 可以通过父元素设置 `white-space: nowrap;` 达到不换行且宽度自适应

清除 `inline-block` 之间的间距

1. 父元素 `font-size: 0;` 再给子元素设置字体大小
2. 用 `float` 或 `flex`
3. 父元素 `letter-spacing: -0.5em;` 子元素 `letter-spacing: 0;` 或者用 `word-spacing`
