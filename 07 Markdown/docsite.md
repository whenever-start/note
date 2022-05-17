# docsite

> [DOCSITE](https://docsite.js.org/zh-cn/docs/installation.html)

## 安装

```bash
# 第一步
docsite init

# 第二步: 如果成功, 会打开 127.0.0.1:8080 服务器
docsite start
```

`docsite init` 会生成一系列文件和文件夹

## 问题

1. `docsite init` 后一些文件下载失败, 删掉 `node_modules`, 并使用 `cnpm init` 重新下载

2. 出现 `primordials is not defined` 问题. 原因是 `gulp` 和 `node` 版本不兼容, 需要 `gulp` 升级或 `node` 降级. 如果都不想:

   ```json
   // package.json
   "scripts": {
     "preinstall": "npx npm-force-resolutions"
   },
   "resolutions": {
     "graceful-fs": "4.2.3"
   }
   ```

   然后删掉 `node-modules` 重新 `cnpm init`. [详情查看](https://www.freesion.com/article/9268831145/)
