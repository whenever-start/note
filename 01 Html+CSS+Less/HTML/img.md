`img`

```html
<!-- 空 img，没有 src 属性不会发送 http 请求 -->
<img />

<!-- 一般用法 -->
<img src="src" alt="不显示时的文字说明" title="hover时的文字说明" />

<!-- 最好指明 width 和 height，浏览器渲染的时候留出足够空间 -->
<img src="src" alt="xxx" width="200" height="200" />

<!-- 用 div 包裹 -->
<div class="picture">
  <img src="src" alt="xxx" width="200" height="200" />
</div>
```

```less
.picture {
  width: 200px;
  height: 200px;

  & > img {
    width 100%;
    height: 100%;
  }
}
```
