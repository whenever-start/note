# router-link

## 属性

### `to`

相当于 `a` 链接的 `href`

```html
<!-- 1. to 字符串 -->
<router-link to="/">相当于 a 连接</router-link>

<!-- 2. 表达式 -->
<router-link :to="{ path: '/home' }">Home</router-link>

<!-- 3. name-params -->
<router-link :to="{ name: 'user', params: { userId: '123' }}">User</router-link>

<!-- 4. path-query -->
<router-link :to="{ path: '/register', query: { plan: 'private' }}">
  Register
</router-link>
```

### `active-class`

是链接被激活时的样式(类名)。

```html
<router-link to="/a" active-class="active">a链接</router-link>
```

当路径为 `/a` 时，该元素会被添加 `active` 类名，并且，当路径为 `/a/b` 时, 也一样。

### `exact-active-class`

与 `active-class` 的区别是，`/a/b` 不会激活。

### replace

正常的路由跳转调用的是 `router.push()`，`replace` 属性则是调用 `router.replace()`
