import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/001.vue'// 管理全站栏目

export default {
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '*',
      component: index
    },
    /* {
            path:"/011",
            component: Tabid1
        }, */
    {
      path: '/001',
      component: manage
    }
  ]
}
