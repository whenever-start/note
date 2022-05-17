# NavMenu 导航菜单

> [NavMenu 导航菜单](https://element.eleme.cn/#/zh-CN/component/menu)

```js
import { Menu, Submenu, MenuItem } from 'element-ui';

Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
```

效果图

![img](http://tva1.sinaimg.cn/large/006EgRKPgy1gxtaasjep3j306m0ie3yh.jpg)

```html
<template>
  <div class="test">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      @select="handleSelect"
    >
      <el-submenu
        v-for="item in categories"
        :key="item.title"
        :index="item.title"
      >
        <template #title>{{ item.title }}</template>

        <el-menu-item
          v-for="subItem in item.children"
          :key="subItem.title"
          :index="subItem.title"
          >{{ subItem.title }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      categories: [
        {
          title: '目录1',
          children: [
            {
              title: '文章1',
              link: '/'
            },
            {
              title: '文章2',
              link: '/'
            },
            {
              title: '文章3',
              link: '/'
            },
            {
              title: '文章4',
              link: '/'
            },
            {
              title: '文章5',
              link: '/'
            },
            {
              title: '文章6',
              link: '/'
            }
          ]
        },
        {
          title: '目录2',
          children: [
            {
              title: '文章7',
              link: '/'
            },
            {
              title: '文章8',
              link: '/'
            },
            {
              title: '文章9',
              link: '/'
            }
          ]
        },
        {
          title: '目录3',
          children: [
            {
              title: '文章10',
              link: '/'
            },
            {
              title: '文章11',
              link: '/'
            },
            {
              title: '文章12',
              link: '/'
            },
            {
              title: '文章13',
              link: '/'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.test {
  width: 230px;
}
</style>

```