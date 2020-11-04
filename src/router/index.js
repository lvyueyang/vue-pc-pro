import Vue from 'vue'
import Router from 'vue-router'
import util from '@/utils'

Vue.use(Router)

import Home from '../views/home/index.vue'

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
      },
      component: Home
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 从第二页返回首页时savedPosition为undefined
    if (savedPosition || typeof savedPosition === 'undefined') {
      // 只处理设置了路由元信息的组件
      from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : false
      to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : true
      if (savedPosition) {
        return savedPosition
      }
    } else {
      from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : true
      to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : false
    }
  }
})

// 后置
router.afterEach((to) => {
  util.setTitle(to.meta.title)
})
export default router
