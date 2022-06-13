# css3 动画

## animate.css

[Animate.css 动画演示](https://www.dowebok.com/demo/2014/98/)

[vue 中按需使用 animate.css 以及使用方法](https://www.jianshu.com/p/0dfc6c5e680e)

使用

```html
<div class="animated bounce" id="dowebok"></div>
```

按需引入

安装以后打开 `node_modules` 文件夹下的 `animate.css` 文件夹下的`animate-config.json`，把不需要的设为 `false` 即可

```json
"attention_seekers": {
  "bounce": false,
  "flash": false,
  "pulse": false,
  "rubberBand": false,
  "shake": false,
  "headShake": false,
  "swing": false,
  "tada": false,
  "wobble": false,
  "jello": false,
  "heartBeat": false
}
```

设置延迟、设置速度

```html
<!-- 延迟选项：1-5s -->
<div class="animated bounce delay-2s">Example</div>

<!-- 速度选项：slow slower fast faster -->
<div class="animated bounce slow">Example</div>
```
