import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/index'// 管理全站栏目
import feedBack from './views/column/002/index'// 管理全站栏目
import replyFeedBack from './views/column/002/components/replyFeedBack'// 管理全站栏目
import tabManage from './views/column/032/index.vue'// 管理全站栏目
import factoryProduce from './views/column/033/index.vue'// 管理企业简介
import banner from './views/column/031/index.vue'// 管理企业简介
import password from './views/column/053/index.vue'// 管理企业简介
import publish from './views/column/013/index.vue'// 管理企业简介
import machine from './views/column/012/index.vue'// 管理企业简介
import school from './views/column/024/index.vue'// 管理企业简介
import demand from './views/column/003/index.vue'// 管理企业简介
import invoice from './views/column/004/index.vue'// 管理企业简介
import replyDemand from './views/column/003/components/replyDemand.vue'// 管理企业简介
import upLoadResult from './views/column/011/components/UpLoadResult.vue'// 管理企业简介
import upLoadInvoice from './views/column/004/components/UpLoadResult.vue'// 管理企业简介
import product from './views/column/023/index.vue'// 管理企业简介
import integral from './views/column/025/index.vue'// 管理企业简介
import coupon from './views/column/026/index.vue'// 管理企业简介
import addIntegral from './views/column/025/components/addIntegral'// 管理企业简介
import addCoupon from './views/column/026/components/addCoupon'// 管理企业简介
import order from './views/column/011/index.vue'// 管理企业简介
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
import editSample from './views/column/021/components/editSample'// 管理全站栏目
import admin from './views/column/052/index'// 管理全站栏目
export default {
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/011',
      component: order
    },
    {
      path: '/upLoadResult',
      component: upLoadResult
    },
    {
      path: '/upLoadInvoice',
      component: upLoadInvoice
    },
    {
      path: '/021',
      component: proInstr
    },
    {
      path: '/052',
      component: admin
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
      path: '/053',
      component: password
    },
    {
      path: '/013',
      component: publish
    },
    {
      path: '/012',
      component: machine
    },
    {
      path: '/003',
      component: demand
    },
    {
      path: '/004',
      component: invoice
    },
    {
      path: '/replyDemand',
      component: replyDemand
    },
    {
      path: '/addCoupon',
      component: addCoupon
    },
    {
      path: '/026',
      component: coupon
    },
    {
      path: '/025',
      component: integral
    },
    {
      path: '/032',
      component: tabManage
    },
    {
      path: '/002',
      component: feedBack
    },
    {
      path: '/replyFeedBack',
      component: replyFeedBack
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
      path: '/addIntegral',
      component: addIntegral
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
      path: '/editSample',
      component: editSample
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
      component: editProlnstr
    },
    {
      path: '/001',
      component: manage
    }
  ]
}
