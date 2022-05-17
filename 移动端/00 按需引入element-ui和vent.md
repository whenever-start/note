# element-ui, vant 按需引入(vue-cli3)

> [vant 官网](https://youzan.github.io/vant/#/zh-CN/quickstart#yin-ru-zu-jian)
[element-ui 官网](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)
[vue-cli3 同时按需引入vant和element ui](https://blog.csdn.net/baidu_38760069/article/details/104253932)

[toc]

## 安装

```shell
npm i element-ui -S
npm i vant -S

# element-ui 配置
npm install babel-plugin-component -D
# vant 配置
npm i babel-plugin-import -D
```

## 配置

```js
// babel.config.js
module.exports = {
    // presets 是vue-cli自动生成的, 可以忽略不看
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    'plugins': [
        [
            'component',
            {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
            }
        ],
        [
            'import',
            {
                'libraryName': 'vant',
                'libraryDirectory': 'es',
                'style': true
            }
        ]
    ]
}
```

## main.js 中引入

```js
// element-ui, vant-ui
import {
    Container,
    Header,
    Main,
    Footer
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)

import {
    Cell,
    CellGroup
} from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
```

## 使用

直接使用即可

```html
<el-container class="wy-container">
    <el-header>header</el-header>
    <el-main>main</el-main>
    <el-footer>footer</el-footer>
</el-container>

<van-cell title="标题" value="内容" />
```
