import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/001.vue'// 管理全站栏目
import tabManage from './views/column/033/index.vue'// 管理全站栏目
import addTab from './views/column/033/components/addTab'// 管理全站栏目

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
    {
      path: '/033',
      component: tabManage
    },
    {
      path: '/addTab',
      component: addTab
    },
    {
      path: '/001',
      component: manage
    }
  ]
}
