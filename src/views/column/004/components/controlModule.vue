<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="showLayer">详情</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showPassDialog">通过</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showRejectWarn">拒绝</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module004');
    export default {
        methods:{
            ...mapActions(['showLayer','showRejectWarn']),
            showPassDialog(){
                this.$confirm('您确定要通过【萤火虫】的审核', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '审核已通过!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '审核已取消'
                    });
                });
            }
        }
    }
</script>
