# cookie

## 用途

- 对话（`session`）管理：保存登录、购物车等需要记录的信息。
- 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪用户：记录和分析用户行为。

## 限制

- 单个 cookie 一般不超过 4kb
- 同个域名设置 cookie 不应超过 30 个
- 每次会随着 `http` 请求发送到服务器

## HTTP 与 cookie

`cookie` 由 `HTTP` 生成, 也主要由 `HTTP` 使用

HTTP 响应

```http
Set-Cookie:foo=bar
```

服务器想改变 cookie 值, 需要 `key` `域名` `路径` `协议` 都相同

浏览器向服务器发送请求

```http
Cookie: name=value; name2=value2; name3=value3
```

多个 cookie 用 `;` 分隔

## 读写 document.cookie

```js
// 一次只能写一个, 多个是添加不是覆盖
document.cookie = 'fontSize=14'
document.cookie = 'test2=world'

// 设置其它属性
document.cookie = 'foo=bar; expires=Fri, 31 Dec 2020 23:59:59 GMT'
```

- `path` 属性必须为绝对路径，默认为当前路径。
- `domain` 属性值必须是当前发送 `Cookie` 的域名的一部分。比如，当前域名是 `example.com`，就不能将其设为 `foo.com`。该属性默认为当前的一级域名（不含二级域名）。
- `max-age` 属性的值为秒数。
- `expires` 属性的值为 `UTC` 格式，可以使用 `Date.prototype.toUTCString()`进行日期格式转换。

删除 cookie 唯一方法, 将期限设置为过去

```js
document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT'
```

## 封装 cookie

[cookie (本地)](../../utils/cookie.js)

```js
/**
 * cookie.set('test','hello',365)
 * cookie.get('test')
 * cookie.remove('test')
 * 注: 若没有设置 key 值, cookie.get() 返回 null
 */
export default cookie = {
  // 默认 30 天
  set(name, value, day = 30) {
    const timestamp = day * 1000 * 3600 * 24 + new Date().getTime()
    const expires = new Date(timestamp).toUTCString()

    // encodeURIComponent 对 空格 / . 等等进行转码
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires}`
  },
  // 如果没有找到, 则返回 null
  get(name) {
    const cookies = document.cookie.split('; ')
    let str = cookies.find((item) => item.split('=')[0] === name)
    return str ? decodeURIComponent(str.split('=')[1]) : null
  },
  remove(name) {
    this.set(name, '', -1)
  }
}
```

用 cdn 资源时

```html
<!-- 加上 crossorigin="anonymous" 请求时可以不用发送 cookie -->
<link crossorigin="anonymous" href="..." />
<script crossorigin="anonymous" ...></script>
```
