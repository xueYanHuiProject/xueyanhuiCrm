<template>
    <div class="block">
        <el-table
            :data="tableList"
            border
            highlight-current-row
            :default-sort = "{prop: 'updateTime', order: 'descending'}"
            @current-change="tableCurrentChange"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="grade"
                :formatter="formatGrade"
                label="管理员级别">
            </el-table-column>
            <el-table-column
                prop="phoneNum"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="gender"
                :formatter="formatGender"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="checkState"
                :formatter="formatState"
                label="审核状态">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import Common from '../../../../utils/common';
    export default {
        props:{
            tableList:{
                default(){
                    return [];
                }
            }
        },
        data(){
            return {}
        },
        methods:{
            formatGrade(row, column){
                let t = this;
                let grade = row['grade'];
                let gradeName = "";
                switch (parseInt(grade,10)) {
                    case 0:
                        gradeName = "超级管理员";
                        break;
                    case 1:
                        gradeName = "普通管理员";
                        break;
                }
                return gradeName;
            },
            formatGender(row, column){
                let gender = row['gender'];
                let genderName = "";
                switch (parseInt(gender,10)) {
                    case 1:
                        genderName = "男";
                        break;
                    case 2:
                        genderName = "女";
                        break;
                }
                return genderName;
            },
            formatState(row, column){
                let t = this;
                let checkState = row['checkState'];
                let checkStateName = "";
                switch (parseInt(checkState,10)) {
                    case 0:
                        checkStateName = "待审核";
                        break;
                    case 1:
                        checkStateName = "审核通过";
                        break;
                    case 2:
                        checkStateName = "审核未通过";
                        break;
                }
                return checkStateName;
            },
            tableCurrentChange(val){
                console.log(val);
                let _this = this;
                if(Common.isEmptyObject(val)){
                    _this.$emit("selectTable",false,{});
                }else{
                    _this.$emit("selectTable",true,val);
                }

            },
        }
    }
</script>

<style scoped>

</style>
