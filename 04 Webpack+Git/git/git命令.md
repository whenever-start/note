# git 命令

> [git 命令大全](https://www.jianshu.com/p/46ffff059092)

[toc]

## 本地项目 -> github

**第一次:**

```shell
git init
git add .
git commit -m "更新信息"

# git remote add: 添加远程地址
# origin: 为项目别名, 后面加项目地址
# 最后为 github 中新建的 repository 的地址
git remote add origin https://github.com/账号名/项目名.git

# 发布到仓库
# -u(绑定) origin(项目别名) 为 master(主分支)
git push -u origin master
```

**_使用令牌登录_**

上面的最后一步 `git push -u origin master` 失败, 需要使用令牌

```shell
git remote set-url https://令牌@github.com/用户名/项目名.git
```

**令牌生成**([如何修复对密码身份验证的支持已在 GitHub 上删除](https://levelup.gitconnected.com/fix-password-authentication-github-3395e579ce74))

1. 点击 `github` 个人资料图标 -> 单击设置(`settings`)
2. 在新页面中, 拉到部, 点击左侧的 `Developer settings`(开发人员设置)
3. 新页面中, 左侧点击 `Personal access tokens`(个人访问令牌)
4. 点击右侧的 `Generate new token` (生成新令牌)
5. 在新页面中, `Note` 中添加说明, 并在下方选择期限,权限选择: `repo` `admin:repo_hook` 和 `delete_repo`
6. 点击下方的 `Generate token` 按钮生成新令牌
7. 新页面中复制新令牌并保存好(离开页面后无法再访问令牌)

**后续更新代码:**

```shell
git add 要提交的文件
# 或
git add .

git commit -m "更新信息"

git push
```

## github 项目 -> 本地项目 (克隆)

```shell
git clone 项目地址
```

已有这个项目,但是代码不同

```shell
# 同步代码
git pull
```

## 其他常见命令

```shell
# 删除
git rm 文件名

# 删除 remote
# origin 为该 remote 的别名
git remote rm origin
# 查询所有的 remote
git remote -v
```
