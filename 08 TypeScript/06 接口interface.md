# TS 接口 interface

## 与 `type` 比较

- 基本与 `type` 相似
- 区别: `type` 不可以重复声明同一个变量, `interface` 重复声明同一个变量相当于合并

```ts
type Person = {
  name: string
  age: number
}

const obj: Person = {
  name: 'abc',
  age: 11
}

interface myInterface {
  name: string
  age: number
}

// 重复声明 myInterface 相当于合并
// 如果有 name: number 会报错, 和 name:string 冲突
interface myInterface {
  gender: number
}
const o: myInterface = {
  name: 'abc',
  age: 11,
  gender: 0
}
```

## 用于类中

- 与抽象类对比: 抽象类中数据和方法可以抽象也可以具体, `interface` 中必须是抽象的
- 用法: `interface myInterface {}` (与 `class` 用法相似)
- 使用 `implements` 关键字来实现 `class Animal implements myInterface {}`
- 类中必须拥有接口的全部属性和方法

```ts
// 属性和方法不能有具体值, 必须都仅是 type 限定
interface animalInterface {
  name: string
  age: number
  say(): void
}

// class 中必须包括接口中的所有属性和方法, 且类型符合
// 用 implements(实现) 实现
class Animal implements animalInterface {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  say(): void {
    console.log('hello')
  }
}
```
