# 命名 + BEM

## 布局

- `mod`
- `module`
- `header` - `main` - `footer`
- `content`
- `container`

## 标签

- 导航：
  - `nav`
  - `menu`
  - `channel`
- 搜索
  - `search`
  - `label`
  - `search-hot`
  - `smart-box`: 搜索框的弹出框
- 快捷入口 / 用户中心
  - `quick`
  - `user-center`
- 轮播图
  - `slider`
  - `swiper`
- 文本
  - `title`
  - `subtitle`
  - `text`
  - `desc`
  - `label`
  - `info`
  - `link`
  - `copyright`
  - `tag`
  - `badge`
- `footer`

## [BEM](https://baike.baidu.com/item/BEM/23772830?fr=aladdin)

- `B`: `Block`, 一个块独立实体，独立的意义。如：`header` `container` `menu` `checkbox`
- `E`: `Element`，元素 block 的一部分，没有独立的意义。语意上和 block 有关系。如：`menuitem` `header title`
- `M`: `Modifier`，修饰符，block 或 element 上的标记。使用他来改变外观或行为。如：`disabled` `active`

`.nav .nav-item .nav-item--active`

## 功能

- 赞 踩: `like` `unlike`
