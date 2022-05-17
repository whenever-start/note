# vue 简介

什么是 `vue`? 一套用于构建用户界面的渐进式 `JavaScript` 框架
渐进: 简单应用, 只需要一个简单小巧的核心库. 复杂应用, 可以引入 `vue` 插件.

## `vue` 特点

1. 组件化: 提高复用率, 更好维护.
2. 声明式: 无需直接操作 `DOM` , 提高开发效率.

   - 命令式

     ```js
     let htmlStr = '
     persons.forEach(p => {
       htmlStr += `<li>${p.id} - ${p.name} - ${p.age}</li>`
     })
     let list = document.getElementById('list')
     list.innerHTML = htmlStr
     ```

   - 声明式

     ```html
     <ul id="list">
       <li v-for="p in persons">{{p.id}} - {{p.name}} - {{p.age}}</li>
     </ul>
     ```

3. 虚拟 `DOM` + `Diff` 算法: 尽量复用 `DOM` 节点.

## 掌握知识

- ES6 语法规范
- ES6 模块化
- 包管理器
- 原型、原型链
- 数组常用方法
- `axios`
- `promise`
