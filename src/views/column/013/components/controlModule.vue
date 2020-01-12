<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="reBackDialog">驳回</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="passDialog">通过</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    const xhrUrl = {
      changeState:'/api/admin/update'
    };
    import {mapActions } from 'vuex';
    import axios from 'axios';
    export default {
        props:{
            selectOnOff:{
                default(){
                    return false;
                }
            },
            selectTableData:{
                default(){
                    return {}
                }
            }
        },
        methods:{
            ...mapActions('module013',['showLayer','showEditLayer']),
            reBackDialog(){
                let _this = this;
                if(_this.selectOnOff){
                    _this.$confirm('您确定要拉黑管理员', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.post(xhrUrl.changeState, {
                            id: _this.selectTableData.id,
                            checkState: '0'
                        })
                            .then(function (response) {
                                console.log(response);
                                if(parseInt(response.data.code,10)===200){
                                    _this.$message({
                                        type: 'success',
                                        message: '已驳回!'
                                    });
                                    _this.$emit("getTableList");
                                }else{
                                    _this.$message.error('操作失败');
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                                _this.$message.error('操作失败');
                            });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else{
                    _this.$message.error('请选择一条数据');
                }
            },
            passDialog(){
                let _this = this;
                if(_this.selectOnOff){
                    _this.$confirm('您确定要通过该管理员', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        axios.post(xhrUrl.changeState, {
                            id: _this.selectTableData.id,
                            checkState: '1'
                        })
                            .then(function (response) {
                                console.log(response);
                                if(parseInt(response.data.code,10)===200){
                                    _this.$message({
                                        type: 'success',
                                        message: '已通过!'
                                    });
                                    _this.$emit("getTableList");
                                }else{
                                    _this.$message.error('操作失败');
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                                _this.$message.error('操作失败');
                            });

                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else{
                    _this.$message.error('请选择一条数据');
                }
            }
        }
    }
</script>
