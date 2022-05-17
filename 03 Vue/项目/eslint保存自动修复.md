# vue 项目中 eslint 项目保存自动修复

## 配置

因为在全局中开启了 `prettier` 的保存自动格式化功能, 所以要先在本地项目中关闭

配置**工作区域**的 `settings.js`

```js
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "[markdown]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    // 以下是配置自动保存
    "eslint.alwaysShowStatus": true,  // 总是在 VSCode 显示 ESLint 的状态
    "eslint.quiet": true,             // 忽略 warning 的错误
    "editor.codeActionsOnSave": {     // 保存时使用 ESLint 修复可修复错误
        "source.fixAll": true,
        "source.fixAll.eslint": true
    },
}
```

## 引入其它规则

[详情](https://juejin.cn/post/7007419705543622669#heading-11)

```js
{
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential", // 安装 eslint-config-vue, essential 是其中的一个配置名
    "airbnb-base", // 安装 eslint-config-vue, airbnb-base 是其中的一个配置名
  ]
}

```

## 提交时修复

[pre-commit 详情](https://juejin.cn/post/7007419705543622669#heading-27)
