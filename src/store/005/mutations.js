import axios from 'axios';
const mutations = {
    getList(state){
        console.log(state.formInline);
        axios.get('/call/icon/getList', {
            params: {}
        })
            .then(function (response) {
                let reqData = response.data;
                if(reqData.responseObject.responseData['data_list']){
                    state.tableData = reqData.responseObject.responseData['data_list'];
                }
                /*if(reqData.responseObject.responseData.totalCount){
                    //t.count = reqData.responseObject.responseData.totalCount;
                }*/
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    createIcon(state,data){
        console.log(data);
        let t = this;
        axios({
            method: 'post',
            url: '/call/icon/create',
            transformRequest: [function(data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
                iconName:data.iconName
            }
        }).then(function(response) {
            let reqData = response.data;
            state.addMessage = true;
            if(reqData.responseObject.responseStatus){
                state.message = reqData.responseObject.responseMessage;
                state.messageType = 'success';
                state.dialogVisible = false;
                mutations.getList(state);
            }else{
                state.message = reqData.responseObject.responseMessage;
                state.messageType = 'warning';
            }
            console.log(response.data);
        });
    },
    showLayer(state){
        state.dialogVisible = true;
    },
    showRejectWarn(state){
        state.rejectWarn = true;
    },
    hideRejectWarn(state){
        state.rejectWarn = false;
    },
    showPassDialog(state){
        state.passDialog = true;
        console.log('触发');
    },
    hidePassDialog(state){
        state.passDialog = false;
    },
    hideLayer(state){
        state.dialogVisible = false;
    },
    hideMsg(state){
        state.addMessage = false;
    }
};
export default mutations;
