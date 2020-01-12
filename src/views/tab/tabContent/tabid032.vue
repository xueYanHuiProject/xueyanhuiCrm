<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="模板ID">
                    <el-input v-model="formInline.templateId" placeholder="模板ID"  class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="模板ID">
                    <el-input v-model="formInline.templateTitle" placeholder="模板标题"  class="adminInputEl"></el-input>
                </el-form-item>
                <!--<el-form-item label="作者">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"  class="adminInputEl"></el-input>
                </el-form-item>-->
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
                <el-form-item label="状态" :inline="true">
                    <el-select v-model="formInline.isValid" placeholder="模板状态"  class="adminInputEl">
                        <el-option label="无效" value="0"></el-option>
                        <el-option label="有效" value="1"></el-option>
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
                    :default-sort = "{prop: 'updateTime', order: 'descending'}"
                    @current-change="tableCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="templateId"
                        label="模板ID">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="useNum"
                        label="使用次数">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="browseNum"
                        label="浏览次数">
                    </el-table-column>
                    <!--<el-table-column
                        prop="author"
                        label="作者">
                    </el-table-column>-->
                    <el-table-column
                        :formatter="formatterValid"
                        prop="isValid"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="updateTime"
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="创建时间">
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
                            <el-button @click.native="detailCheck(0)">详情</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button  type="primary" @click.native="editArticle(0)">编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="activate(0)" type="success">激活</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="detailInfo(0)" type="danger">无效</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            width="30%"
            center
            :title="'无效模板'+selectedData.templateTitle"
            :visible.sync="innerVisible"
            append-to-body>
            <span>确定要无效这条模板？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailInfo(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="30%"
            center
            :title="'激活模板'+selectedData.templateTitle"
            :visible.sync="activateOnOff"
            append-to-body>
            <span>确定要激活这条模板？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activateOnOff = false">取 消</el-button>
                <el-button type="primary" @click="activate(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="50%"
            :title="selectedData.templateTitle"
            :visible.sync="infoOnOff"
            center
            append-to-body>
            <el-main class="detailInfo">
                <textarea name=""   cols="30" rows="10" class="templateContentArea" v-model="selectedData.templateContent"></textarea>
            </el-main>
        </el-dialog>
        <el-dialog
            width="60%"
            title="模板编辑"
            :visible.sync="articleDialog"
            center
            append-to-body>
            <el-main class="templateContent">
                <div class="demo-input-suffix block">
                    <div class="block">
                        模板标题
                    </div>
                    <el-input v-model="templateTitle" placeholder="模板标题"  class="adminInputEl"></el-input>
                </div>
                <div class="demo-input-suffix block">
                    <div class="block">
                    模板内容
                    </div>
                    <textarea name="" id="" cols="30" rows="10" class="templateContentArea" v-model="templateContent"></textarea>
                </div>
            </el-main>
            <span slot="footer" class="dialog-footer">
                <el-button @click="articleDialog = false">取 消</el-button>
                <el-button type="primary" @click="editArticle(1)">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import userData from '../../../virtualData/templateResource';
    import Common from '../../../utils/common.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                pageIndex:1,
                pageSize:10,
                formInline: {
                    pageIndex:1,
                    pageSize:10,
                    templateId:'',
                    isValid:'',
                    templateTitle:''
                },
                templateContent:'',
                templateTitle:'',
                swiperOption: {
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
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
                activateOnOff:false,
                value2: '',
                labelPosition: 'left',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                infoOnOff:false,
                articleDialog:false,
                innerVisible:false,
                centerDialogVisible:false,
                selectedOne:false,
                selectedData:{},
                currentPage4:4,
                count:0,
                tableData:[]
            }
        },
        watch:{
            pageIndex(newVal){
                let t = this;
                t.formInline.pageIndex = newVal;
                t.getTemplateList();
            },
            pageSize(newVal){
                let t = this;
                t.formInline.pageSize = newVal;
                t.getTemplateList();
            }
        },
        mounted() {
            let t = this;
            t.getTemplateList();
        },
        methods:{
            tableCurrentChange(val){
                let t = this;
                if(val){
                    console.log(val);
                    t.selectedOne = true;
                    t.selectedData = val;
                }
            },
            formatterValid(row,column){
                let t = this;
                let type = row['isValid'];
                return Common.formatterValid(type);
            },
            resetList(){
                let t = this;
                t.pageSize = 10;
                t.pageIndex = 1;
                t.formInline = {
                    pageIndex:1,
                    pageSize:10,
                    templateId:'',
                    isValid:'',
                    templateTitle:''
                };
                t.getTemplateList();
            },
            checkList(){
                let t = this;
                t.pageIndex === 1?t.getTemplateList():t.pageIndex =1;
            },
            getTemplateList(){
              let t = this;
                axios.get('/call/template/getTemplateList', {
                    params: t.formInline
                })
                    .then(function (response) {
                        let reqData = response.data;
                        console.log(reqData);
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
            callback(){
                console.log('执行');
            },
            imgInit(e){
              console.log(e);
            },
            detailCheck(type){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要查看的模板!');
                }else{
                    if(type===0){
                        t.infoOnOff = true;
                    }else if(type===1){
                        t.infoOnOff = false;
                    }
                }
            },
            detailInfo(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的模板!');
                }else{
                    if(type===0){
                        t.innerVisible = true;
                    }else if(type===1){
                        axios({
                            url: '/call/template/invalid',
                            method: "POST",
                            data: {
                                templateId:t.selectedData.templateId,
                                updateState:'0'
                            },
                            transformRequest: [function (data) {
                                return "paramJson=" + JSON.stringify(data);
                            }],
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            timeout: 30000
                        }).then(function(req){
                            t.innerVisible = false;
                            t.$message({
                                message: '模板已被无效',
                                type: 'success'
                            });
                            t.getTemplateList();
                        });
                    }

                }
            },
            activate(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要激活的模板!');
                }else{
                    if(type===0){
                        t.activateOnOff = true;
                    }else if(type===1){
                        axios({
                            url: '/call/template/active',
                            method: "POST",
                            data: {
                                templateId:t.selectedData.templateId,
                                updateState:'1'
                            },
                            transformRequest: [function (data) {
                                return "paramJson=" + JSON.stringify(data);
                            }],
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            timeout: 30000
                        }).then(function(req){
                            t.activateOnOff = false;
                            t.$message({
                                message:  t.selectedData.templateTitle+'模板已被激活',
                                type: 'success'
                            });
                            t.getTemplateList();
                        });

                    }

                }
            },
            editArticle(type){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的模板!');
                }else{
                    if(type===0){
                        t.templateContent = t.selectedData.templateContent;
                        t.templateTitle = t.selectedData.templateTitle;
                        t.articleDialog = true;
                    }else if(type===1){
                        if((t.selectedData.templateContent !==t.templateContent)||(t.selectedData.templateTitle!==t.templateTitle)){
                            axios({
                                url: '/call/template/update',
                                method: "POST",
                                data: {
                                    templateId:t.selectedData.templateId,
                                    templateContent:t.templateContent,
                                    templateTitle:t.templateTitle,
                                },
                                transformRequest: [function (data) {
                                    return "paramJson=" + JSON.stringify(data);
                                }],
                                headers: {
                                    'X-Requested-With': 'XMLHttpRequest'
                                },
                                timeout: 30000
                            }).then(function(req){
                                t.articleDialog = false;
                                t.$message({
                                    message: t.selectedData.templateTitle+'模板已更新',
                                    type: 'success'
                                });
                                t.getTemplateList();
                            });
                        }else{
                            t.articleDialog = false;
                        }
                    }

                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(val) {
                let t = this;
                t.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let t = this;
                //t.selectedOne = true;
                //t.selectedData = val;
                t.pageIndex = val;
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../static/scss/common";
    .adminInputEl{
        width:200px;
    }
    .adminContentInner{
        @include ContentInner()
    }
    .block{
        padding: 20px 0;
    }
    .feedBackImgContainer{
        height: 399px;
        width: 100%;
    }
    .articleTemplateContent{
        width: 100%;
    }
    .articleTitle{
        font-size: 26px !important;
        font-weight: bold;
        text-align: center;
        color: #333 !important;
    }
    .detailInfo{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .detailItem{
            width: 98%;
            min-height: 300px;
            font-size: 24px;
            text-align: center;
            line-height: 32px;
            .detailItemTitle{
                padding: 10px 0 ;
            }
            .detailItemImg{
                width: 100%;
                img{
                    width: 100%;
                    height:100% ;
                }
            }
        }
    }
    .templateContentArea{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        resize: none;
        display: block;
        font-size: 14px;
        overflow: auto;
        line-height: 32px;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
</style>
