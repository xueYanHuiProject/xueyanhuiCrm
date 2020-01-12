<template>
    <el-dialog
        title="退出登录"
        :visible.sync="centerDialogVisible"
        width="30%"
        center :before-close="handleClose">
        <span>是否要退出登录</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click.stop="cancelDialog(0)">取 消</el-button>
    <el-button type="primary" @click.stop="cancelDialog(1)">确 定</el-button>
  </span>
    </el-dialog>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data() {
            return {
                centerDialogVisible: false
            };
        },
        methods:{
            cancelDialog(type){
              this.centerDialogVisible = false;
              if(type===0){
                  this.cancelOutLogin();
              }else{
                  this.outLogin();
              }

            },
            handleClose(){
                this.centerDialogVisible = false;
                this.cancelOutLogin();
            },
            ...mapActions(['cancelOutLogin','outLogin'])
        },
        watch:{
            outLoginDialogOnOff(n){
                let t = this;
                if(n){
                    t.centerDialogVisible = true;
                }
            }
        },
        computed:{
            ...mapGetters(['outLoginDialogOnOff'])
        }
    };
</script>
