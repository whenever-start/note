# 配置 jsconfig.js

[vscode](https://code.visualstudio.com/docs/languages/jsconfig)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["./src/components/*"],
      "components/*": ["./src/components/*"]
    },
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"],
  "include": ["src/**/*"]
}
```

```js
{
  "compilerOptions": {
    // 基础路径 "." 表示当前目录
    "baseUrl": ".",
    // 配置路径别名
    "paths": {
      "@/components/*": ["./src/components/*"],
      "components/*": ["./src/components/*"]
    },
    "module": "commonjs",
    "target": "es6"
  },
  // 排除文件夹
  "exclude": ["node_modules"],
  // 检查文件夹
  "include": ["src/**/*"]
}
```
