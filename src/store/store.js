import  Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex);
import state from './state.js';
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import module001 from './001/index';
import module002 from './002/index';
import module003 from './003/index';
import module004 from './004/index';
import module005 from './005/index';
import module006 from './006/index';
import module007 from './007/index';
import module008 from './008/index';
import module009 from './009/index';
import module010 from './010/index';
import module011 from './011/index';
import module012 from './012/index';
import module013 from './012/index';
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        module001,
        module002,
        module003,
        module004,
        module005,
        module006,
        module007,
        module008,
        module009,
        module010,
        module011,
        module012,
        module013
    }
});
