import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/001.vue'// 管理全站栏目
import tabManage from './views/column/032/index.vue'// 管理全站栏目
import factoryProduce from './views/column/033/index.vue'// 管理企业简介
import banner from './views/column/031/index.vue'// 管理企业简介
import school from './views/column/024/index.vue'// 管理企业简介
import product from './views/column/023/index.vue'// 管理企业简介
import proTemplate from './views/column/022/index.vue'// 管理企业简介
import proInstr from './views/column/021/index.vue'// 管理企业简介
import editProduce from './views/column/033/components/editProduce.vue'// 管理全站栏目
import editProlnstr from './views/column/021/components/editProlnstr'// 管理全站栏目
import addTab from './views/column/032/components/addTab'// 管理全站栏目
import addBanner from './views/column/031/components/addBanner'// 管理全站轮播
import addSchool from './views/column/024/components/addSchool'// 管理全站栏目
import addProduct from './views/column/023/components/addProduct'// 管理全站栏目
import addProTemplate from './views/column/022/components/addProTemplate'// 管理全站栏目
import addProInstr from './views/column/021/components/addProInstr'// 管理全站栏目

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
      path: '/021',
      component: proInstr
    },
    {
      path: '/022',
      component: proTemplate
    },
    {
      path: '/023',
      component: product
    },
    {
      path: '/024',
      component: school
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
      path: '/addSchool',
      component: addSchool
    },
    {
      path: '/addProduct',
      component: addProduct
    },
    {
      path: '/addProInstr',
      component: addProInstr
    },
    {
      path: '/addProTemplate',
      component: addProTemplate
    },
    {
      path: '/editProduce',
      component: editProduce
    },
    {
      path: '/editProlnstr',
      component: editProduce
    },
    {
      path: '/001',
      component: manage
    }
  ]
}
