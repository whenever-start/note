# webpack 常用安装

## 安装依赖

### 环境

```shell
npm i -D webpack webpack-cli
npm i -D webpack-dev-server
npm i -S react react-dom
npm i -D @babel/core @babel/preset-env @babel/preset-react
```

### loader

```shell
npm i -D babel-loader
npm i -D css-loader less-loader style-loader
npm i -D url-loader
npm i -D file-loader
```

### plugin

```shell
npm i -D html--webpack-plugin
npm i -D clean-webpack-plugin
```

## 配置

webpack.config.js

```js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        // 按顺序, less-loader -> css-loader -> style-loader
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html'
    }),
    new cleanWebpackPlugin()
  ]
}
```
