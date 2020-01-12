import axios from 'axios';
const mutations = {
    getList(state){
        console.log(state.formInline);
        axios.get('/api/icon/query', {
            params: {}
        })
            .then(function (response) {
                let reqData = response.data;
                if(reqData){
                    state.tableData = reqData;
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
            url: '/api/icon/insert',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
                banner:'',
                createAdmin:localStorage.getItem("adminId"),
                name:data.iconName
            }
        }).then(function(response) {
            let reqData = response.data;
            state.addMessage = true;
            console.log(reqData);
            if(parseInt(reqData.code,10)===200){
                state.message = '添加成功';
                state.messageType = 'success';
                state.dialogVisible = false;
                mutations.getList(state);
            }else{
                state.message = "添加失败";
                state.messageType = 'warning';
            }
            console.log(response.data);
        });
    },
    showLayer(state){
        state.dialogVisible = true;
        console.log(state.dialogVisible)
    },
    hideLayer(state){
        state.dialogVisible = false;
    },
    hideMsg(state){
        state.addMessage = false;
    }
};
export default mutations;
