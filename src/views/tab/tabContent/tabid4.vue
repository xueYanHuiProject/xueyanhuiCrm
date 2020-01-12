<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline"  label-width="80px" label-position="left">
                <el-form-item label="反馈ID">
                    <el-input v-model="formInline.feedbackId" placeholder="反馈ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="会员ID">
                    <el-input v-model="formInline.customerId" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.customerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="反馈状态">
                    <el-select v-model="formInline.feedbackState" placeholder="反馈状态" class="adminInputEl">
                        <el-option label="新建" value="0"></el-option>
                        <el-option label="已回复" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <div class="block">
                     <el-form-item>
                         <el-button type="primary" @click="checkList">查询</el-button>
                     </el-form-item>
                     <el-form-item>
                        <el-button type="default" @click="resetList">重置</el-button>
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
                        prop="feedbackId"
                        label="反馈ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="feedbackState"
                        :formatter='formateState'
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="反馈时间">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="回复时间">
                    </el-table-column>
                    <el-table-column
                        prop="adminName"
                        label="回复人">
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
                            <el-button @click.native="detailInfo" type="default">详情</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            :title="selectedData.customerName+'的反馈信息'"
            :visible.sync="centerDialogVisible"
            width="45%"
            center>
            <div class="block">
                <p>
                    {{selectedData.feedbackContent}}
                </p>
            </div>
            <div class="block">
                <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="输入反馈回复" :inline="true" class="rejectAuditInline">
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
    import userData from '../../../virtualData/feedback';
    import axios from 'axios';
    export default {
        data(){
            return {
                formInline: {
                    feedbackId:'',//该反馈的唯一标识
                    customerId:'',//反馈用户的id
                    customerName:'',//反馈用户的名字
                    feedbackState:'',//反馈的状态，0新建，1已回复
                    pageSize:10,
                    getType:2,
                    pageIndex:1 
                },
                pageSize:10,
                pageIndex:1,
                count:0,
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
                tableData:[]
            }
        },
        watch:{
            pageIndex(newVal){
                let t = this;
                t.formInline.pageIndex = newVal; 
                t.getFeedBackList();       
            },
            pageSize(newVal){
                let t = this;
                t.formInline.pageSize = newVal;
                t.getFeedBackList();
            }
        },
        mounted(){
            let t = this;
            console.log('执行');
            t.getFeedBackList();
        },
        methods:{
            checkList(){
                let t = this;
                t.pageIndex === 1 ? t.getFeedBackList() : t.pageIndex = 1;
            },
            feedBackContent(){
              let t = this;
              t.centerDialogVisible = false;
                t.$message({
                    message: t.selectedData.customerName+'反馈信息已回复',
                    type: 'success'
                });
            },
            resetList(){
                let t = this;
                t.pageSize = 10;
                t.pageIndex = 1;
                t.formInline={
                    feedbackId:'',//该反馈的唯一标识
                    customerId:'',//反馈用户的id
                    customerName:'',//反馈用户的名字
                    feedbackState:'',//反馈的状态，0新建，1已回复
                    pageSize:10,
                    getType:2,
                    pageIndex:1 
                };
                t.getFeedBackList();
            },
            getFeedBackList(){
                 let t = this;
                t.selectedData = {};
                axios.get('/call/customer/getFeedBackList', {
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
            handleSizeChange(val) {
                let t = this;
                t.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            formateState(row,column){
                let t = this;
                let type = parseInt(row['feedbackState'],10);
                return type===0?'新建':'已回复' ;
            },
            tableCurrentChange(val){
                let t = this;
                if(val){
                 console.log(val);
                 t.selectedOne = true;
                 t.selectedData = val;
                }
                
            },
            handleCurrentChange(val) {
                let t = this;
                t.pageIndex = val;
            }
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
    .rejectAuditInline,.feedBackArea{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        textarea{
            width: 383.7px;
            height: 265.8px;
        }
    }
</style>
