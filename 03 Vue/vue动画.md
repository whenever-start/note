# vue 动画

定义动画

```css
@keyframes name {
  from {
    transform: transLateX(-100px);
  }
  to {
    transform: transLateX(0);
  }
}
v-enter-active {
  animation: name 1s;
}
v-leave-active {
  animation: name 1s reverse;
}
```

`vue` 引用

```html
<transition>
  <h1>hello</h1>
</transition>
```

`transition` 可以命名

```html
<transition name="xxx"></transition>
```

对应的 `css` 更改

```css
xxx-enter-active {
  /* ...; */
}
xxx-leave-active {
  /* ...; */
}
```
