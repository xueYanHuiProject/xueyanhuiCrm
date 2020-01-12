const  getters = {
    tableData(state){
        return state.tableData;
    },
    addMessage(state){
        return state.addMessage;
    },
    dialogVisible(state){
        return state.dialogVisible;
    },
    message(state){
        return state.message;
    },
    messageType(state){
        return state.messageType;
    }
};
export default  getters;
