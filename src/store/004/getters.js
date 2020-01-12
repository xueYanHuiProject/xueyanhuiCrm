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
    rejectWarn(state){
        return state.rejectWarn;
    },
    passDialog(state){
        return state.passDialog;
    },
    message(state){
        return state.message;
    },
    messageType(state){
        return state.messageType;
    }
};
export default  getters;
