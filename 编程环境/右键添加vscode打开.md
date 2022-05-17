# 右键添加 vscode 打开

[Win10-VSCode-添加至右键菜单](https://juejin.cn/post/7028823525125259272)
[win10 鼠标右键拓展（使用 vs Code 打开）](https://blog.csdn.net/bigbear00007/article/details/90705038)

1. 新建 `.reg` 文件
2. 用编辑器打开, 并复制以下代码

   ```shell
   Windows Registry Editor Version 5.00

   [HKEY_CLASSES_ROOT\Directory\shell\VSCode]
   @="Open with Code"
   "Icon"="C:\\Program Files\\Microsoft VS Code\\Code.exe"

   [HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
   @="\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%V\""
   ```

3. 修改地址, 比如:

   ```shell
   C:\\Users\\fxf\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe
   ```

4. 然后双击 `.reg` 文件注册即可
