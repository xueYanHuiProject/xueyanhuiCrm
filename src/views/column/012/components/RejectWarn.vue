<template>
    <el-dialog
        :visible.sync="rejectWarn"
        width="54%"
        :before-close="handleClose"
        center>
        <div class="block">
            <div class="jurisdiction-info">
                回复【萤火虫】
            </div>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="回复内容"  class="blackWarnTextarea">
                    <el-input type="textarea" v-model="addForm.desc" class="feedback-textarea"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose" type="default">取消</el-button>
            <el-button @click="handleClose" type="default">回复</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('module012');
    export default {
        data(){
            let adminId = Common.checkInvalid(localStorage.getItem('adminId'))?'':localStorage.getItem('adminId');
            return {
                addForm:{
                    columnTitle:'',
                    columnIndex:'',
                    columnIcon:'',
                    columnRouterName:'',
                    parentColumnId:'',
                    adminId:adminId
                },
                blackReason:Common.rejectWarn()
            }
        },
        computed:{
            ...mapGetters(['rejectWarn','addMessage','iconList'])
        },
        watch:{
            addForm:{
                handler(n){
                    console.log(n)
                },
                deep:true
            },
            addMessage(n){
                let t = this;
                if(n){
                    t.$message({
                        showClose: true,
                        message: '创建栏目成功',
                        type: 'success'
                    });
                    t.hideMsg();
                }
            },
            dialogVisible(n){
                console.log(n);
            }
        },
        methods:{
            ...mapActions(['showBlackWarn','hideRejectWarn','createColumn','hideMsg']),
            handleClose(){
                let t = this;
                t.hideRejectWarn();
                t.addForm = {
                    columnTitle:'',
                    columnIndex:'',
                    columnIcon:'',
                    columnRouterName:'',
                    parentColumnId:'',
                    adminId:t.adminId
                };
            },
            addColumn(){
                let t = this;
                console.log(t.addForm);
                let normalOnOff = t.addForm.adminId.length>0&&t.addForm.columnTitle.length>0&&t.addForm.columnIndex.length>0&&t.addForm.columnIcon.length>0&&t.addForm.columnRouterName.length>0;
                let addOnOff = parseInt(t.columnIndex,10)===0?normalOnOff:normalOnOff&&t.addForm.parentColumnId.length>0;
                if(addOnOff){
                    t.createColumn(JSON.parse(JSON.stringify(t.addForm)));
                }else{
                    t.$message({
                        message: '创建字段不足',
                        type: 'warning'
                    });
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-icon-item{
        width: 150px;
        height: 80px;
        display: inline-block;
        text-align: center;
        .el-item-center{
            display: block;
            margin: 0 auto;
            height: 30px;
            width: 30px;
            padding: 10px 0;
            font-size: 30px;
            line-height: 30px;
        }
        .el-item-des{
            font-size: 16px;
            width: 100%;
            margin: 0 auto;
            display: block;
            height: 40px;
            word-wrap: break-word;
            word-break: normal;
        }
    }
    .el-icon-list{
        height: 320px;
        overflow-y: auto;
        .el-icon-inner{
            border-left: 1px solid #dcdfe6;
        }
    }
</style>
