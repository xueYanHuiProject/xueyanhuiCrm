<template>
    <section>
        <el-dialog :title="DialogInfo.title" :visible.sync="tab2Data.toggleSlide" center :before-close="handleClose" width="80%">
            <el-container class="adminAuditContainer">
                <el-main>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>学位证</span>
                                <span class="auditNumber">{{DialogInfo.degreeNum}}1111111111</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem">
                            <div class="grid-content">
                            <img class="adminAuditImage" :src="DialogInfo.degreeImg"/>
                        </div>
                        </el-col>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.degreeImg"/>
                            </div>
                        </el-col>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.degreeImg"/>
                            </div>
                        </el-col>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.degreeImg"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>职业信息</span>
                                <span class="auditNumber">{{DialogInfo.professionNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.professionImg"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>学历证</span>
                                <span class="auditNumber">{{DialogInfo.otherNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.otherImg"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>其他证件</span>
                                <span class="auditNumber">{{DialogInfo.otherNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.otherImg"/>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-dialog>
    </section>
</template>
<style lang="scss" scoped>
    .attachmentItem{
        margin-bottom: 20px;
    }
    .adminAuditNumber{
        font-size: 18px;
        color: #333;
        line-height: 18px;
        display: inline-block;
    }
    .adminAuditImage{
        width: 383.7px;
        height: 265.8px;
        background: #ff0000;
        display: block;
        margin: 0 auto;
    }
    .adminAuditNumber{
        width: 100%;
    }
    .audiContentItem{
        margin:15px 0 ;
        &:nth-child(1){
            margin-top: 0;
        }
    }
    .audiItem{
        width: 100%;
        display:flex ;
        flex-direction: row;
        justify-content: space-between;
        .auditTitle{
            font-size: 20px;
            line-height: 20px;
            i{
                margin: 0 10px;
            }
        }
    }
</style>
<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data(){
            return {
                msg:"",
                dialogTableVisible: false,
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        watch:{
            tab2Data(){
                console.log(this.tab2Data)
            }
        },
        methods:{
            ...mapActions(['tab2HideDialog']),
            handleClose(){
                let t = this;
                t.tab2HideDialog();
            }
        },
        computed:{
            ...mapGetters(['tab2Data'])
        },
        mounted(){
          console.log(this.DialogInfo)
        },
        props:['DialogInfo']
    }
</script>
