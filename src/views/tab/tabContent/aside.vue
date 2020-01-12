<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="侧边栏ID">
                    <el-input v-model="formInline.sideId" placeholder="侧边栏ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="formInline.sideTitle" placeholder="请输入标题" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="路由模块">
                    <el-input v-model="formInline.sideTitle" placeholder="请输入路由模块" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="层级">
                    <el-select v-model="formInline.zIndex" placeholder="层级" class="adminInputEl">
                        <el-option label="一级栏" value="0"></el-option>
                        <el-option label="二级栏" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员">
                    <el-input v-model="formInline.adminName" placeholder="请输入管理员名字" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="管理员Id">
                    <el-input v-model="formInline.adminId" placeholder="请输入管理员Id" class="adminInputEl"></el-input>
                </el-form-item>
                <!--<el-form-item label="邮件">
                    <el-input v-model="formInline.customerEmail" placeholder="邮件" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.customerPhoneNum" placeholder="手机号" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-date-picker
                        v-model="creationTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="creationTimePickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审核时间">
                    <el-date-picker
                        v-model="updateTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="updateTimePickerOptions">
                    </el-date-picker>
                </el-form-item>-->
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
                    :default-sort = "{prop: 'updateTime', order: 'descending'}"
                    @current-change="tableCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="sideId"
                        label="侧边栏ID">
                    </el-table-column>
                    <el-table-column
                        prop="sideTitle"
                        label="侧边栏标题">
                    </el-table-column>
                    <el-table-column
                        prop="zIndex"
                        label="层级">
                    </el-table-column>
                    <el-table-column
                        prop="isValid"
                        :formatter="formatterValid"
                        label="侧边栏状态">
                    </el-table-column>
                    <el-table-column
                        prop="routerModule"
                        label="路由模块">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="注册时间">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        sortable
                        label="审核时间">
                    </el-table-column>
                    <el-table-column
                        prop="adminName"
                        label="管理员">
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
            </div>
            <div class="block adminAuditControl">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="default" @click.native="checkPermission">修改</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default"  @click.native="addSiteSide(0)">添加</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default"  @click.native="blackCustomer(0)">激活</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default"  @click.native="blackCustomer(0)">无效</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <el-dialog
            width="50%"
            title="添加侧边栏"
            :visible.sync="addOnOff"
            center
            append-to-body>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
                append-to-body>
                <el-main>
                    <section class="block">
                        <el-row>

                        </el-row>
                    </section>
                </el-main>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
            </el-dialog>
            <section class="block">
                <el-main>
                    <section class="block">
                        <el-form  :model="addInline" class="demo-form-inline" label-width="120px" label-position="left">
                            <el-form-item label="侧边栏标题" class="block">
                                <el-input v-model="addInline.sideTitle" placeholder="请输入侧边栏标题" class="adminInputEl"></el-input>
                            </el-form-item>
                            <el-form-item label="侧边栏icon" class="block">
                                <el-input v-model="addInline.sideClassName" placeholder="请输入侧边栏icon" class="adminInputEl"></el-input>
                            </el-form-item>
                            <el-form-item   class="block">
                                <div style="width:100px;height:100px;border:1px solid #ccc;text-align: center;line-height:100px;font-size: 50px;" class="el-icon-ump-VIP" @click="dialogVisible=true"></div>
                            </el-form-item>
                            <el-form-item label="栏目层级" class="block">
                                <el-radio-group v-model="addInline.zIndex">
                                    <el-radio  label="0">一级栏</el-radio>
                                    <el-radio  label="1">二级栏</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="父栏目ID" v-show="addInline.zIndex=='1'">
                                <el-select v-model="addInline.parentSiteId" placeholder="请选择活动区域">
                                    <el-option label="栏目一" value="shanghai"></el-option>
                                    <el-option label="栏目二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="路由模块名" class="block">
                                <el-input v-model="addInline.routerModule" placeholder="请输入路由模块名" class="adminInputEl"></el-input>
                            </el-form-item>
                        </el-form>
                    </section>
                </el-main>
            </section>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addOnOff = false">取 消</el-button>
                <el-button type="primary"  @click="addSiteSide(1)">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="'拉黑'+selectedData.customerName"
            width="40%"
            center
            :visible.sync="rejectDialogVisible">
            <section class="block">
                <el-form  :model="blacklist" class="demo-form-inline" label-width="80px" label-position="left">
                    <el-form-item label="拉黑原因">
                        <el-select v-model="blacklist.region" placeholder="用户状态" class="adminInputElDialog">
                            <el-option :label="item.reasonName" v-for="(item,index) in blackReason" :key="index" :value="item.reasonType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="拉黑回复">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            class="adminInputElDialog"
                            placeholder="请输入内容"
                            v-model="blacklist.textarea2">
                        </el-input>
                    </el-form-item>
                </el-form>
            </section>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rejectDialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="blackCustomer(1)">确定</el-button>
            </div>
        </el-dialog>
    </section>

</template>
<style lang="scss" scoped>
    .adminInputElDialog{
        width:300px;
    }
    @import "../../../static/scss/common";
    .permission-item{
        margin: 10px 20px;
    }
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
</style>
<script>
    import Common from '../../../utils/common.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                currentDate: new Date(),
                dialogVisible:false,
                addOnOff:false,
                activateOnOff:false,
                rejectDialogVisible:false,
                count:0,
                blacklist:{
                    region:1,
                    textarea2:''
                },
                addInline:{
                    sideTitle:'',
                    sideClassName: '',
                    zIndex: '-1',
                    routerModule: '',
                    parentSiteId:'',
                    adminId:localStorage.getItem('adminId'),
                    adminName:localStorage.getItem('userName')
                },
                formInline: {
                    sideId: '',
                    sideTitle:'',
                    sideClassName: '',
                    zIndex: '',
                    routerModule: '',
                    adminName: '',
                    adminId: '',
                    isValid:'',
                    pageSize:10,
                    pageIndex:1
                },
                pageSize:10,
                pageIndex:1,
                selectedData:{},
                selectedOne:false,
                tableData:[],
                creationTimePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                updateTimePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                creationTime:'',
                updateTime:''
            }
        },
        computed: {
            blackReason(){
                return Common.blackReason();
            }
        },
        watch:{
            'addInline.zIndex'(n){
                let t = this;
                if(Number(n)===1){
                    t.addInline.parentSiteId = '';
                }
            },
            pageIndex(newVal){
                let t = this;
                t.formInline.pageIndex = newVal;
                t.getUserList();
            },
            pageSize(newVal){
                let t = this;
                t.formInline.pageSize = newVal;
                t.getUserList();
            },
            creationTime(newVal){
                console.log(newVal);
            },
            updateTime(newVal){
                console.log(newVal);
            }
        },
        mounted(){
            let t = this;
            t.getUserList();
        },
        methods:{
            addSiteSide(type){
              let t = this;
              let typeNum = parseInt(type,10);
              if(typeNum===0){
                  t.addOnOff = true;
              }else{
                  axios({
                      url: '/call/aside/createSide',
                      method: "POST",
                      data: t.addInline,
                      transformRequest: [function (data) {
                          return "paramJson=" + JSON.stringify(data);
                      }],
                      headers: {
                          'X-Requested-With': 'XMLHttpRequest'
                      },
                      timeout: 30000
                  }).then(function(req){
                      console.log(req.data);
                      if(req.data.responseObject.responseCode===4){
                          t.$message({
                              message: t.addInline.sideTitle+'已创建',
                              type: 'success'
                          });
                          t.getUserList();
                      }else{
                          t.$message({
                              message: t.addInline.sideTitle+'创建失败',
                              type: 'warning'
                          });
                      }
                      t.addOnOff = false;
                      t.addInline = {
                          sideTitle:'',
                          sideClassName: '',
                          zIndex: '-1',
                          routerModule: '',
                          parentSiteId:'',
                          adminId:localStorage.getItem('adminId'),
                          adminName:localStorage.getItem('userName')
                      };
                  });
              }
            },
            checkList() {
                let t = this;
                t.pageIndex === 1 ? t.getUserList() : t.pageIndex = 1;
            },
            checkPermission(){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要查看的会员!');
                }else{
                    t.activateOnOff = true;
                }
            },
            resetList(){
                let t = this;
                t.pageSize = 10;
                t.pageIndex = 1;
                t.formInline={
                    sideId: '',
                    sideTitle:'',
                    sideClassName: '',
                    zIndex: '',
                    routerModule: '',
                    adminName: '',
                    adminId: '',
                    isValid:0,
                    pageSize:10,
                    pageIndex:1
                };
                t.getUserList();
            },
            tableCurrentChange(val){
                let t = this;
                if(val){
                    console.log(val);
                    t.selectedOne = true;
                    t.selectedData = val;
                }

            },
            getUserList(){
                let t = this;
                t.selectedData = {};
                axios.get('/call/aside/getList', {
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
            blackCustomer(step){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要拉黑的用户!');
                }else{
                    if(step===0){
                        console.log('拉黑');
                        t.rejectDialogVisible = true;
                    }else{
                        axios({
                            url: '/call/customer/activate',
                            method: "POST",
                            data: {
                                customerId:t.selectedData.customerId,
                                blackReason:t.blacklist.region,
                                reportCustomerId:0,
                                reportCustomerName:0,
                                adminId:localStorage.getItem('adminId'),
                                adminName:localStorage.getItem('userName'),
                                updateState:4
                            },
                            transformRequest: [function (data) {
                                return "paramJson=" + JSON.stringify(data);
                            }],
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            timeout: 30000
                        }).then(function(req){
                            console.log(req.data);
                            if(req.data.responseObject.responseCode===4){
                                t.$message({
                                    message: t.selectedData.customerName+'已拉黑',
                                    type: 'success'
                                });
                                t.getUserList();
                            }else{
                                t.$message({
                                    message: t.selectedData.customerName+'拉黑失败',
                                    type: 'warning'
                                });
                            }
                            t.rejectDialogVisible = false;
                        });
                    }
                }
            },
            handleSelectionChange(val) {
                let t = this;
                this.multipleSelection = val;

            },
            handleSizeChange(val) {
                let t = this;
                t.pageSize = parseInt(val,10);
            },
            handleCurrentChange(val) {
                let t = this;
                t.pageIndex = parseInt(val,10);
            },
            formatterValid(row,column){
                let t = this;
                let type = row['isValid'];
                return Common.formatterValid(type);
            }
        }
    }
</script>
