import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import module001 from './001/index'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    module001
  }
})
