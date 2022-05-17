# nvm

[关于 Node.js 版本管理工具，这一篇即学即用~](https://juejin.cn/post/6984984068924375076#heading-4)

1. [下载安装包](https://github.com/coreybutler/nvm-windows/releases/tag/1.1.9)
2. 安装 `nvm`
3. 安装后验证: `cmd` 输入 `nvm`
4. 常用命令

   ```shell
   # 查看有哪些版本
   nvm list
   # 安装指定版本
   nvm install 14.17.1
   # 切换指定版本
   nvm use [version]
   # 卸载
   nvm uninstall 14.17.1
   # 镜像源
   nvm node_mirror http://npm.taobao.org/mirrors/node/
   nvm npm_mirror https://npm.taobao.org/mirrors/npm/
   # 恢复
   nvm node_mirror
   nvm npm_mirror
   ```
