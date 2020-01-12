const actions  = {
    getList:({commit,state})=>{
        commit('getList');
    },
    createIcon:({commit,state},data)=>{
        commit("createIcon",data);
    },
    showLayer:({commit,state})=>{
    commit("showLayer");
    },
    hideLayer:({commit,state})=>{
    commit("hideLayer");
    },
    hideMsg:({commit,state})=>{
    commit("hideMsg");
    },
};
export default actions;
