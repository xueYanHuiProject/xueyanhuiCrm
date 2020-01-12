<template>
    <el-dialog
        :visible.sync="editVisible"
        width="600px"
        :before-close="handleClose"
        :class="{'adminTopicEditType':parseInt(editType,10)===1}"
        center>
        <div class="block">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="消息名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <div class="block" style="width: 100%;height: 320px;">
                    <span class="upload-label">消息封面</span>
                    <div class="upload-pic">
                        <div v-if="imageUrl"   :style="{background: 'url('+imageUrl+') no-repeat center center/cover'}"  class="avatar"></div>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                </div>
                <el-form-item label="消息描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <div class="admin-audit-info">
                <div class="admin-feedback-author">
                    <span class="label">消息作者:</span>
                    <span class="admin-feedback-info">萤火虫</span>
                </div>
                <div class="admin-feedback-state">
                    <span class="label">消息状态:</span>
                    <span class="admin-feedback-info">已回复</span>
                </div>
                <div class="admin-feedback-tile">
                    <span class="label">消息时间:</span>
                    <span class="admin-feedback-info">2019-05-03 08:00 </span>
                </div>
                <div class="admin-feedback-tile">
                    <span class="label">消息类型:</span>
                    <span class="admin-feedback-info">脱单消息</span>
                </div>
                <div class="admin-feedback-tile">
                    <span class="label">资源ID:</span>
                    <span class="admin-feedback-info">78887778885</span>
                </div>
            </div>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button @click="handleClose">确定</el-button>
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
                imageUrl:'http://pic9.nipic.com/20100923/2531170_140325352643_2.jpg',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        computed:{
            ...mapGetters(['editVisible','addMessage','iconList','editType'])
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
            ...mapActions(['showEditLayer','hideEditLayer','createColumn','hideMsg']),
            handleClose(){
                let t = this;
                t.hideEditLayer();
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
    .upload-label{
        padding-left: 13px;
        float: left;
    }
    .upload-pic{
        width: 300px;
        height: 300px;
        margin-left: 20px;
        float: left;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .avatar {
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
</style>
