# Object.defineProperty

绑定数据原理

```js
let person = {
  name: '张三',
  sex: '男'
}
```

```js
Object.defineProperty(person,'age',{
  value: 18, // 定义 age 的值
  enumerable: true, // 是否可枚举, 默认 false
  writable: true, // 是否可被修改, 默认 false
  configurable: true, 是否可被删除, 默认 false

  get(){
    return number
  },
  set(value){
    number = value
  }
})
```
