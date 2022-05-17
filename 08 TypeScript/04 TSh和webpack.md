# TS 和 webpack

[toc]

## 搭建项目

```shell
npm i -D webpack webpack-cli typescript ts-loader
```

## 安装插件

```shell
npm i -D html-webpack-plugin clean-webpack-plugin webpack-dev-server
```

## `tsconfig.json` 配置

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "strict": true
  }
}
```

## `webpack.config.js` 配置

[babel-loader 使用指南](https://juejin.cn/post/6844903855558246408)

`useBuiltIns` 可选值

- `false`: 默认值, 关闭 `polyfill`
- `"entry"`: 需要你在入口文件 `import @babel/polyfill`，它会依据环境设置，仅导入环境不支持的 `polyfill`
  - 优点：只导入环境不支持的 `polyfill`
  - 缺点：需要手动导入 `@babel/polyfill`
- `"usage"`: 按需加载
  - 优点: 只导入需要的 `polyfill` 并且是自动导入
  - 缺点：实验中的属性

`@babel/preset-env` 使用起来非常方便，但遗憾的是它并不能覆盖所有开发场景，因为它存在两个缺点

- 重复填充: @babel/preset-env 会填充每一个文件，所以 `a.js / b.js` 如果同时用到了 `Promise`，那么翻译后两个文件均存在 `Promise` 的填充
- 全局污染: `@babel/preset-env` 会将 `Promise` 翻译成全局变量 `var \_Promise`

### `@babel/plugin-transform-runtime`

可以用 `@babel/plugin-transform-runtime` 来解决

**_注意:_** 如果项目是公共库，使用 `@babel/plugin-transform-runtime` ，否则使用 `@babel/preset-env`

```shell
npm i -D @babel/plugin-transform-runtime
npm i -S @babel/runtime-corejs2
```

```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src')
  ],
  options: {
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          'corejs': 2,
          'absoluteRuntime': false,
          'helpers': true,
          'regenerator': true,
          'useESModules': false
        }
      ]
    ]
  }
}

```

**全部配置:**

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      // 生成的文件会用箭头函数, 因为这部分代码是 webpack 的, babel 无法处理, 导致低版本浏览器无法兼容, 所以需要关闭
      arrowFunction: false
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        // 使用多个 loader处理, 最后一个最先用
        use: [
          // 配置用对象
          {
            // loader 名
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 兼容浏览器
                    targets: {
                      chrome: '58',
                      ie: '8'
                    },
                    // corejs 版本(package 中下载的版本)
                    corejs: '3',
                    // 使用 core-js 的方式 usage: 按需加载 core-js
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node_module/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      // favicon
      favicon: path.resolve(__dirname, 'favicon.ico'),

      // 根据需要调整
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      minify: {
        //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new CleanWebpackPlugin()
  ],

  // 导入的时候可以识别 ts 文件
  resolve: {
    extensions: ['.ts', '.js']
  }
}
```
