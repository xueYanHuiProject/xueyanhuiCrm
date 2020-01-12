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
    showBlackWarn:({commit,state})=>{
    commit("showBlackWarn");
    },
    hideBlackWarn:({commit,state})=>{
    commit("hideBlackWarn");
    },
    hideLayer:({commit,state})=>{
    commit("hideLayer");
    },
    hideMsg:({commit,state})=>{
    commit("hideMsg");
    },
};
export default actions;
