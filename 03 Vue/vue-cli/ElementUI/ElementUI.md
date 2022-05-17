# ElementUI

> [Element](https://element.eleme.cn/#/zh-CN/component/installation)

安装

```bash
npm i element-ui -S
```

引入

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

**_按需引入_**

```bash
npm install babel-plugin-component -D
```

```js
// .babelrc
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

或最新的 `babel.config.js`

```js
// babel.config.js
{
  "presets": [["@babel/preset-env", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

```js
import { Button, Select } from 'element-ui'

Vue.use(Button)
Vue.use(Select)
```
