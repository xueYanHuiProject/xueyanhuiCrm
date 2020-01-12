<template>
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
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        computed:{
            ...mapGetters(['pageIndex','pageSize','count'])
        },
        methods:{
            ...mapActions(['handleCurrentChange','handleSizeChange'])
        }
    }
</script>
