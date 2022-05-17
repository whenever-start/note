# this 指向

[深入理解 js this 绑定 ( 无需死记硬背，尾部有总结和面试题解析 )](https://segmentfault.com/a/1190000011194676)

[彻底搞懂 JavaScript 中的 this 指向问题](https://zhuanlan.zhihu.com/p/42145138)

[this 指向及改变 this 指向的方法](https://blog.csdn.net/xuehangongzi/article/details/80841167)

1. this 永远指向一个对象；
2. this 的指向完全取决于函数调用的位置；

`this` 指向一个对象，谁调用就指向谁。

```js
function fun(){
    console.log(this.s);
}
​
var obj = {
    s:'1',
    f:fun
}
​
var s = '2';
​
obj.f(); //1
fun(); //2
```

```js
var A = {
    name: '张三',
    f: function () {
        console.log('姓名：' + this.name);
    }
};
​
var B = {
    name: '李四'
};
​
B.f = A.f;
B.f()   // 姓名：李四
A.f()   // 姓名：张三
```

```js
function foo() {
  console.log(this.a)
}
var obj2 = {
  a: 2,
  fn: foo
}
var obj1 = {
  a: 1,
  o1: obj2
}
obj1.o1.fn() // 2
```

```js
var name = 222
var a = {
  name: 111,
  say: function () {
    console.log(this.name)
  }
}

var fun = a.say
fun() // 222
a.say() // 111

var b = {
  name: 333,
  say: function (fun) {
    fun()
  }
}

b.say(a.say)
b.say = a.say
b.say()
```
