# HTML 汇总

[toc]

## 一、标签分类

[HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

```txt
主根元素：html
  文档元数据：head
  分区根元素：body
    内容分区：h1-h6, header footer main aside, section article nav
      文本内容：div  ul figure menu
      内联文本语义：span a em strong
      图片和多媒体：img video audio map area track
    内嵌内容：iframe picture source
    表单：input form 等
    交互元素：details summary dialog
```

## 二、常用标签

### 2.1 `head` 文档元数据

`HTML head` 元素 规定文档相关的 **_配置信息（元数据）_**，包括文档的标题，引用的文档样式和脚本等。

#### `base`标签

```html
<!-- 指定页面上的相对路径的根路径 -->
<base href="https://xxx.com/" />

<!-- 所有的链接都是新窗口打开 -->
<base target="_black" />
<!-- 元素 target 优先级更高 -->
<a href="xx" target="_self">链接</a>
```

#### `link`：外部资源链接元素

`HTML` 外部资源链接元素 (`<link>`) 规定了当前文档与外部资源的关系。该元素最常用于链接样式表，此外也可以被用来创建站点图标 (比如 PC 端的 `“favicon”` 图标和移动设备上用以显示在主屏幕的图标) 。

<details>
<summary>link 常见示例</summary>

```html
<link rel="icon" href="favicon.ico" />
<!-- ios 不支持icon，用 apple... 非标准属性替代 -->
<!-- sizes属性表示图标大小，type属性包含了链接资源的 MIME 类型。这些属性为浏览器选择最合适的图标提供了有用的提示。 -->
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="apple-icon-114.png"
  type="image/png"
/>

<!-- 你也可以提供一个媒体类型，或者在media属性内部进行查询；这种资源将只在满足媒体条件的情况下才被加载进来。例如： -->
<link href="print.css" rel="stylesheet" media="print" />
<link
  href="mobile.css"
  rel="stylesheet"
  media="screen and (max-width: 600px)"
/>

<!-- <link>也加入了一些新的有意思的性能和安全特性。举例如下： -->
<!-- 将rel设定为preload，表示浏览器应该预加载该资源  -->
<link
  rel="preload"
  href="myFont.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

</details>

##### `link` 属性

[link 属性--mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#%E5%B1%9E%E6%80%A7)

#### `meta`

`HTML` `<meta>` 元素表示那些不能由其它 `HTML` 元相关（`meta-related`）元素（(`<base>`、`<link>`, `<script>`、`<style>` 或 `<title>`）之一表示的任何元数据信息。

**`meta` 元素定义的元数据的类型包括以下几种：**

- 如果设置了 `name` `属性，meta` 元素提供的是文档级别（`document-level`）的元数据，应用于整个页面。
- 如果设置了` http-equiv` 属性，`meta` 元素则是编译指令，提供的信息与类似命名的 `HTTP` 头部相同。
- 如果设置了 `charset` 属性，`meta` 元素是一个字符集声明，告诉文档使用哪种字符编码。
- 如果设置了 `itemprop` 属性，`meta` 元素提供用户定义的元数据。

```html
<!-- 当前页面的作者 -->
<meta name="author" content="bnbbs" />
<!-- 当前页面的描述 -->
<meta name="description" content="这是一个 HTML5 页面" />
<!-- 当前页面的关键字 -->
<meta name="keywords" content="html5,css3,响应式" />
<!-- 当前页面的编码工具 -->
<meta name="generator" content="sublime text 3" />

<!-- 声明字符编码 -->
<meta charset="utf-8" />
<!-- 模拟 HTTP 标头字段：http-equiv: 与http等价 -->
<!-- 5s后刷新到新网址 -->
<meta http-equiv="refresh" content="5;http://li.cc" />
<!-- 另一种声明字符编码 -->
<meta http-equiv="content-type" content="text/html charset=utf-8" />
```

#### `link`

`HTML` 的 `<style>` 元素包含文档的样式信息或者文档的部分内容。默认情况下，该标签的样式信息通常是`CSS`的格式。

- `type`：该属性以 `MIME` 类型（不应该指定字符集）定义样式语言。如果该属性未指定，则默认为 `text/css`。
- `media`：该属性规定该样式适用于哪个媒体。属性的取值`CSS` 媒体查询，默认值为 `all`。
- `nonce`：一种加密的随机数（一次使用的数字），用于在`style-src Content-Security-Policy` (en-US)中将内联样式列入白名单。 服务器每次发送策略时都必须生成一个唯一的随机数值。 提供一个无法猜测的随机数非常重要，因为绕开资源策略是微不足道的。
- `title`：指定可选的样式表。

#### `title`

`HTML` `<title>` 元素 定义文档的标题，显示在浏览器的标题栏或标签页上。它只应该包含文本，若是包含有标签，则它包含的任何标签都将被忽略。

`a`链接

```html
<!-- 新窗口打开 -->
<a href="xxx.com/path/filename" target="_blank">xxx</a>

<!-- 空链接 -->
<a href="javascript:;"></a>
<a href="#"></a>

<!-- 锚点 -->
<a href="#id_name"></a>
```

### 2.2 内容分区

#### `article`

`HTML` `<article>`元素表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构，如在发布中，它可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。​​

**使用说明：**

- 每个`<article>`，通常包括标题（`<h1>` - `<h6>`元素）作为`<article>`元素的子元素。
- 当`<article>`元素嵌套使用时，则该元素代表与外层元素有关的文章。例如，代表博客评论的`<article>`元素可嵌套在代表博客文章的`<article>`元素中。
- `<article>`元素的作者信息可通过`<address>`元素提供，但是不适用于嵌套的`<article>`元素。
- `<article>`元素的发布日期和时间可通过`<time>`元素的 pubdate 属性表示。

- 可以使用`<time>` 元素的 datetime 属性来描述`<article>`元素的发布日期和时间。请注意`<time>`的 `pubdate` 属性不再是 W3C (en-US) `HTML5` 标准。

#### `main`

`HTML` `<main>` 元素呈现了文档的 `<body>` 或应用的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。

**使用说明：**
在文档中，`<main>` 元素的内容应当是独一无二的。任何同时存在于任意一系列文档中的相同、重复内容，比如侧边栏、导航栏链接、版权信息、网站 `Logo`，搜索框（除非搜索框为文档的主要功能），都不应当被包含在其内。

#### `header`

`HTML` `<header>` 元素用于展示介绍性内容，通常包含一组介绍性的或是辅助导航的实用元素。它可能包含一些标题元素，但也可能包含其他元素，比如 `Logo`、搜索框、作者名称，等等。

#### `footer`

`HTML` `<footer>` 元素表示最近一个章节内容或者根节点（`sectioning root` ）元素的页脚。一个页脚通常包含该章节作者、版权数据或者与文档相关的链接等信息。

- `<footer>`元素内的作者信息应包含在`<address>` 元素中。
- `<footer>`元素不是章节内容，因此在`outline`（大纲）中不能包含新的章节。

#### **_`section`_**

`HTML` `<section>`元素表示一个包含在 `HTML` 文档中的独立部分，它没有更具体的语义元素来表示，一般来说会有包含一个标题。

**使用说明：**

- **一般通过是否包含一个标题 (`<h1>` -`<h6>`) 作为子节点 来 辨识每一个`<section>`**。
- 如果 `<section>` 元素的内容可以单独在多个媒体上发表，应该使用 `<article>` 而不是 `<section>`。
- 不要把 `<section>` 元素作为一个普通的容器来使用，这是本应该是`<div>`的用法（特别是当片段（the sectioning ）仅仅是为了美化样式的时候）。 一般来说，一个 `<section>` 应该出现在 **_文档大纲_** 中。

#### `nav`

`HTML` `<nav>`元素表示页面的一部分，其目的是在当前文档或其他文档中提供 **_导航链接_**。导航部分的常见示例是菜单，目录和索引。

使用说明：
**并不是所有的链接都必须使用`<nav>`元素，它只用来将一些热门的链接放入导航栏，例如`<footer>`元素就常用来在页面底部包含一个不常用到，没必要加入`<nav>`的链接列表。**
**一个网页也可能含有多个`<nav>`元素，例如一个是网站内的导航列表，另一个是本页面内的导航列表。**
对于屏幕阅读障碍的人，可以使用这个元素来确定是否忽略初始内容。

```html
<!-- 网站内的导航列表（大） -->
<nav class="main_nav">
  <ul class="main_nav__menu">
    <li><a href="#">首页</a></li>
    <li><a href="#">关于</a></li>
    <li><a href="#">简介</a></li>
  </ul>
</nav>
<!-- 本页面内的导航列表 -->
<nav class="subnav">
  <ul class="subnav__menu">
    <li><a href="#">喜剧</a></li>
    <li><a href="#">古装</a></li>
    <li><a href="#">武侠</a></li>
  </ul>
</nav>
<!-- 其它词汇：chanel site_chanel site_subnav -->
```

#### `aside`

`HTML` `<aside>` 元素表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者标注框（`call-out boxes`）。

使用说明
不要使用 `<aside>` 元素去尾随括号内的文本 ，因为这种文本被认为是主要流内容的一部分。

#### `h1-h6`

`<h1>` 到 `<h6>` HTML 元素代表六个级别的部分标题。 `<h1>` 是最高的节级别，而 `<h6>` 是最低的。

使用说明

- 调节文本大小应用 `font-size` 属性而不是用标签。
- `h1` 到 `h6` 按顺序使用，不要跳过。
- 每个页面应该有且只有一个 `h1`

### 2.3 文本内容

#### `div`

`<div>` 元素应当仅在没有任何其它语义元素（比如 `<article>` 或 `<nav>`）可用时使用。

#### `ul`

`HTML` `<ul>` 元素（或称 `HTML` 无序列表元素）表示一个内可含多个元素的无序列表或项目符号列表。

#### `figure`

`HTML` `<figure>` 元素代表一段独立的内容，经常与说明（`caption`）`<figcaption>` 配合使用，并且作为一个独立的引用单元。当它属于主内容流（`main flow`）时，它的位置独立于主体。这个标签经常是在主文中引用的图片，插图，表格，代码段等等，当这部分转移到附录中或者其他页面时不会影响到主体。

- 非主内容，只是一个引用，去掉不影响大纲。
- 通常，`<figure>`是图像，插图，图表，代码片段等，在文档的主流程中引用，但可以移动到文档的另一部分或附录而不影响主流程。
- 通过在其中插入`<figcaption>`（作为第一个或最后一个子元素），可以将标题与`<figure>`元素相关联。图中找到的第一个`<figcaption>`元素显示为图的标题。

#### `menu`

实验性标签

### 2.4 内联文本语义

#### `span`

`HTML` `<span>` 元素是短语内容的通用行内容器，并没有任何特殊语义。可以使用它来编组元素以达到某种样式意图（通过使用类或者 Id 属性），或者这些元素有着共同的属性，比如 `lang`。应该在没有其他合适的语义元素时才使用它。`<span>` 与 `<div>` 元素很相似，但 `<div>` 是一个 块元素 而 `<span>` 则是 行内元素 .

`DOM` 接口 [HTMLSpanElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSpanElement) (在 HTML5, 之前是 `HTMLElement`，继承 `HTMLElement`，且暂时没有自己的属性和方法)

#### `a`

`HTML` `<a>` 元素（或称锚元素）可以通过它的 `href` 属性创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 `URL` 的超链接。`<a>` 中的内容应该指明链接的意图。如果存在 `href` 属性，当 `<a>` 元素聚焦时按下回车键就会激活它。

属性

- `download`
- `href`
- `referrerpolicy`：表明在获取 `URL` 时发送哪个提交者（`referrer`）
  - "`no-referrer`" 表示 Referer: 头将不会被发送。
  - "`no-referrer-when-downgrade`" 表示当从使用 HTTPS 的页面导航到不使用 TLS(HTTPS) 的来源 时不会发送 Referer: 头。如果没有指定策略，这将是用户代理的默认行为。
  - "`origin`" 表示 referrer 将会是页面的来源，大致为这样的组合：主机和端口（不包含具体的路径和参数的信息）。
  - "`origin-when-cross-origin`" 表示导航到其它源将会限制为这种组合：主机 + 端口，而导航到相同的源将会只包含 referrer 的路径。
  - '`strict-origin-when-cross-origin`'
  - "`unsafe-url`" 表示 referrer 将会包含源和路径（domain + path）（但是不包含密码或用户名的片段）。这种情况是不安全的，因为它可能会将安全的 URLs 数据泄露给不安全的源。
- `rel`：该属性指定了目标对象到链接对象的关系。该值是空格分隔的 [列表类型值](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)。
- `target`：`_self` `_blank` `_parent` `_top`
- `type`：[MIME type](./HTML%E7%9B%B8%E5%85%B3%E7%9F%A5%E8%AF%86.md)

```html
<!-- download -->
<!-- 1. 必须同源 -->
<!-- 2. download 无值直接下载，有值则值为重命名 -->
<a href="/images/myw3schoolimage.jpg" download="w3logo">a</a>

<!-- href: 返回顶部 -->
<a href="#">a</a>
<a href="#top">a</a>

<!-- 邮件 -->
<a href="mailto:nowhere@mozilla.org">Send email to nowhere</a>
<!-- 电话 -->
<a href="tel:+491570156">+49 157 0156</a>
```

[使用 download 属性将 `<canvas>` 保存为 PNG 格式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#%E4%BD%BF%E7%94%A8_download_%E5%B1%9E%E6%80%A7%E5%B0%86_%3Ccanvas%3E_%E4%BF%9D%E5%AD%98%E4%B8%BA_png_%E6%A0%BC%E5%BC%8F)

[伪类状态](https://juejin.cn/post/6844904013566066702#heading-2)
顺序：`link` - `visited` - `hover` - `active`
原因：`link` 和 `visited` 都是“长时间”的稳定状态，所以必须在前面。`active` 是点击（鼠标按下到松开的那一刻）瞬间的状态，而这个此时肯定也是 `hover` 状态，所以 `active` 在 `hover` 后面。

#### `em`

`HTML` 着重元素 (`<em>`) 标记出需要用户着重阅读的内容， `<em>` 元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读。

请注意： 通常地，该元素会被浏览器展示为斜体文本， 但是，它不应该仅仅用于应用斜体样式；为此目的，请使用 CSS 样式。使用 `<cite>` 元素标记作品的标题（书籍，戏剧，歌曲等）；它通常也采用斜体样式，但具有不同的含义。使用 `<strong>` 元素标记比周围文本更重要的文本。

#### `strong`

`Strong` 元素 (`<strong>`) 表示文本十分重要，一般用粗体显示。

`em` 着重“词”，`strong` 着重“句”。

### 2.5 图片和多媒体

#### `img`

`HTML` `<img>` 元素将一份图像嵌入文档。

常见格式：`png` `jpe?g` `gif` `svg` `ico` `webp`（`web picture format`，谷歌新一代技术，牺牲质量，压缩小 40%）

- `src` 属性是必须的，它包含了你想嵌入的图片的文件路径。
- `alt` 属性包含一条对图像的文本描述，图片加载失败时会在浏览器显示的文本。

#### `video`

#### `audio`

#### `map`

#### `area`

#### `track`

### 2.6 内嵌内容

### 2.7 表单
