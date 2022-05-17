# 使用 github pages 部署项目

[toc]

## 静态项目

> [使用 github pages, 快速部署你的静态网页](https://zhuanlan.zhihu.com/p/38480155)

1. 进入[github](https://github.com/)

2. 前往 github 官网, 点击 New repository 创建新项目. 填入项目基本信息, 点击 Create Repository 确认.

3. 确认完成后会进入新页面，将本地项目 `push` 到 `github` 上,接着 点击 `settings`

4. 往下滚动, 找到 `Github Pages` 选项, 将 `Source` 改为 `master branch`, 最后点击 `Save` 按钮

## vue 项目

> [Vue 项目打包部署到 GitHub Pages](https://blog.csdn.net/weixin_44670973/article/details/107130231)

### 准备

- 关于 Vue 项目的 `publicPath`

  - 如果你打算发布到 `https://.github.io/`，则可以省略这一步，因为 publicPath 默认即是 “/”。
  - 如果你打算发布到 `https://.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `publicPath` 设置为 “`/<REPO>/`”。

- 项目 `push` 到 `github`
- `.gitignore` 中的 `/dist` 取消

### 部署

1. `npm run build` 将项目打包到 `dist` 文件夹
2. `push` 项目

   ```shell
   git add .
   git commit -m "dist"
   git push
   ```

3. 使用 `git subtree push --prefix dist origin gh-pages` 将 `dist` 目录推送到远程的 `gh-pages` 分支，若远程没有 `gh-pagse` 分支则会新建 `gh-pagse` 分支然后再推送。

   ```shell
   git subtree push --prefix dist origin gh-pages
   ```

4. 登录远程 `GitHub` 仓库，通过 `setting -> github pages -> source` 将 `gh-pages` 设置为 `GitHub pages` 的 `source` (如果默认已经是则可不用)
5. 如果点进网页出现 `404`, 等一会再试试
6. 修改: 每次执行 `npm run build` 后再次执行步骤 2，步骤 3

**注意: 如果使用了 `vue-router`后出现 `404`, 可暂时不要 `history` 模式, 改用默认的 `hash` 模式**
