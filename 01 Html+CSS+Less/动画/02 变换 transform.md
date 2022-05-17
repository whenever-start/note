# 变换 transform

> [查询](http://css.doyoe.com/)

**translate:**

单位: `<length>: px rem vw ... | <百分比>`

- `translate(x,y)`: 指定对象的 2D translation（2D 平移）。第一个参数对应 X 轴，第二个参数对应 Y 轴。如果第二个参数未提供，则默认值为 0
- `translateX(x)`: 指定对象 X 轴（水平方向）的平移
- `translateY(y)`: 指定对象 Y 轴（垂直方向）的平移
- `translateZ(z)`: 指定对象 Z 轴的平移
- `translate3d(x,y,z)`: 指定对象的 3D 位移。第 1 个参数对应 X 轴，第 2 个参数对应 Y 轴，第 3 个参数对应 Z 轴，参数不允许省略

**rotate:**

单位: `<angle>: deg | grad(梯度) | rad(弧度) | turn(圈)`

- `rotate()`: 指定对象的 2D rotation（2D 旋转），需先有 <' transform-origin '> 属性的定义
- `rotateX()`: 指定对象在 x 轴上的旋转角度
- `rotateY()`: 指定对象在 y 轴上的旋转角度
- `rotateZ()`: 指定对象在 z 轴上的旋转角度
- `rotate3d()`: 指定对象的 3D 旋转角度，其中前 3 个参数分别表示旋转的方向 x,y,z，第 4 个参数表示旋转的角度，参数不允许省略

**scale:**

单位: `<number>`

- `scale()`: 指定对象的 2D scale（2D 缩放）。第一个参数对应 X 轴，第二个参数对应 Y 轴。如果第二个参数未提供，则默认取第一个参数的值
- `scaleX()`: 指定对象 X 轴的（水平方向）缩放
- `scaleY()`: 指定对象 Y 轴的（垂直方向）缩放
- `scaleZ()`: 指定对象的 z 轴缩放
- `scale3d()`: 指定对象的 3D 缩放。第 1 个参数对应 X 轴，第 2 个参数对应 Y 轴，第 3 个参数对应 Z 轴，参数不允许省略

**skew:**

单位: `<angle>`

- `skew()`: 指定对象 skew transformation（斜切扭曲）。第一个参数对应 X 轴，第二个参数对应 Y 轴。如果第二个参数未提供，则默认值为 0
- `skewX()`: 指定对象 X 轴的（水平方向）扭曲
- `skewY()`: 指定对象 Y 轴的（垂直方向）扭曲
  3D Transform Functions：

**matrix:**

单位: `<number>`

- `matrix()`: 以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个 2D 变换，相当于直接应用一个[a,b,c,d,e,f]变换矩阵
- `matrix3d()`: 以一个 4x4 矩阵的形式指定一个 3D 变换

**perspective:**

单位: `<length>`

- `perspective()`: 指定透视距离

## 3d 动画

```css
.wrap {
  /* 开启 3d效果, 默认2d */
  transform-style: preserve-3d;
}
```

`transform` 中的 顺序很重要, 比如

```css
.face {
  transform: rotateX(90deg) translateZ(100px);
}
```

是将 `face` 沿 x 轴翻转 `90度`, 再将**翻转后**的 `face` 沿 z 轴平移 `100px`
