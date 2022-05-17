# eslint

[VSCode 集成 ESLint + Prettier + Airbnb 风格指南](https://juejin.cn/post/7052526667579228168)

[webpack 之 ESlint 配置](https://zhuanlan.zhihu.com/p/347103745)

## 安装依赖

```shell
cnpm i -D eslint eslint-webpack-plugin

cnpm i -D eslint-config-airbnb-base  eslint-plugin-import

cnpm i -D eslint-config-prettier eslint-plugin-prettier
```

## 配置

新建文件 `webpack.config.js`

```js
// webpack.config.js
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {}
  }
}
```

新建文件 `.eslintrc.json`

```js
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "prettier/perttier": ["error"]
  }
}

```

`.eslintignore` 忽略文件

```text
/dist
/node_module
```

新建文件 `.prettierrc`

```json
// .prettierrc
{
  "singleQuote": true
}
```
