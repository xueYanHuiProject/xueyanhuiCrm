<template>
    <el-dialog
        :visible.sync="dialogVisible"
        width="64%"
        :before-close="handleClose"
        center>
        <div class="block">
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="栏目标题">
                    <el-input v-model="addForm.columnTitle"></el-input>
                </el-form-item>
                <el-form-item label="路由模块">
                    <el-input v-model="addForm.columnRouterName">{{addForm.columnRouterName}}</el-input>
                </el-form-item>
                <el-form-item label="栏目层级">
                    <el-radio-group v-model="addForm.grade">
                        <el-radio label="0">一级栏目</el-radio>
                        <el-radio label="1">二级栏目</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="父级栏目" v-if="addForm.grade==1">
                    <el-select v-model="addForm.parentColumnId" placeholder="父级栏目">
                        <el-option :label="item.title" :value="item.id" v-for="(item) in columnList" :key="item.id">{{item.title}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择ICON">
                    <el-radio-group v-model="addForm.columnIcon" class="el-icon-list">
                        <el-radio-button :label="item.id" v-for="(item,index) in iconList" :key="item.id" class="el-icon-inner">
                            <div class="el-icon-item">
                                <span class="el-item-center" :class="item.name"></span>
                                <p class="el-item-des" v-text="item.name">

                                </p>
                            </div>
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addColumn">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        data(){
            let adminId = Common.checkInvalid(localStorage.getItem('adminId'))?'':localStorage.getItem('adminId');
          return {
              addForm:{
                  columnTitle:'',
                  grade:'',
                  columnIcon:'',
                  columnRouterName:'',
                  parentColumnId:'',
                  adminId:adminId
              }
          }
        },
        computed:{
            ...mapGetters(['dialogVisible','addMessage','iconList',"columnList",'selectTableData','editType'])
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
                if(n){
                    let _this = this;
                    if(parseInt(_this.editType,10)===0){
                        _this.resetForm();
                    }else{
                        _this.checkForm(_this.selectTableData);
                    }

                }
            },
            selectTableData:{
                handler(newVal){
                    let _this = this;
                    if(parseInt(_this.editType,10)===0){
                        _this.resetForm();
                    }else{
                        _this.checkForm(newVal);
                    }
                },
                deep:true
            },
            editType(newVal){
                let _this = this;
                if(parseInt(newVal,10)===0){
                    _this.resetForm();
                }
            }
        },
        methods:{
            ...mapActions(['showLayer','hideLayer','createColumn','hideMsg','tableCurrentChange']),
            handleClose(){
                let t = this;
                t.hideLayer();
                _this.resetForm();
            },
            resetForm(){
              let _this = this;
                let adminId = Common.checkInvalid(localStorage.getItem('adminId'))?'':localStorage.getItem('adminId');
                _this.addForm = {
                    columnTitle:'',
                    grade:'',
                    columnIcon:'',
                    columnRouterName:'',
                    parentColumnId:'',
                    adminId:adminId
                };
            },
            checkForm(newVal){
                let _this = this;
                if(!Common.isEmptyObject(newVal)){
                    console.log('=========');
                    console.log(newVal);
                    console.log('=========');
                    let adminId = Common.checkInvalid(localStorage.getItem('adminId'))?'':localStorage.getItem('adminId');
                    _this.addForm.columnIcon = newVal.iconId;
                    _this.addForm.columnTitle = newVal.title;
                    console.log(newVal.grade,newVal.routerName);
                    _this.addForm.grade = newVal.grade;

                    _this.addForm.columnRouterName = newVal.routerName;
                    _this.addForm.parentColumnId = newVal.parentColumnId;
                    _this.adminId = adminId;
                }
            },
            addColumn(){
                let t = this;
                console.log(t.addForm);
                let normalOnOff = t.addForm.adminId.length>0&&t.addForm.columnTitle.length>0&&t.addForm.grade.length>0&&t.addForm.grade.length>0&&t.addForm.columnRouterName.length>0;
                let addOnOff = parseInt(t.addForm.grade,10)===0?normalOnOff:normalOnOff&&t.addForm.parentColumnId.length>0;
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
