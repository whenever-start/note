# eslint 规则

[eslint 规则](https://cn.eslint.org/docs/rules/)
[prettier 规则](https://prettier.io/docs/en/options.html)

```js
{
  // 要求箭头函数的参数使用圆括号
  "prettier.arrowParens": "always",
  // 对象、数组的 【括号间】 留有空格
  "prettier.bracketSpacing": true,
  // 末尾分号
  "prettier.semi": true,
  // 单引号
  "prettier.singleQuote": true,
  // 拖尾：对象、数组中最后一项结尾是否添加逗号
  "prettier.trailingComma": "es5",

  // script 和 style 标签缩进
  "prettier.vueIndentScriptAndStyle": true
}
```

```js
module.exports = {
  rules: {
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': ['error', 'always'],
    // 对象、数组的 【括号间】 留有空格
    'array-bracket-spacing': ['error', 'never'],
    // 末尾分号
    semi: ['error', 'always'],
    // 单引号
    quotes: ['error', 'single'],
    // 拖尾：对象、数组中最后一项结尾是否添加逗号
    'comma-dangle': ['error', 'always-multiline']
  }
}
```
