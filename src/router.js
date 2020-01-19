import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/001.vue'// 管理全站栏目
import tabManage from './views/column/032/index.vue'// 管理全站栏目
import factoryProduce from './views/column/033/index.vue'// 管理企业简介
import banner from './views/column/031/index.vue'// 管理企业简介
import editProduce from './views/column/033/components/editProduce.vue'// 管理全站栏目
import addTab from './views/column/032/components/addTab'// 管理全站栏目
import addBanner from './views/column/031/components/addBanner'// 管理全站栏目

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
      path: '/032',
      component: tabManage
    },
    {
      path: '/033',
      component: factoryProduce
    },
    {
      path: '/031',
      component: banner
    },
    {
      path: '/addTab',
      component: addTab
    },
    {
      path: '/addBanner',
      component: addBanner
    },
    {
      path: '/editProduce',
      component: editProduce
    },
    {
      path: '/001',
      component: manage
    }
  ]
}
