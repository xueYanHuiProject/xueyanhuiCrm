<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="举报ID">
            <el-input v-model="formInline.columnId" placeholder="栏目ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="会员ID">
            <el-input v-model="formInline.columnId" placeholder="栏目ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="formInline.columnId" placeholder="姓名" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="举报状态">
            <el-select v-model="formInline.columnIndex" placeholder="举报状态" class="adminInputEl">
                <el-option label="一级栏目" value="0"></el-option>
                <el-option label="二级栏目" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="举报时间">
            <el-date-picker
                v-model="formInline.createDuringTime"
                type="datetimerange"
                :picker-options="createPickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="回复时间">
            <el-date-picker
                v-model="formInline.updateDuringTime"
                type="datetimerange"
                :picker-options="updatePickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
        </el-form-item>
        <div class="block">
            <el-form-item>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click="resetList">重置</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        data(){
            return {
                formInline:{
                    columnIndex:'',
                    isValid:'',
                    columnId:'',
                    columnTitle:'',
                    columnIcon:'',
                    createDuringTime:[],
                    updateDuringTime:[]
                },
                createPickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                updatePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        watch:{
            formInline:{
                handler(n){
                    let t = this;
                    console.log(n);
                    t.changeFormInline(n);
                },
                deep:true
            }
        },
        methods:{
            ...mapActions(['changeFormInline','getList']),
            onSubmit(){
                console.log('初始化')
            },
            resetList(){
                let t = this;
                t.formInline = {
                    isValid:'',
                    columnId:'',
                    columnTitle:'',
                    columnIcon:''
                };
                t.changeFormInline({});
            }
        },
        mounted(){
            let t = this;
            t.getList();
            console.log(t.formInline)
        }
    }
</script>
