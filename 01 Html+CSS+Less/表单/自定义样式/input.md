# input

```html
<!-- aria-hidden="true" : 把该元素和它的所有子元素从可访问性树上移除 -->
<!-- https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute -->
<input
  type="radio"
  aria-hidden="true"
  tabindex="-1"
  autocomplete="off"
  class="el-radio__original"
  value="1"
/>
```

```css
.el-radio__original {
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}
```

```html
<span class="el-radio__input is-checked">
  <span class="el-radio__inner"></span>

  <input
    type="radio"
    aria-hidden="true"
    tabindex="-1"
    autocomplete="off"
    class="el-radio__original"
    value="1"
  />
</span>
```

```css
.el-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #409eff;
  background: #409eff;
}

.el-radio__inner {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}

.el-radio__input.is-checked .el-radio__inner:after {
  transform: translate(-50%, -50%) scale(1);
}

.el-radio__inner:after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s ease-in;
}
```
