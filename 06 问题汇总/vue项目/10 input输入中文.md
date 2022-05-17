# input 输入中文问题

**问题描述:**

`input` 输入中文时, 输入法还未选中文字, 即此时输入框还未有文字, 但仍会触发事件

**解决:**

```html
<input
  @input="onInput"
  @compositionstart="onComposition"
  @compositionend="onComposition"
  @compositionupdate="onComposition"
/>
```

```js
data() {
  return {
    isOnComposition: false
  }
}
methods: {
  onComposition(e) {
      if (e.type === 'compositionstart') {
        this.isOnComposition = true
      } else if (e.type === 'compositionend') {
        this.isOnComposition = false
        this.onInput(e)
      }
    },
    onInput(e) {
      if (this.isOnComposition) return
      let value = e.target.value
      this.$emit('input', value.trim())
    },
}
```
