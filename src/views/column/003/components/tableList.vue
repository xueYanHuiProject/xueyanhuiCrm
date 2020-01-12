<template>
    <div class="block">
        <el-table
            :data="tableData"
            border
            highlight-current-row
            :default-sort = "{prop: 'updateTime', order: 'descending'}"
            @current-change="tableCurrentChange"
            style="width: 100%">
            <el-table-column
                prop="columnId"
                label="栏目ID">
            </el-table-column>
            <el-table-column
                prop="columnTitle"
                label="栏目名称">
            </el-table-column>
            <el-table-column
                prop="columnIndex"
                :formatter="formatIndex"
                label="栏目层级">
            </el-table-column>
            <el-table-column
                prop="isValid"
                :formatter="formatterValid"
                sortable
                label="栏目状态">
            </el-table-column>
            <el-table-column
                prop="columnIcon"
                label="ICON类名">
            </el-table-column>
            <el-table-column
                prop="columnRouterName"
                label="路由模块">
            </el-table-column>
            <el-table-column
                prop="adminName"
                label="创建管理员">
            </el-table-column>
            <el-table-column
                prop="updateAdminId"
                label="更新管理员">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                sortable
                label="更新时间">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        data(){
            return {

            }
        },
        computed:{
            ...mapGetters(['tableData'])
        },
        methods:{
            ...mapActions(['tableCurrentChange']),
            formatIndex(row, column){
                let t = this;
                let columnIndex = row['columnIndex'];
                return parseInt(columnIndex,10)===0?'一级':'二级';
            },
            formatterValid(row,column){
                let t = this;
                let type = row['isValid'];
                return Common.formatterValid(type);
            },
        }
    }
</script>

<style scoped>

</style>
