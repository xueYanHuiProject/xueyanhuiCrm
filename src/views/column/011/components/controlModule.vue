<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
<!--            <el-form-item>-->
<!--                <el-button type="default" @click.native="showLayer">详情</el-button>-->
<!--            </el-form-item>-->
            <el-form-item>
                <el-button type="default" @click.native="showLayer">详情</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showEditLayer(0)">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showEditLayer(1)">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showRecommend">推送</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="rejectDialog">激活</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="invalidDialog">无效</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="passDialog">通过</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="reBackDialog">驳回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {mapActions } from 'vuex'
    export default {
        methods:{
            ...mapActions('module011',['showLayer','showEditLayer']),
            ...mapActions(['showRecommend']),
            invalidDialog(){
                this.$confirm('您确定要无效该话题', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已无效!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            reBackDialog(){
                this.$confirm('您确定要驳回该话题', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已无效!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            passDialog(){
                this.$confirm('您确定要通过该话题', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已无效!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            rejectDialog(){
                this.$confirm('您确定要激活该话题', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已激活!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        }
    }
</script>
