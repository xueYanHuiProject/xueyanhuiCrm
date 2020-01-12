<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline"  label-width="80px" label-position="left">
                <el-form-item label="举报ID">
                    <el-input v-model="formInline.informId" placeholder="举报ID" class="adminInputEl"></el-input>
                </el-form-item>
                <!--<el-form-item label="会员ID">
                    <el-input v-model="formInline.user" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>-->
                <el-form-item label="举报者">
                    <el-input v-model="formInline.customerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="被举报者">
                    <el-input v-model="formInline.informCustomerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="举报状态">
                    <el-select v-model="formInline.informState" placeholder="举报状态" class="adminInputEl">
                        <el-option label="新建" value="0"></el-option>
                        <el-option label="已回复" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="时间">
                    <el-date-picker
                        class="adminInputEl"
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>-->
                <div class="block">
                    <el-form-item>
                        <el-button type="primary" @click="checkList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default" @click="reset">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
            <div class="block">
                <el-table
                    :data="tableData"
                    border
                    highlight-current-row
                    @current-change="tableCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="informId"
                        label="举报ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="informCustomerName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="informContent"
                        label="举报内容">
                    </el-table-column>
                    <el-table-column
                        prop="informState"
                        :formatter="informState"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="回复时间">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="举报时间">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="举报人">
                    </el-table-column>
                </el-table>
                <div class="block adminPage">
                    <!--<span class="demonstration">完整功能</span>-->
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                    </el-pagination>
                </div>
                <div class="block adminAuditControl">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-button @click.native="detailInfo" type="primary">回复</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            :title="selectedData.customerName+'的举报信息'"
            :visible.sync="centerDialogVisible"
            width="65%"
            center>
            <div class="block">
                <p>
                    {{selectedData.informContent}}
                </p>
            </div>
            <div class="block feedBackImgContainer">
                <ul class="feedBackImgList">
                    <li class="feedBackAreaImgItem" v-for="(item,index) in selectedData.imgList">
                        <img :src="item" alt="" v-bind:key="index">
                    </li>
                </ul>
            </div>
            <div class="block">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="输入举报回复" :inline="true" class="rejectAuditInline">
                        <textarea class="feedBackArea" style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="feedBackContent()">回复</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '../../../utils/common.js';
    import axios from 'axios';
    import userData from '../../../virtualData/feedback';
    export default {
        data(){
            return {
                formInline: {
                    informId:'',
                    customerId: '',
                    customerName: '',
                    informCustomerName:'',
                    informState:'',
                    getType:3,
                    pageSize:10,
                    pageIndex:1
                },
                count:0,
                pageSize:10,
                pageIndex:1,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value2:"",
                rejectAuditReason:"",
                selectedData:{},
                centerDialogVisible:false,
                selectedOne:false,
                msg:"",
                currentPage4:4,
                tableData:userData.data.dataList
            }
        },
        watch:{
            pageIndex(newVal){
                let t = this;
                t.formInline.pageIndex = newVal;
                t.getInformList();
            },
            pageSize(newVal){
                let t = this;
                t.formInline.pageSize = newVal;
                t.getInformList();
            }
        },
        methods:{
            checkList(){
                let t = this;
                t.pageIndex === 1 ? t.getInformList() : t.pageIndex = 1;
            },
            informState(row,column){
                let t = this;
                let type = row['informState'];
                return Common.auditType(type);
            },
            tableCurrentChange(val){
                let t = this;
                if(val){
                    console.log(val);
                    t.selectedOne = true;
                    t.selectedData = val;
                }

            },
            reset(){
              let t = this;
                t.pageSize = 10;
                t.pageIndex = 1;
              t.formInline = {
                  informId:'',
                  customerId: '',
                  customerName: '',
                  informCustomerName:'',
                  informState:'',
                  getType:3,
                  pageSize:10,
                  pageIndex:1
              };
              t.getInformList();
            },
            feedBackContent(){
                let t = this;
                t.centerDialogVisible = false;
                t.$message({
                    message: t.selectedData.name+'举报信息已回复',
                    type: 'success'
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            detailInfo(){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要回复的用户!');
                }else{
                    t.centerDialogVisible = true;
                }
            },
            onSubmit() {
                let t = this;
                t.getInformList();
                console.log('submit!');
            },
            handleSizeChange(val) {
                let t = this;
                t.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            getInformList(){
                let t = this;
                t.selectedData = {};
                axios.get('/call/customer/getInformList', {
                    params: t.formInline
                })
                    .then(function (response) {
                        let reqData = response.data;
                        if(reqData.responseObject.responseData['data_list']){
                            t.tableData = reqData.responseObject.responseData['data_list'];
                        }
                        if(reqData.responseObject.responseData.totalCount){
                            t.count = reqData.responseObject.responseData.totalCount;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleCurrentChange(val) {
                let t = this;
                t.pageIndex = val;
            }
        },
        mounted(){
            let t = this;
            t.getInformList();
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../static/scss/common";
    .adminContentInner{
        @include ContentInner();
        .adminInputEl{
            width:200px;
        }
        .adminUserControl{
            padding: 0 0 10px 0;
        }
        .adminPage{
            padding: 20px 0;
        }
        .adminAuditControl{
            padding: 20px 0;
        }
    }
    .block{
        padding: 20px 0;
    }
    .feedBackImgContainer{
        height: 399px;
        width: 100%;
    }
    .feedBackImgList{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 399px;
        flex-wrap: wrap;
        .feedBackAreaImgItem{
            width: 191.85px;
            height: 132.9px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }


    .rejectAuditInline,.feedBackArea{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        textarea{
            width: 583.7px;
            height: 265.8px;
        }
    }
</style>
