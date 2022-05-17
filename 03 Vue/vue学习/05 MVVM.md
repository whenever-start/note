# MVVM

M: 模型(`Model`), 对应 `data` 中的数据
V: 视图(`View`), 页面
VM: 视图模型(`ViewModel`), `vue` 实例对象

![MVVM](https://012.vuejs.org/images/mvvm.png)

- `data` 中的属性, 全都出现在 `vm`上
- `{{name}}` 胡子语法可以直接访问 `vm` 上的数据, 包括 `prototype` 中的属性和方法.
