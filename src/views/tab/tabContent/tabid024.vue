<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline"  label-width="80px" label-position="left">
                <el-form-item label="推荐ID">
                    <el-input v-model="formInline.recommendId" placeholder="推荐ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="资源ID">
                    <el-input v-model="formInline.recommendResourceId" placeholder="资源ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="资源类型" :inline="true">
                    <el-select v-model="formInline.recommendResourceType" placeholder="资源类型" class="adminInputEl">
                        <el-option label="文章" value="0"></el-option>
                        <el-option label="话题" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐类型" :inline="true">
                    <el-select v-model="formInline.recommendType" placeholder="推荐类型" class="adminInputEl">
                        <!--<el-option label="个性化推送" value="0"></el-option>-->
                        <el-option label="全站推送" value="0"></el-option>
                        <el-option label="单独推送" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐位置" :inline="true">
                    <el-select v-model="formInline.recommendPosition" placeholder="推荐位置" class="adminInputEl">
                        <el-option label="遇见栏目" value="0"></el-option>
                        <el-option label="首页栏目" value="1"></el-option>
                        <el-option label="消息栏目" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级" :inline="true">
                    <el-select v-model="formInline.recommendGrade" placeholder="推荐优先级" class="adminInputEl">
                        <el-option label="按序推送" value="0"></el-option>
                        <el-option label="优先推送" value="1"></el-option>
                        <!--<el-option label="延后推送" value="2"></el-option>-->
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
                <el-form-item label="状态" :inline="true">
                    <el-select v-model="formInline.isValid" placeholder="推送状态" class="adminInputEl">
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="0"></el-option>
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
                        prop="recommendId"
                        label="推荐ID">
                    </el-table-column>
                    <el-table-column
                        prop="recommendResourceId"
                        label="资源ID">
                    </el-table-column>
                    <el-table-column
                        prop="recommendResourceTpe"
                        :formatter="formatterResourceType"
                        label="资源类型">
                    </el-table-column>
                    <el-table-column
                        prop="recommendType"
                        :formatter="formatterRecommendType"
                        label="推荐类型">
                    </el-table-column>
                    <el-table-column
                        prop="recommendPosition"
                        :formatter="formatterRecommendPosition"
                        label="推荐位置">
                    </el-table-column>
                    <el-table-column
                        prop="recommendGrade"
                        :formatter="formatterRecommendGrade"
                        label="推荐优先级">
                    </el-table-column>
                    <el-table-column
                        prop="isValid"
                        :formatter="formatterValid"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        sortable
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
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
                        <!--<el-form-item>
                            <el-button  type="primary" @click.native="editArticle(0)">编辑</el-button>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button @click.native="pushContent(0)" type="primary">编辑</el-button>
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
            title="提示"
            :visible.sync="innerVisible"
            append-to-body>
            <span>确定要无效这条动态？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailInfo(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="activateOnOff"
            append-to-body>
            <span>确定要激活这条动态？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activateOnOff = false">取 消</el-button>
                <el-button type="primary" @click="activate(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="50%"
            :visible.sync="pushOnOff"
            center
            append-to-body>
            <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="推送类型" :inline="true">
                    <el-select v-model="editDialogData.recommendType" placeholder="推送类型" class="adminInputEl">
                        <!--<el-option label="个性化推送" value="0"></el-option>-->
                        <el-option label="全站推送" value="0"></el-option>
                        <el-option label="单独推送" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送位置" :inline="true">
                    <el-select v-model="editDialogData.recommendPosition" placeholder="推送位置" class="adminInputEl">
                        <el-option label="遇见栏目" value="0"></el-option>
                        <el-option label="首页栏目" value="1"></el-option>
                        <el-option label="消息栏目" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级" :inline="true">
                    <el-select v-model="editDialogData.recommendGrade" placeholder="推送优先级" class="adminInputEl">
                        <el-option label="按序推送" value="0"></el-option>
                        <el-option label="优先推送" value="1"></el-option>
                        <!--<el-option label="延后推送" value="2"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="推送ID" :inline="true">
                    <el-input v-model="editDialogData.recommendCustomerId" placeholder="请输入推送ID"  class="adminInputEl"></el-input>
                </el-form-item>
            </el-form>
            <!--<el-form :inline="true" class="demo-form-inline">
                <el-form-item label="个性化推送条件" :inline="true">
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                </el-form-item>
            </el-form>-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="pushOnOff = false">取 消</el-button>
                <el-button type="primary" @click="pushContent(1)">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import userData from '../../../virtualData/recommendData';
    import Common from '../../../utils/common.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                formInline: {
                    pageIndex:1,
                    pageSize:10,
                    recommendId:'',//该推荐的唯一标识
                    recommendPosition:'',//推荐的位置0遇见栏目，1首页栏目，2消息栏目
                    recommendGrade:'',//推荐的优先级0按序推荐，1优先推荐
                    recommendResourceType:'',//推荐的资源类型0文章，1话题
                    recommendResourceId:'',//推荐的资源id
                    recommendType:'',//推荐的类型0全站推送，1单独推送
                    isValid:''//0无效，1有效
                },
                pageIndex:1,
                pageSize:10,
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
                labelPosition: 'left',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                editDialogData:{},
                pushOnOff:false,
                activateOnOff:false,
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
        mounted() {
            let t = this;
            t.getRecommendList();
        },
        watch:{
            pageIndex(newVal){
                let t = this;
                t.formInline.pageIndex = newVal;
                t.getRecommendList();
            },
            pageSize(newVal){
                let t = this;
                t.formInline.pageSize = newVal;
                t.getRecommendList();
            }
        },
        methods:{
            checkList(){
                let t = this;
                t.pageIndex === 1 ? t.getRecommendList() : t.pageIndex = 1;
            },
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
            formatterResourceType(row, column) {
                let t = this;
                let type = row['recommendResourceType'];
                return Common.recommendResourceType(type);
            },
            formatterRecommendType(row, column) {
                let t = this;
                let type = row['recommendType'];
                return Common.recommendType(type);
            },
            formatterRecommendPosition(row, column) {
                let t = this;
                let type = row['recommendPosition'];
                return Common.recommendPosition(type);
            },
            formatterRecommendGrade(row, column) {
                let t = this;
                let type = row['recommendGrade'];
                return Common.recommendGrade(type);
            },
            resetList(){
              let t = this;
                t.pageSize = 10;
                t.pageIndex = 1;
              t.formInline = {
                  pageIndex:1,
                  pageSize:10,
                  recommendId:'',//该推荐的唯一标识
                  recommendPosition:'',//推荐的位置0遇见栏目，1首页栏目，2消息栏目
                  recommendGrade:'',//推荐的优先级0按序推荐，1优先推荐
                  recommendResourceType:'',//推荐的资源类型0文章，1话题
                  recommendResourceId:'',//推荐的资源id
                  recommendType:'',//推荐的类型0全站推送，1单独推送
                  isValid:''//0无效，1有效
              };
              t.getRecommendList();
            },
            getRecommendList(){
              let t = this;
                axios.get('/call/recommend/getRecommendList', {
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
            activate(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要激活的推荐!');
                }else{
                    if(type===0){
                        t.activateOnOff = true;
                    }else if(type===1){
                        axios({
                            url: '/call/recommend/active',
                            method: "POST",
                            data: {
                                recommendId:t.selectedData.recommendId,
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
                                message: '推荐已被激活',
                                type: 'success'
                            });
                            t.getRecommendList();
                        });
                    }
                }
            },
            detailInfo(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的文章!');
                }else{
                    if(type===0){
                        t.innerVisible = true;
                    }else if(type===1){
                        axios({
                            url: '/call/recommend/invalid',
                            method: "POST",
                            data: {
                                recommendId:t.selectedData.recommendId,
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
                                message: '推荐已被无效',
                                type: 'success'
                            });
                            t.getRecommendList();
                        });
                    }
                }
            },
            editArticle(type){
              let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要无效的文章!');
                }else{
                    if(type===0){
                        t.articleDialog = true;
                    }else if(type===1){
                        t.articleDialog = false;
                        t.$message({
                            message: t.selectedData.articleTitle+'文章已生成',
                            type: 'success'
                        });
                    }
                }
            },
            checkSelectDataChange(lastData,newData){
              let t = this;
              let keyArr = Object.keys(lastData);
              let num = 0;
              for(let item in lastData){
                  if(lastData[item]==newData[item]){
                      num++;
                  }
              }
              return !(num===keyArr.length);
            },
            pushContent(type){
                let t = this;
                if(!t.selectedOne){
                    t.$message.error('请选择您要编辑的推送!');
                }else{
                    if(type===0){
                        t.pushOnOff = true;
                        t.editDialogData = JSON.parse(JSON.stringify(t.selectedData));
                    }else if(type===1){
                        if(t.checkSelectDataChange(t.selectedData,t.editDialogData)){
                            //推送编辑过
                            console.log('编辑过');
                            axios({
                                url: '/call/recommend/update',
                                method: "POST",
                                data: t.editDialogData,
                                transformRequest: [function (data) {
                                    return "paramJson=" + JSON.stringify(data);
                                }],
                                headers: {
                                    'X-Requested-With': 'XMLHttpRequest'
                                },
                                timeout: 30000
                            }).then(function(req){
                                t.pushOnOff = false;
                                t.$message({
                                    message: '已推送',
                                    type: 'success'
                                });
                                t.getRecommendList();
                            });
                        }else{
                            //推送没编辑
                            console.log('没编辑过');
                            t.pushOnOff = false;
                        }
                    }

                }
              console.log('推送');
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
        @include ContentInner();
    }
    .tag{
        margin: 10px;
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
    .paragraphItem{
        width: 100%;
        height: auto;
        .paragraphItemTitle{
            width: 100%;
            font-size: 22px;
            padding: 20px 0 ;
            display: block;
        }
        .paragraphItemArticle{
            width: 100%;
            height: 400px;
            display: block;
            .paragraphArticleInput{
                width: 90%;
                height: 100%;
                margin: 0 auto;
                resize: none;
                display: block;
                font-size: 22px;
                overflow: auto;
            }
        }
        .paragraphItemInput{
            width: 100%;
            height: 32px;
            .paragraphTitleInput{
                width: 90%;
                margin: 0 auto;
                font-size: 22px;
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
                display: block;
                -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
        }
        .paragraphItemImage{
            width: 90%;
            display: block;
            margin: 0 auto;
            height:300px;
            position: relative;
            &.paragraphItemNothing{
                z-index: 1;
            }
            .paragraphItemEdit{
                width: 100%;
                height: 100%;
                position: absolute;
                top:0;
                left: 0;
                bottom:0;
                right: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px dashed #333;
                .upload{
                    width: 160px;
                    height: 160px;
                    font-size: 82px;
                    line-height: 160px;
                    text-align: center;
                    color: #3598DB;
                }
                .uploadDes{
                    font-size: 22px;
                    font-weight: normal;
                }
            }
            &.paragraphItemHave{
                .paragraphItemContent{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    bottom:0;
                    right: 0;
                    z-index: 2;
                    border: 1px solid #ffffff;
                    .close{
                        opacity: 0;
                    }
                    &:hover{
                        .close{
                            position: absolute;
                            top:0;
                            opacity: 1;
                            right: 0;
                            width: 30px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            font-size: 22px;
                            color:#fff;
                            background: rgba(0,0,0,.5);
                            transition: opacity .3s ease;
                        }
                    }
                }

            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .templatePreview{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        .templateItem{
            width: 49%;
            .sectionContent{
                height:100%;
                width: 100%;
                padding: 0;
                &::after {
                    content: ".";
                    clear: both;
                    display: block;
                    overflow: hidden;
                    font-size: 0;
                    height: 0;
                }
                .sectionSwiperContent{
                    height:100%;
                    width: 100%;
                }
            }

        }
    }
</style>
