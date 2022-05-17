# prettier-code formatter

[toc]

第一步: `ctrl+shift+p` 打开命令行, 输入 `settings.json`, 打开 `settings.json`
第二步: 输入一下设置

```js
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    }
}
```

设置完后, 在 `vue` 文件和 `js` 文件默认使用 `prettier` 格式化, 并且保存时会自动格式化

第三步: 在左下角打开设置, 在扩展中找到 `prettier-code formatter`, 设置

```js
module.exports = {
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',

  // 大括号内的首尾需要空格
  bracketSpacing: true,

  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',

  // 行尾需要有分号
  semi: false,

  // 使用 2 个空格缩进
  tabWidth: 2,

  // 末尾不需要逗号 如 {a, b} [a, b]
  trailingComma: 'none',

  // 不使用缩进符，而使用空格
  useTabs: false,

  // 使用单引号
  singleQuote: true,


  // ---分割线---
  // 以下不需要设置
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
}
```

**注意:** 设置缩进的时候与 `vscode` 的缩进设置保持一致

## package.json 设置

> [解决vscode eslint与prettier冲突](https://zhuanlan.zhihu.com/p/101241781?from_voters_page=true)

```js
"prettier": {
  "eslintIntegration": true,
  "stylelintIntegration": true,
  // 添加规则
  "singleQuote": true,
  "semi": false,
  "insertPragma": false,
  "trailingComma": "none",
  "arrowParens": "avoid"
}
```

**.eslintrc.js:**

配置好 `eslint`, 如果编辑器没报错, 但 `vue` 编译后仍然报错, 则重新编译(`npm run serve`)

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'never'],
    indent: 0
  }
}
```
