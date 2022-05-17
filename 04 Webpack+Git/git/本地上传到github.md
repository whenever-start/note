# 本地项目上传到 github

[(图文并茂）将本地项目上传到 GitHub](https://segmentfault.com/a/1190000022272311)

[Git 详细安装教程（详解 Git 安装过程的每一个步骤）](https://blog.csdn.net/mukes/article/details/115693833)

1. 本地仓库：
   a. `git init` 在本地创建一个 `Git` 仓库；
   b. `git add` . 将项目添加到暂存区；
   c. `git commit -m` "注释内容" 将项目提交到 `Git` 仓库；

2. 远程仓库：
   a. 添加 `SSH KEY`；
   b. 新建 `repositories；`

3. 本地仓库：
   a. `git remote add origin git@github.com:UserName/projectName.git` 将本地仓库与远程仓库关联；
   b. `git push -u origin master` 将本地项目推送到远程仓库。
