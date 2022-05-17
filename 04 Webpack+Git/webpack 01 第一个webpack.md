<!--
 * @Description:
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-27 23:40:51
 * @LastEditTime: 2021-11-29 04:11:08
-->

# 第一个 webpack

[toc]

## 基础

1. 创建 `webpack-test` 项目
2. `npm init -y` 初始化
3. 简单项目结构

   ```text
   webpack-test
   | - src
       | - js
           | - sub.js
       | - main.js
   | - package.json
   | - webpack.config.js
   ```

   ```js
   // main.js
   const elText = require('./js/sub.js')
   const app = document.createElement('div')
   app.innerHTML = '<h1>我是app main.js</h1>'
   app.appendChild(elText)
   document.body.appendChild(app)

   // sub.js
   function generateText() {
     const element = document.createElement('p')
     element.innerHTML = '产生文本'
     return element
   }
   module.exports = generateText
   ```

4. 配置

   ```js
   const path = require('path')

   module.exports = {
     entry: './src/main.js',

     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js'
     },

     mode: 'development'
   }
   ```

5. `index.html` 文件引入打包好的文件 `bundle.js`
6. 命令行：`webpack` 开始打包

## loader

- `babel-loader`：将 `es6` 转换成 `es5`。

  ```shell
  # 需要先安装 webpack
  npm install -D babel-loader @babel/core @babel/preset-env
  ```

  ```js
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
  ```

- `file-loader`：处理图片（加载图片生成 src）。

  [file-loader -- npm](https://www.npmjs.com/package/file-loader)

  ```shell
  npm install file-loader --save-dev
  ```

  ```js
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
    ],
  },
  ```

  引用

  ```js
  // 注意需要加后缀名
  import src from './assets/img/a1.jpg'
  img.src = src
  ```

## 插件

- `clean-webpack-plugin`：清空打包的文件夹。

  > [clean-webpack-plugin ---npm](https://www.npmjs.com/package/clean-webpack-plugin)

  ```shell
  npm install --save-dev clean-webpack-plugin
  ```

  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  plugins: [
    new CleanWebpackPlugin(),
  ],
  ```

- `html-webpack-plugin`：在打包文件夹中生成一个 `html` 文件。

  ```shell
  npm i --save-dev html-webpack-plugin
  # webpack 4
  npm i --save-dev html-webpack-plugin@4
  ```

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  plugins: [
    new HtmlWebpackPlugin(),

    // 详细配置
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
  ],
  ```

- `webpack-dev-server`：开发服务器。
  开发阶段服务器运行后会对项目进行打包，生成 dist 文件夹，但是生成的文件夹是在内存中，不是真实的文件夹。
  运行后开发阶段服务器会处于监听状态，当项目关联的文件有变化时就会立即再次打包。

  > [webpack-dev-server -- npm](https://www.npmjs.com/package/webpack-dev-server)

  ```shell
  npm install webpack-dev-server --save-dev
  ```

  ```js
  devServer: {
    port: 8081,
    open: true, // 打开浏览器
    // 拦截网络请求
    before(app){
      app.get('./user',function(req,res){
        res.send({
          uname: 'lily',
          age: 12,
          sex: '女'
        })
      })
    },
    // before 无效的话用这个
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      devServer.app.get('/user', function (req, res) {
        res.send({ custom: 'response' })
      })
    },
    proxy: {
      '/api': {
        // 代理的目标地址
        target: 'http://localhost:5000',
        // 允许改变域名
        changeOrigin: true,
        // 重写路径
        pathRewrite: {
          '/api':''
        }
      }
    }
  }
  ```

## 其它配置

- `devtool`：报错信息显示形式。

  > [devtool 配置](https://www.webpackjs.com/configuration/devtool/)

  - `eval`：生成后的代码。
  - `eval-source-map`：原始代码
