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
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],

  // 导入的时候可以识别 ts 文件
  resolve: {
    extensions: ['.ts', '.js']
  }
}
