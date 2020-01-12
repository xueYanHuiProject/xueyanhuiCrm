<template>
    <section class="adminContentContainer">
        <section class="adminContentInner iconContainer">
            <div class="el-icon-item" v-for="(item,index) in tableData.result" :class="{'el-icon-item-active':index===activeIndex}" @click.stop="changeActive(index)">
                <span class="el-item-center" :class="item.name"></span>
                <p class="el-item-des" v-text="item.name"></p>
            </div>
        </section>
        <div class="block adminAuditControl">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-button type="default" @click.native="showLayer">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click.native="removeIcon">删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <AddLayer></AddLayer>
    </section>
</template>
<!--栏目:demo-->
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module002');
    import AddLayer from './components/layer';
    import axios from 'axios';
    export default {
        data(){
            return {
                name:'demo模块',
                activeIndex:-1,
            }
        },
        computed:{
            ...mapGetters(['tableData'])
        },
        methods:{
            ...mapActions(['getList','showLayer']),
            changeActive(index){
                let _this = this;
                if(_this.activeIndex===index){
                    _this.activeIndex = -1;
                }else{
                    _this.activeIndex = index;
                }
            },
            removeIcon(){
                let _this = this;
                if(_this.activeIndex!==-1){
                    _this.$confirm('您确定要删除该图标', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        axios({
                            method: 'post',
                            url: '/api/icon/update',
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            data: {
                                id:_this.tableData.result[_this.activeIndex].id,
                                deleteFlag:0
                            }
                        }).then(function(response) {
                            let reqData = response.data;
                            console.log(reqData);
                            if(parseInt(reqData.code,10)===200){
                                _this.$message({
                                    type: 'success',
                                    message: '已删除!'
                                });
                                _this.activeIndex = -1;
                                _this.getList();
                            }
                        });

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else{
                    _this.$message.error('请选择一条数据');
                }
            }
        },
        mounted(){
            let t = this;
            t.getList();
        },
        components:{
            AddLayer
        }
    }
</script>
<style  lang="scss">
    @import "../../../static/scss/column/002.scss";
</style>
<style scoped lang="scss">
    .adminAuditControl{
        padding: 90px;
    }
    .el-icon-item-active{
        color: #5cb6ff;
    }
</style>
