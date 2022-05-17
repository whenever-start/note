# Flex

> [阮一峰：Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[toc]

## 属性

### 父级盒子

```css
.container {
  display: flex;

  flex-direction: row | row-reverse | column | column-reverse;

  flex-wrap: nowrap | wrap | wrap-reverse;

  flex-flow: <flex-direction> || <flex-wrap>;

  justify-content: flex-start | flex-end | center | space-between | space-around;

  align-items: flex-start | flex-end | center | baseline | stretch;

  align-content: flex-start | flex-end | center | space-between | space-around |
    stretch;
}
```

## 子集盒子

```css
.item {
  order: <integer>;

  flex-grow: <number>; /* default 0 */

  flex-shrink: <number>; /* default 1 */

  flex-basis: <length> | auto; /* default auto */

  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## flex 缩写

none: 0 0 auto
auto: 1 1 auto
1: 1 1 0%

## 常用功能

- `固定宽度 + 自动填满` 模式

  ```less
  // 如果是页面布局，注意 html, body, .container 都需要高度 100%
  .container {
    display: flex;
    flex-direction: column;

    .header {
      flex: 0 0 @header_height;
    }

    .main {
      /* 缩写 flex:1; */
      flex: 1 1 0%;
      overflow-y: auto;
    }

    .footer {
      flex: 0 0 @footer_height;
    }
  }
  ```
