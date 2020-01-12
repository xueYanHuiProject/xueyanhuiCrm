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
    export default {
        props:{
            pageIndex:{
                default(){
                    return 1;
                }
            },
            pageSize:{
                default(){
                    return 20;
                }
            },
            count:{
                default(){
                    return 0;
                }
            }
        },
        methods:{
            handleSizeChange(val){
                let _this = this;
                _this.$emit("changePage",1,val)
            },
            handleCurrentChange(val){
                let _this = this;
                _this.$emit("changePage",0,val)
            }
        }
    }
</script>
