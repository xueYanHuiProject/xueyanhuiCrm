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
                prop="id"
                label="栏目ID">
            </el-table-column>
            <el-table-column
                prop="title"
                label="栏目名称">
            </el-table-column>
            <el-table-column
                prop="grade"
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
                prop="iconName"
                label="ICON类名">
            </el-table-column>
            <el-table-column
                prop="routerName"
                label="路由模块">
            </el-table-column>
            <el-table-column
                prop="createAdmin"
                label="创建管理员">
            </el-table-column>
            <el-table-column
                prop="updateAdmin"
                label="更新管理员">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterTime"
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
    const xhrUrl = {
      "getTableList":"/api/columns/query"
    };
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    import axios from 'axios';
    export default {
        data(){
            return {

            }
        },
        computed:{
            ...mapGetters(['tableData',"pageIndex","pageSize",'triggerTableNum','formInline'])
        },
        watch:{
            pageIndex(){
                let _this = this;
                _this.getTableList();
            },
            pageSize(){
                let _this = this;
                _this.getTableList();
            },
            triggerTableNum(){
                let _this = this;
                _this.getTableList();
            }
        },
        mounted(){
          let _this = this;
            _this.getTableList();
        },
        methods:{
            ...mapActions(['tableCurrentChange',"saveTableList"]),
            formatIndex(row, column){
                let t = this;
                let columnIndex = row['grade'];
                return parseInt(columnIndex,10)===0?'一级':'二级';
            },
            formatterValid(row,column){
                let t = this;
                let type = row['isValid'];
                return Common.formatterValid(type);
            },
            formatterTime(row,column){
                let t = this;
                let time = row['createTime'];
                return Common.formatDate(time);
            },
            getTableList(){
                let _this = this;
                console.log('--------------------');
                console.log(_this.formInline);
                axios.get(xhrUrl.getTableList, {
                    params: {}
                })
                    .then(function (response) {
                        console.log(response);
                        _this.saveTableList(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
