# vscode 自定义主题颜色

> [VSCode 自定义配色方案](https://www.bbsmax.com/A/gGdXnBGYJ4/)

[VSCode 界面配色、字体颜色 - 颜值即生产力 主题颜色](https://www.bilibili.com/video/BV165411p76K?spm_id_from=333.337.search-card.all.click)

[自定义修改 visual studio code 主题色，附绿色主题](https://blog.csdn.net/dscn15848078969/article/details/107578108)

打开 `settings.json`

```js
"editor.tokenColorCustomizations": {
    "[Atom Material Theme]": {
        "comments": "#50fa7b", // 注释颜色
        "textMateRules": [
            {
                "name": "Function", // 函数名颜色
                "scope": [
                    "entity.name.function",
                    "support.function"
                ],
                "settings": {
                    "foreground": "#50fa7b"
                }
            },
        ]
    }
},
```
