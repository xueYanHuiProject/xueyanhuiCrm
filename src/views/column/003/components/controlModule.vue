<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="showLayer">查看权限</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click.native="showBlackWarn">拉黑</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module003');
    export default {
        methods:{
            ...mapActions(['showLayer','showBlackWarn'])
        }
    }
</script>
