# 新建 vue-cli

[toc]

> [官网](https://cli.vuejs.org/zh/guide/installation.html) > [vue-cli 3.0 版本](https://segmentfault.com/a/1190000016775778) > [vue-cli 最全解析](https://juejin.im/post/5b2872516fb9a00e8626e34f#heading-2)

## 全局安装

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

查看版本号检验是否成功

```shell
vue --version
```

## 创建项目

```shell
vue create 项目名(wangyi-app)

# 使用淘宝镜像
vue create myproject -r https://registry.npm.taobao.org

# 选择需要的选项
```

**安装依赖:**

```shell
# dependencies 是运行时依赖（生产环境)
npm install --save  package_name

# devDependencies 是开发时的依赖（开发环境）
npm install --save-dev package_name
npm install --save-dev less
npm install --save-dev less-loader

# 安装 vuex vue-router,和 iview 等与界面相关的插件
vue add package_name
```

常用插件

```shell
# Vue 2 项目，安装 Vant 2
npm i vant@latest-v2

# 按需引入
npm i babel-plugin-import -D

# axios
npm i axios
```

配置

```js
// .babelrc 或 babel.config.js
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```

```js
import { Button } from 'vant'
```

**运行:**

```shell
# 注意要进入根目录
npm run serve
```

## vue.config.js

```js
module.exports = {
  publicPath: '/', // 根路径
  outputDir: 'dist', // 构建输出目录，执行：npm run build后项目打包在dist文件下
  assetsDir: 'assets', // 静态资源目录（js,css,img,fonts）
  chainWebpack: (config) => {
    // 别名, .set(key, value)
    config.resolve.alias
      .set('components', '@/components')
      .set('assets', '@/assets')
      .set('views', '@/views')
  },
  devServer: {
    open: true, // 浏览器自动打开页面
    host: 'localhost', // 域名
    port: 8080
  }
}
```

## eslint 和 prettier

```shell
npm i -D eslint-config-prettier
```

```js
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: 0,
    'padding-line-between-statements': [
      'error',
      // 要求 return 语句之前有一空行
      { blankLine: 'always', prev: '*', next: 'return' },
      // 要求在生命语句周围换行
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      // 要求 {} for if 等前后有空行
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' }
    ]
  }
}
```

```json
// package.json
"prettier": {
  "singleQuote": true
}
```

更多配置可看[vscode-prettier]('../编程环境/vscode-pretter设置.md')

## 修改创建后的文件

- 删除 `App.vue` 中所有样式
- 删除 `App.vue` `template` 中多余的代码, 只留一个 `router-view` 接口(如果有 `router`)

  ```html
  <template>
    <div id="app">
      <router-view />
    </div>
  </template>

  <style lang="less"></style>
  ```

- 删除 `HelloWorld.vue`

- 引进样式: `reset.css`(或 `normalized.css`) `var.less` `base.less`

  - `reset.css`: 重置样式(去掉标签原有样式)
  - `var.less`: 基础样式(变量)
  - `base.less`: 公共样式

  ```html
  <!-- 可以放到 public 文件夹下 静态引入 -->
  <link rel="stylesheet" href="<%= BASE_URL %>normalize.css" />

  <!-- reset 和 normalize 一般只引用一个 -->
  <link rel="stylesheet" href="<%= BASE_URL %>reset.css" />

  <!-- 可以在 index.html 中引入在线文件 -->
  <link
    rel="stylesheet"
    href="https://at.alicdn.com/t/font_2996165_ons3qs4dj4k.css"
  />
  ```

  ```js
  // main.js
  import 'assets/styles/base.css'
  ```

`less` 文件引入

```less
@import '~assets/less/var.less';
```
