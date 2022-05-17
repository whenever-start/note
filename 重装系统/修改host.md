# 修改 `host`

[解决 github 访问下载速度慢，vue 官网访问速度慢](https://blog.csdn.net/qwe435541908/article/details/86712315)

1. 在浏览器中打开 `ping` 检测网站 `http://ping.chinaz.com/`
2. 输入 `github` 网站地址 `github.com`
3. 找出 `ping` 速度最快的 `ip`
4. 接着我们打开本地电脑的 `C:\Windows\System32\drivers\etc` 目录，找到 `hosts` 文件
5. 在末尾添加 `ip` `github.com` （例如：`192.30.253.113` `github.com`）

修改 `host` 文件

打开 `host` 所在目录, 将文件拖到桌面, 再在编辑器打开并修改, 然后再将文件放回原位置, 应当备份 `host` 文件
