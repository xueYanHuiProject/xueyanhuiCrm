import Vue from 'vue'
import VueDND from 'awe-dnd'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import store from './store/store.js'
import './css/base.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './static/iconfont/iconfont.css'
import 'swiper/dist/css/swiper.css'
import App from './app.vue'
import routerConfig from './router'
Vue.use(VueDND)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)
const router = new VueRouter(routerConfig)
/*eslint-disable*/
new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})
/*eslint-disable*/
