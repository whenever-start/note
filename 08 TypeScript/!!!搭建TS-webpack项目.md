# 搭建 typescript-webpack 项目

[toc]

## 准备工作

### 新建文件夹和文件

- 新建项目文件夹
- `npm init -y`
- 创建 `webpack.config.js` 文件
- 创建 `tsconfig.json` 文件
- 新建 `src` 文件夹和 `/src/index.html` 和 `/src/index.ts` 文件
- `favicon.ico` 引入 `index.html` 中

### 安装插件

- `webpack` 和 `typescript`

  ```shell
  npm i -D webpack webpack-cli typescript ts-loader
  ```

- **_常用插件:_** 生成 `html`、每次 `build` 清除生成的文件、`webpack` 服务器

  ```shell
  npm i -D html-webpack-plugin clean-webpack-plugin webpack-dev-server
  ```

- `babel`

  ```shell
  npm i -D @babel/preset-env @babel/core babel-loader core-js
  ```

- `less`

  ```shell
  npm i -D less less-loader css-loader style-loader
  ```

- `postcss`: `css` 兼容处理

  ```shell
  npm i -D postcss postcss-loader postcss-preset-env
  ```

### `package.json` 添加新脚本

```json
"scripts": {
  "build": "webpack",
  "start": "webpack server --open"
}
```

## `tsconfig.json` 配置

基础配置

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "strict": true,
    "noEmitOnError": true
  }
}
```

<details>
<summary>详细配置</summary>

```json
{
  // **: 任意文件夹(包括可以为空)
  // *: 任意文件
  "include": ["./src/**/*"],

  // 默认值里就有 node_modules
  "exclude": ["node_modules"],

  // 直接指定文件名(多用 include)
  "files": ["./src/基本类型.ts"],

  // 继承 xxx.json 的设置
  "extends": "./xxx.json",

  // 编译设置
  "compilerOptions": {
    // 编译成哪个版本的 js(可用值: 空值故意写个错值看提示)
    "target": "es2015",

    // 指定导出模块
    "module": "es2015",

    // 编译过程中需要引入的库文件的列表, 一般默认就好
    // 默认值 target为ES5：DOM，ES5, target为ES6：DOM，ES6，DOM.Iterable，ScriptHost
    // "lib": ["DOM"],

    // 输出目录dist
    "outDir": "./dist",

    // module 必须为 amd 或 system (少用)
    // 将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和 ///<reference``>和 import的文件顺序决定的
    // "outFile": "xxx.js",

    // 允许编译 js 文件, 默认 false, 即只编译 ts 文件 一般和 checkJs 一起用
    "allowJs": false,

    // 是否检测 js 文件(ts检测), 默认 false, 即不会对 js 检查类型错误
    "checkJs": false,

    // 编译时是否移除注释, 默认 false
    "removeComments": false,

    // 编译后不生成 js 文件(等于没编译), 只检查类型, 默认 false
    "noEmit": false,

    // 检查有错误时, 才不生成 js 文件, 默认 false
    "noEmitOnError": false,

    /* ********************** 语法 - 分割线 *********************** */

    // 严格模式总开关 默认 false
    // 建议打开, 后面再将不想要的关掉
    "strict": true

    // 编译后的文件是否使用严格模式
    // 如果含有 模块导出, 不用设置自身默认就是严格模式
    // "alwaysStrict": false,

    // 是否允许隐式 any 类型, 默认 false
    // "noImplicitAny": false,

    // 是否允许隐式 this, 默认 false
    // 在第一个参数位置指定 this 指向, 不会影响其它参数
    // function(this: Window){console.log(this)}
    // "noImplicitThis": false,

    // 严格检查空值, 默认 false
    // 比如 const box = document.get...
    // 因为 box 可能是空值, box.addEventListener(...) 中的 box 会报错
    // 可以用 box?.addEventListener(...)
    // "strictNullChecks": false,
  }
}
```

</details>

## `webpack.config.js` 配置

```js
// 写 webpack 配置时智能提示 (不知道为什么不生效)
/** @type {import('webpack').Configuration} */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // 生成的 bundle 文件用 function 函数而不是箭头函数
    // 因为这部分代码是 webpack 的, babel 无法处理, 导致低版本浏览器无法兼容, 所以需要关闭
    environment: {
      arrowFunction: false
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 浏览器版本
                    targets: {
                      chrome: '58',
                      ie: '11'
                    },
                    // core-js 版本
                    corejs: '3',
                    // 按需加载
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ]
      },
      // 处理 less, loader 按顺序
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            // 兼容 (加前缀)
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // favicon
      favicon: path.resolve(__dirname, 'favicon.ico')
    }),

    new CleanWebpackPlugin()
  ],

  resolve: {
    // import 的时候可以省略后缀
    extensions: ['.ts', '.js']
  }
}
```
