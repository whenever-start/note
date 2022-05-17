# v-model

只能用于表单类(输入类)元素,有 `value` 属性

作用: 实现双向绑定

```html
<input v-model="text" />

<script>
  // ...
  data: {
    text: '123'
  }
  // ...
</script>
```
