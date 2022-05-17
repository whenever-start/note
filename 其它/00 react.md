# react

1. react 介绍：
   React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在 2013 年 5 月开源了。由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用
   React Native:能开发原生应用
   React 主要是用于构建用户界面的 JavaScript 库，实现单页面应用

   单页面应用：整个网站只有一个 html 页面，内容切换是通过 js 操作实现。网站加载后如果查看网页源代码，会发现 body 中只有一个空的 div，没有任何内容。

   特点：声明式设计（采用声明范式）、高效、灵活、JSX 语法、组件、单向响应的数据流、数据双向绑定(伪)

2. 安装项目

   ```shell
   npx create-react-app projectName
   # 用淘宝镜像
   npx create-react-app projectName -r https://registry.npm.taobao.org
   # 或者先下载 create-react-app 工具
   npm i -g create-react-app
   # 使用这个工具安装项目
   create-react-app project-name
   ```

3. jsx 语法
   - HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX（JavaScript and XML） 的语法，JSX,是一种 JavaScript 的语法扩展，它允许 HTML 与 JavaScript 的混写
   - 语法：
       <div></div>:    遇到标签就按html解析
       {str} :         遇到{}就按js解析，{}中的js代码不要直接出现{}
   - JSX 是一个表达式
   - jsx 中不能写的：
     1. 语句
     2. 不能写 object 对象
   - jsx 中选择结构，循环怎么写
     - 选择结构：使用三元运算(三目运算)
       在组件的 return 外部使用 if
     - 循环结构：map()/filter()/reduce()/forEach()/some()
       在组件的 return 外部使用 for
4. 元素渲染

   - 元素描述了你在屏幕上想看到的内容，是构成 React 应用的最小砖块，与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。
   - 语法：
     ReactDOM.render(element,parentNode)
   - 说明： 1.参数 1：element 为要显示的元素。可以是双标签形式的，也可以是单标签形式的，如果是单标签必须有结束符号 2.参数 2：parentNode 为元素要显示在页面的哪个标签中。 3.渲染方法一般一个项目中只有一个。其他页面通过组件引入或者路由访问。 4.更新已渲染的元素:React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()
   - react 元素
     React 元素是创建开销极小的普通对象
     react 的 API： React.createElement() ：创建并返回指定类型的新 React 元素
     语法： React.createElement(type,[props],[...children])

   - jsx 语法与 react 元素的关系
     jsx 语法 解析后生成 React.createElement()

- 组件
  - 组件中的顶层标签只能有一个，不能出现兄弟元素
  - 组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。
  - 创建组件的方式
    1. 函数形式
       function App(props){
       let message = '字符串'
       return (
       //jsx 语法的页面结构
       <div>
       {message}
       </div>
       )
       }
       在前几天讲课中几乎不用函数式组件，因为功能太弱，只有使用 hook 语法后，函数式组件才能适应生成环境。
    2. 类形式组件
       class App extends React.Component{
       constructor(props){
       super(props)
       this.state = {
       msg:1111
       }
       }
       render(){
       return (
       <div>{msg}</div>
       )
       }
       }
  - 导出组件(使用的是 es6 模块的导出方式)
    export
    export default
  - 组件的使用
    引入：import 引入
    作为标签使用
    <Home />
    <Home></Home>
- 组件的复用性

- 组件传递数据(props)
  - 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为 “props”。
  - 解释一下：父级组件调用子级组件时，可以在子级组件标签上定义一些自定义属性，jsx 会把这些自定义属性转换成一个对象,把这个对象传递给子级组件，子级组件中可以通过一个关键字'props'来接收
    父级组件:当前组件
    子级组件:当前组件中引入的其他组件
  - props 是只读属性
    不能在子级组件中直接修改 props 数据，如果想修改，必须让父级修改。

作业：
有能力的，可以请求 https://temp.163.com/special/00804KVA/cm_dujia.js?callback=data_callback 这个地址下数据，展示到页面中
