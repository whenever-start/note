# axios

[axios github](https://github.com/axios/axios)

引用

```html
<!-- bootCdn -->
<!-- prettier-ignore -->
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js"></script>
```

```shell
npm i axios -S
```

```js
import axios from 'axios'
```

```js
// get
axios.get(url).then()

// get 参数 + 配置
axios.get(url, {
  params: {},
  // 其它配置
  responseType: 'json'
})

// post
axios.post(url, { name: 'xxx', age: 11 }, config).then()

// 通用配置
axios({
  method: '',
  url: '',
  data: {},
  responseType: ''
  // ...
})

// URL + 配置
axios(url, config)

// 默认 url
axios.defaults.URL = 'http://xxx.com'
```
