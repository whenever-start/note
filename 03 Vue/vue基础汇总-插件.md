# vue插件汇总

[toc]

## 日期插件 pikaday

[github地址](https://github.com/Pikaday/Pikaday)

**安装:**

```shell
npm install --save pikaday

cnpm install --save pikaday

# 安装 moment.js 时间格式化如, Fri May 01 2020 => 2020-05-01
npm install --save moment
```

导入 css 样式:

```js
import 'pikaday/css/pikaday.css'
```

```less
@import './node_modules/pikaday/css/pikaday.css';
```

或者

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css">

<!-- vue-cli -->
<!-- 在 public/index.html -->
<link rel="stylesheet" type="text/css" href="<%= BASE_URL %>//cdn.jsdelivr.net/npm/pikaday/css/pikaday.css">
```

**引入:**

```html
<link rel="stylesheet" type="text/css" href="https://cdn.bootcdn.net/ajax/libs/pikaday/1.8.0/css/pikaday.min.css">
<script src="http://cdn.staticfile.org/moment.js/2.2.1/moment.min.js"></script>
<script src="http://cdn.bootcdn.net/ajax/libs/pikaday/1.8.0/pikaday.min.js"></script>

<!-- vue-cli -->
<!-- 在 public/index.html -->
<!-- moment.js 时间格式化如, Fri May 01 2020 => 2020-05-01 -->
<!-- 地址失效请到 cdn 查找 https://www.bootcdn.cn/ -->
<link rel="stylesheet" type="text/css" href="<%= BASE_URL %>//cdn.bootcdn.net/ajax/libs/pikaday/1.8.0/css/pikaday.min.css">
<script src="<%= BASE_URL %>//cdn.staticfile.org/moment.js/2.2.1/moment.min.js"></script>
<script src="<%= BASE_URL %>//cdn.bootcdn.net/ajax/libs/pikaday/1.8.0/pikaday.min.js"></script>
```

**使用:**

```html
<input type="text" id="datepicker">
```

```js
var picker = new Pikaday({
    field: document.getElementById('datepicker')
});
```

**格式:**

1. 默认情况下，使用标准 JavaScript Date 对象格式化和解析日期。
2. 如果 Moment.js 在范围内可用，它将用于格式化和解析输入值。
3. 可以将其它格式选项传递给配置，该选项将传递给 moment 构造函数。
4. 详情查看 moment.js

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // 五月 14日 2020, 7:58:32 晚上
moment().format('dddd');                    // 星期四
moment().format("MMM Do YY");               // 5月 14日 20
moment().format('YYYY [escaped] YYYY');     // 2020 escaped 2020
moment().format();                          // 2020-05-14T19:58:32+08:00
```

```js
var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    format: 'D MMM YYYY',
    onSelect: function() {
        console.log(this.getMoment().format('Do MMMM YYYY'));
    }
});
```

## 动画: vue-transition.css (类似于 animate.css)

> [vue相关的一些动画库整理](https://www.jianshu.com/p/4b6da63dffcf)

**引入:**

[下载地址](https://raw.githubusercontent.com/WebCodeFarmer/vue-transition.css/master/transition.min.css)

也可以用 npm 下载

```shell
npm install vue-transition.css --save
```

下载后, 放入 src/public/ 文件夹中

```html
<link rel="stylesheet" href="<%= BASE_URL %>vue-transition.min.css">

<!-- 非 .vue 文件 -->
<link rel="stylesheet" href="vue-transition.min.css">
```

**使用:**

`name` 的命名参照[效果图](https://webcodefarmer.github.io/vue-transition.css/dist/index.html#/moveBottomToTop)

```html
<!-- name 命名 -->
<transition name="move-right-to-left">
    <router-view class="app-router-view"></router-view>
</transition>
```

```css
/* 必须定位才能生效 */
.app { /* 父级 */
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    perspective: 1200px;
  }

  .app .app-router-view { /* 子级 */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  }
```

### vue-transition.css-列表过渡

**技巧:**

1. `name` 动态命名
2. 比较 `currentIndex` 更新前后的大小, 动态命名 `name` 的值

```html
<transition-group class="banner" :name="animationName" tag="ul">
    <li class="banner-box" v-for="index in 4" :key="index" v-show="index === currentIndex">{{index}}</li>
</transition-group>
<p>{{currentIndex}}</p>
<button @click="increase">加</button>
<button @click="decrease">减</button>
```

```js
data() {
    return {
        currentIndex: 1,
        onShow: true,
        animationName: ''
    }
},
watch: {
    currentIndex (newIndex, oldIndex) {
        this.animationName = newIndex > oldIndex ? 'move-fade-left-to-right' : 'move-fade-right-to-left'
    }
},
methods: {
    increase () {
        this.currentIndex = this.currentIndex === 4 ? 4 : this.currentIndex + 1
    },
    decrease () {
        this.currentIndex = this.currentIndex === 1 ? 1 : this.currentIndex - 1
    }
}
```

## 动画 - animate.css

> [演示](https://www.dowebok.com/demo/2014/98/)

---

**下载 `animate.css`, 引入**

```html
<!-- .vue -->
<link rel="stylesheet" href="<%= BASE_URL %>animate.min.css">

<!-- html -->
<link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.0/animate.min.css" rel="stylesheet">
```

**使用:**

***对单个元素使用(animate.css)***

```html
<!-- transition 添加 enter-active-class 和 leave-active-class -->
<!-- 不要忘记 animated -->
<transition name="singleAnimation"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutRight"
>
    <p class="p" v-show="strOnShow">文字</p>
</transition>
<button @click="strOnShow = !strOnShow">文字</button>
```

***对列表使用(animate.css)***

```html
<!-- 列表过渡标签 transition-group -->
<!-- 添加 enter-active-class leave-active-class -->
<!-- 动态绑定过渡样式名, :enter-active-class(v-bind 或加冒号) -->
<transition-group class="banner" tag="ul"
    :enter-active-class="enterAnimationName"
    :leave-active-class="leaveAnimationName"
>
    <li class="banner-box" v-for="index in 4" :key="index" v-show="index === currentIndex">{{index}}</li>
</transition-group>
```

```js
data() {
    return {
        currentIndex: 1,
        onShow: true,
        strOnShow: true,
        animationName: '',
        enterAnimationName: '',
        leaveAnimationName: '',
    }
},
watch: {
    // 监控 currentIndex 更新前后值的大小, 确定动画的方向
    currentIndex (newIndex, oldIndex) {
        this.enterAnimationName = newIndex > oldIndex ? 'animated rotateInDownLeft' : 'animated rotateInUPLeft'
        this.leaveAnimationName = newIndex > oldIndex ? 'animated rotateOutDownLeft' : 'animated rotateOutUpLeft'
    }
},
```

## element-ui

> [UI组件--element-ui--全部引入和按需引入](https://www.cnblogs.com/qiezuimh/p/10103522.html)

---

**全部引入:**

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

**按需引入:**

```shell
npm install babel-plugin-component -D
```

```js
// vue-cli3 之前版本
// .babelrc 文件
// 原来
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

// 修改为
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": [
    "transform-vue-jsx", "transform-runtime",
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "~theme"
      }
    ]
  ]
}
```

```js
// vue-cli3 版本
// babel.config.js
// 原来
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}

// 修改为
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
```

```js
// main.js
// 按需引入
import Vue from 'vue'
import { Button, Select } from 'element-ui'
// 按需引入, 自动引入了css文件
// 但是如果配置出问题, 导致引入css文件失效, 也可以直接引入下面文件
// import 'element-ui/lib/theme-chalk/index.css'

 Vue.use(Button)
 Vue.use(Select)
```

```js
// 完整的组件引入
import Vue from 'vue';
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```
