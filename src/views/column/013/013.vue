<template>
    <section class="adminContentContainer adminContentContainer005">
        <section class="adminContentInner">
            <HandleForm @getTableList="getTableList"></HandleForm>
            <TableList :tableList="tableList" @selectTable="selectTable"></TableList>
            <Pagination @changePage="changePage" :count="totalCount" :pageIndex="pageNum" :pageSize="pageSize"></Pagination>
            <ControlModule :selectOnOff="selectOnOff" :selectTableData="selectTableData" @getTableList="getTableList"></ControlModule>
        </section>
        <DetailLayer></DetailLayer>
        <RejectWarn></RejectWarn>
        <PassDialog></PassDialog>
        <Recommend></Recommend>
        <EditPanel></EditPanel>
    </section>
</template>
<!--管理员:admin-->
<script>
    const xhrUrl = {
        getList:"/api/admin/select"
    };
    import HandleForm from './components/handleForm';
    import TableList from './components/tableList';
    import Pagination from './components/pagination';
    import ControlModule from './components/controlModule';
    import axios from 'axios';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module013');
    export default {
        data(){
            return {
                name:'admin',
                pageNum:1,
                pageSize:20,
                totalCount:0,
                tableList:[],
                selectOnOff:false,
                selectTableData:{}
            }
        },
        components:{
            HandleForm,
            Pagination,
            TableList,
            ControlModule
        },
        watch:{
            pageNum(){
                let _this = this;
                _this.getTableList();
            },
            pageSize(){
                let _this = this;
                _this.getTableList();
            }
        },
        mounted(){
          let _this = this;
          _this.getTableList();
        },
        methods:{
            selectTable(onOff,data){
              let _this = this;
              _this.selectOnOff = onOff;
              _this.selectTableData = data;
            },
            getTableList(params){
                let _this = this;
                axios.get(xhrUrl.getList, {
                    params: {
                        ...params,
                        pageNum:_this.pageNum,
                        pageSize:_this.pageSize
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        _this.tableList = response.data.result.list;
                        _this.totalCount = response.data.result.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            changePage(type,num){
                let _this = this;
                if(parseInt(type,10)===0){
                    //改变页码
                    _this.pageNum = num;
                }else{
                    //改变pageSize
                    _this.pagesize = num;

                }
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../static/scss/column/005.scss";
</style>
