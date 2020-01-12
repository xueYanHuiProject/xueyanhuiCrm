<template>
    <el-dialog
        :visible.sync="dialogVisible"
        width="900px"
        :before-close="handleClose"
        center>
        <div class="block">
            <div class="jurisdiction-info">
                萤火虫-话题
            </div>
            <div class="admin-audit-word block">
                这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
                这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
                这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
            </div>
            <div class="admin-audit-panel block" style="display: flex;flex-direction: row;justify-content: center;">
                <section class="admin-audit-image">
                    <figure class="admin-audit-picture"></figure>
                </section>
            </div>
            <div class="admin-audit-info">
                <div class="admin-feedback-author">
                    <span class="label">话题作者:</span>
                    <span class="admin-feedback-info">萤火虫</span>
                </div>
                <div class="admin-feedback-state">
                    <span class="label">话题状态:</span>
                    <span class="admin-feedback-info">已回复</span>
                </div>
                <div class="admin-feedback-tile">
                    <span class="label">话题时间:</span>
                    <span class="admin-feedback-info">2019-05-03 08:00 </span>
                </div>
                <div class="admin-feedback-tile">
                    <span class="label">话题类型:</span>
                    <span class="admin-feedback-info">脱单话题</span>
                </div>
                <div class="admin-feedback-tile">
                    <span class="label">资源ID:</span>
                    <span class="admin-feedback-info">78887778885 </span>
                </div>
            </div>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">关闭</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('module011');
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
              }
          }
        },
        computed:{
            ...mapGetters(['dialogVisible','addMessage','iconList'])
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
            ...mapActions(['showLayer','hideLayer','createColumn','hideMsg']),
            handleClose(){
                let t = this;
                t.hideLayer();
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
