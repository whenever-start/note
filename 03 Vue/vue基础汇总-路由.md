# vue 路由

> [官网](https://router.vuejs.org/zh/installation.html)

[toc]

## 安装与初始文件

```shell
npm install vue-router
```

```js
// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

new Vue({
  router, // 添加router选项
  render: h => h(App),
}).$mount('#app')
```

```js
// router/components.js
// 路由懒加载
// @ === src
// 首页在 router/index.js 中导入, 不需要懒加载

// 歌单
const PGSonglist = (resolve) => {
    import('@/pages/PGSonglist.vue').then((module) => {
        resolve(module)
    })
}

// 主播电台
const PGRadio = (resolve) => {
    import('@/pages/PGRadio.vue').then((module) => {
        resolve(module)
    })
}

// 最新音乐
const PGLatestMusic = (resolve) => {
    import('@/pages/PGLatestMusic.vue').then((module) => {
        resolve(module)
    })
}

// 歌手
const PGSinger = (resolve) => {
    import('@/pages/PGSinger.vue').then((module) => {
        resolve(module)
    })
}

export { PGSonglist, PGRadio, PGLatestMusic, PGSinger }
```

```js
// router/index.js
// 路由

// 导入 vue 和 vue-router
import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import PGFindMusic from '../pages/PGFindMusic.vue' // 首页, 直接导入
import {  PGSonglist, PGRadio, PGLatestMusic, PGSinger } from '../router/components.js'

// 使用 vue-router
Vue.use(Router)

// 路由设置
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { // 发现音乐
            path: '/',
            name: 'PGFindMusic',
            component: PGFindMusic
        },
        { // 个性推荐
            path: '/findmusic/commend',
            redirect: '/'
        },
        { // 歌单
            path: '/findmusic/songlist',
            name: 'songlist',
            component: PGSonglist
        },
        { // 主播电台
            path: '/findmusic/radio',
            name: 'radio',
            component: PGRadio
        },
        { // 最新音乐
            path: '/findmusic/latest-music',
            name: 'latest-music',
            component: PGLatestMusic
        },
        { // 歌手
            path: '/findmusic/singer',
            name: 'singer',
            component: PGSinger
        },
    ]
})
```

## 路由传参

> [入门指南](https://zhuanlan.zhihu.com/p/26003077)
[参数](https://juejin.im/post/5b0281b851882542845257e7#heading-7)

```html
<!-- path <==> query -->
<!-- query: /login?name=abc&&psw=123 -->
<router-view :to="{path: '/login', query: {...}}"></router-view>

<!-- name <==> params -->
<!-- params 刷新会丢失 -->
<router-view :to="{name: 'login', params: {...}}"></router-view>
```
