# vscode

[toc]

## 插件

> [VS Code 插件推荐合集](https://blog.csdn.net/maixiaochai/article/details/90767129) > [VScode 插件推荐（全面）](https://www.jianshu.com/p/3eebde5748a6) > [VScode 使用比较好的插件推荐](https://blog.csdn.net/weixin_44514665/article/details/103288259)

### setting sync

**_注意: 几乎每次使用前都要先重新设置 `token`_**

[VSCode 使用 Settings Sync 同步配置(最新版傻瓜教程)](https://blog.csdn.net/qq_34846662/article/details/99476862)

用 `shift+alt+u` 上传时提示令牌(token)无效或过期，需要重新生成`token`

[重新生成 token 的 github 链接](https://github.com/settings/tokens)

[token 过期教程(Invalid / Expired GitHub Token)](https://segmentfault.com/a/1190000011206401)

**注意:**

1. 命名，如 VSC settings sync
2. 选择期限，如 7 天、30 天等，过了这段时间令牌过期，再用时需要重新生成
3. 使用范围选择 `gist`

![Snipaste_2021-09-06_02-46-23.jpg](http://ww1.sinaimg.cn/mw690/006EgRKPgy1gu6bwi8yd3j60g006tq3802.jpg)

![Snipaste_2021-09-06_02-46-58.jpg](http://ww1.sinaimg.cn/mw690/006EgRKPgy1gu6bxakoxej60bq02r3yj02.jpg)

修改完 `token` 后， `ctrl+shift+p` -> 高级选项(或 Advanced Options) -> 在新打开的编辑文件中找到 `token` 选项，复制生成的 `token`

**快捷键:**

`ctrl + shift + p`： 打开环境设置
`shift + alt + d`： 下载设置
`shift + alt + u`： 上传设置

id: 在 `pw`

## 快捷键

**`shift+alt+i`：选择多行同时编辑。相当于 `alt+鼠标左键`**
**`alt+ 左/右箭头`：回到上/下一个位置（可以配合 `转到定义` 后使用）。**
**`ctrl+k` + `ctrl+0`: 关闭所有区域的折叠.**
**`ctrl+k` + `ctrl+j`: 打开所有区域的折叠.**
`ctrl+k` + `ctrl+s`： 打开快界面设置面板
`ctrl+p`： (输入文件名)打开文件, 区别于 `ctrl+p` (少了一个 `>`)
`ctrl+\`： 拆分编辑器,(选择： 查看->编辑器布局->2x2 布局, 可以"田"字布局)
`ctrl+b`： 关闭侧边栏(文件, 插件所在的侧边栏)
`ctrl+j`： 合并同一行(需要自己打开快捷键设置面板自己设置)
`ctrl+shift+[`： 折叠代码
`ctrl+shift+]`： 展开代码
`ctrl+d`： 选中单词, 依次选中文件中相同的单词
`ctrl+g`： 在打开的输入框中输入行数, 自动跳转到该行(处理报错的时候有用)
`ctrl+shift+o`： 在打开的输入框中输入【方法名, 类, 属性】,跳转到该处
`ctrl+t`： 与 `ctrl+shift+o` 相似, 不同在于这个是全局. **_技巧：_** 选中文件中的方法名, 输入快捷键会自动跳到所在文件对应位置
`ctrl+退格键`： 删除鼠标处单词(`ctrl+shift+←`能够选中的内容)

### 设置方向键快捷键

```json
{
    "key": "alt+j",
    "command":"cursorLeft",
    "when": "textInputFocus"
},
{
    "key": "alt+l",
    "command":"cursorRight",
    "when": "textInputFocus"
},
{
    "key": "alt+i",
    "command":"cursorUp",
    "when": "textInputFocus"
},
{
    "key": "alt+k",
    "command":"cursorDown",
    "when": "textInputFocus"
}
```

## 自动保存

设置 - 找到 `在 settings.json 中编辑` - 点击并打开

![Snipaste_2021-11-03_02-20-35.jpg](http://tva1.sinaimg.cn/mw690/006EgRKPgy1gw1d3v5bqoj30hf0bwdgy.jpg)

`editor.defaultFormatter` 设置格式化的方式
在下方添加文件类型
